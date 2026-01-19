"use server";

import { GoogleGenerativeAI } from "@google/generative-ai";
import { auth } from "@/auth";
import { prisma } from "@/prisma";
import { getSummarizeData } from "./getSummarizeData";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY4 || "");

export async function generateAISummary() {
  const session = await auth();
  if (!session?.user?.id) {
    return { success: false, message: "Unauthorized" };
  }

  const userId = session.user.id;

  try {
    // 1. Fetch all user data for summarization
    const userData = await getSummarizeData();

    if (!userData) {
      return { success: false, message: "Gagal mengambil data pengguna" };
    }

    // 2. Prepare the data context for AI
    const dataContext = prepareDataContext(userData);

    // 3. Generate AI Summary
    if (!process.env.GEMINI_API_KEY4) {
      return { success: false, message: "AI API key belum dikonfigurasi" };
    }

    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
      generationConfig: {
        maxOutputTokens: 2048,
        temperature: 0.6, // Balanced creativity
      },
    });

    const systemPrompt = `Kamu adalah AI asisten kesehatan dan nutrisi bernama NutriAI dari aplikasi Nutrisys. Tugasmu adalah menganalisis dan merangkum aktivitas pengguna berdasarkan data yang diberikan.

PANDUAN:
1. Berikan rangkuman yang personal dan bermanfaat dalam Bahasa Indonesia
2. Analisis pola perilaku kesehatan pengguna berdasarkan data
3. Berikan insight tentang kebiasaan makan dan gaya hidup
4. Berikan saran yang actionable dan realistis
5. Gunakan nada yang ramah, supportif, dan memotivasi
6. Jika data kurang lengkap, tetap berikan rangkuman sebaik mungkin dengan data yang ada
7. Tulis dalam format Markdown yang rapi dan mudah dibaca

FORMAT OUTPUT (dalam Markdown):
## 👋 Hai, [Nama Pengguna]!

### 📊 Rangkuman Aktivitas
[Rangkuman aktivitas terkini di Nutrisys - analisis makanan, percakapan, jurnal, dan target]

### 🔍 Analisis Pola Kesehatan
[Analisis mendalam tentang pola makan, mood, dan kebiasaan kesehatan berdasarkan data]
- Poin-poin penting dalam bentuk bullet list

### 💡 Rekomendasi Personal
[Saran dan rekomendasi yang actionable berdasarkan analisis]
1. Rekomendasi pertama
2. Rekomendasi kedua
3. Rekomendasi ketiga

### 🎯 Target & Progress
[Evaluasi target kesehatan dan progress pengguna]

### ✨ Motivasi
[Pesan motivasi yang personal dan menyemangati]

---
*Rangkuman ini dibuat oleh NutriAI berdasarkan aktivitas Anda di Nutrisys.*

DATA PENGGUNA:
${dataContext}`;

    const result = await model.generateContent(systemPrompt);
    const response = result.response;
    const summaryText = response.text();

    // 4. Save or update the summary in database
    await prisma.summary.upsert({
      where: { user_id: userId },
      update: {
        description: summaryText,
        generated_at: new Date(),
      },
      create: {
        user_id: userId,
        description: summaryText,
        generated_at: new Date(),
      },
    });

    return {
      success: true,
      summary: {
        description: summaryText,
        generated_at: new Date(),
      },
      message: "Rangkuman berhasil dibuat!",
    };
  } catch (error) {
    console.error("Error generating AI summary:", error);
    return { success: false, message: "Gagal membuat rangkuman AI" };
  }
}

function prepareDataContext(data: NonNullable<Awaited<ReturnType<typeof getSummarizeData>>>): string {
  const sections: string[] = [];

  // User Info
  if (data.user) {
    sections.push(`NAMA PENGGUNA: ${data.user.name}`);
  }

  // Health Profile
  if (data.userInfo) {
    const profile: string[] = [];
    if (data.userInfo.gender) profile.push(`Jenis Kelamin: ${data.userInfo.gender}`);
    if (data.userInfo.height) profile.push(`Tinggi: ${data.userInfo.height} cm`);
    if (data.userInfo.weight) profile.push(`Berat: ${data.userInfo.weight} kg`);
    if (data.userInfo.blood_type) profile.push(`Golongan Darah: ${data.userInfo.blood_type}`);
    if (data.userInfo.food_allergy) profile.push(`Alergi Makanan: ${data.userInfo.food_allergy}`);
    if (data.userInfo.medical_history) profile.push(`Riwayat Penyakit: ${data.userInfo.medical_history}`);

    if (profile.length > 0) {
      sections.push(`PROFIL KESEHATAN:\n${profile.join("\n")}`);
    }
  }

  // Food Logs
  if (data.food_logs && data.food_logs.length > 0) {
    const foodItems = data.food_logs
      .filter((log) => log.description)
      .map((log) => {
        if (typeof log.description === "object" && log.description !== null) {
          return JSON.stringify(log.description);
        }
        return String(log.description);
      })
      .join("\n- ");

    if (foodItems) {
      sections.push(`RIWAYAT MAKANAN (${data.food_logs.length} log terbaru):\n- ${foodItems}`);
    }
  }

  // Chat Logs (User questions/concerns)
  if (data.chat_logs && data.chat_logs.length > 0) {
    const chatTopics = data.chat_logs.map((log) => log.message).join("\n- ");
    sections.push(`PERTANYAAN/TOPIK DISKUSI PENGGUNA (${data.chat_logs.length} terbaru):\n- ${chatTopics}`);
  }

  // Journal Entries
  if (data.journal_entries && data.journal_entries.length > 0) {
    const journals = data.journal_entries
      .map((entry) => `[Mood: ${entry.mood || "tidak diketahui"}] ${entry.content.substring(0, 150)}...`)
      .join("\n- ");
    sections.push(`JURNAL KESEHATAN (${data.journal_entries.length} terbaru):\n- ${journals}`);
  }

  // Targets
  if (data.user_targets && data.user_targets.length > 0) {
    const targets = data.user_targets
      .map((target) => {
        const startDate = new Date(target.start_date).toLocaleDateString("id-ID");
        const endDate = new Date(target.end_date).toLocaleDateString("id-ID");
        return `${target.name} (${startDate} - ${endDate}) [Status: ${target.status || "aktif"}]`;
      })
      .join("\n- ");
    sections.push(`TARGET KESEHATAN (${data.user_targets.length} target):\n- ${targets}`);
  }

  // Notifications (recent activities)
  if (data.notifications && data.notifications.length > 0) {
    const notifs = data.notifications.map((n) => n.message).join("\n- ");
    sections.push(`NOTIFIKASI TERBARU:\n- ${notifs}`);
  }

  return sections.join("\n\n") || "Data pengguna masih kosong. Pengguna baru memulai menggunakan Nutrisys.";
}
