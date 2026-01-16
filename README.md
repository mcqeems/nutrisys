# NutriSys - Dokumentasi Teknis

<div align="center">
  <h3>🥗 Platform Kesehatan & Nutrisi Berbasis AI 🤖</h3>
  <p>Kelola kesehatan Anda dengan teknologi kecerdasan buatan</p>
</div>

---

## 👋 Selamat Datang di NutriSys!

**NutriSys** adalah platform kesehatan dan wellness yang didukung oleh teknologi kecerdasan buatan (AI). Kami hadir untuk membantu Anda menjalani gaya hidup yang lebih sehat dengan fitur-fitur canggih yang mudah digunakan.

### 🌟 Apa yang Bisa Anda Lakukan?

- **Analisis Makanan**: Cukup foto makanan Anda atau ketik namanya, AI kami akan menganalisis kandungan nutrisinya secara lengkap!
- **Konsultasi AI**: Tanya jawab seputar kesehatan dan nutrisi dengan NutriAI, asisten kesehatan pribadi Anda
- **Jurnal Kesehatan**: Catat perjalanan kesehatan Anda dan dapatkan respon yang mendukung dari AI
- **Target Kesehatan**: Tetapkan tujuan kesehatan dan pantau progress Anda dengan pengingat otomatis
- **Dashboard Pintar**: Lihat ringkasan lengkap aktivitas kesehatan Anda dengan analisis AI

### 🚀 Teknologi yang Kami Gunakan

Dibangun dengan teknologi modern dan terpercaya:

- **Next.js 16** - Framework web terkini
- **Google Gemini AI** - Kecerdasan buatan untuk analisis nutrisi dan konsultasi
- **PostgreSQL** - Database yang handal dan aman
- **AWS S3** - Penyimpanan cloud untuk gambar
- **TypeScript** - Kode yang lebih aman dan terstruktur

---

## 📋 Daftar Isi

1. [Ringkasan Proyek](#ringkasan-proyek)
2. [Stack Teknologi](#stack-teknologi)
3. [Struktur Proyek](#struktur-proyek)
4. [Skema Database](#skema-database)
5. [Sistem Autentikasi](#sistem-autentikasi)
6. [API Routes](#api-routes)
7. [Server Actions](#server-actions)
8. [Fitur Utama](#fitur-utama)
9. [Konfigurasi Environment](#konfigurasi-environment)
10. [Panduan Development](#panduan-development)

---

## Ringkasan Proyek

**NutriSys** adalah platform kesehatan dan wellness berbasis AI yang dibangun dengan Next.js 16. Platform ini membantu pengguna untuk melacak nutrisi, menganalisis makanan, mengelola jurnal kesehatan, menetapkan target kesehatan, dan mendapatkan insight kesehatan yang dipersonalisasi melalui interaksi dengan chatbot AI.

### Kemampuan Utama

- 🍽️ Analisis nutrisi makanan berbasis AI (input gambar & teks)
- 💬 Asisten chatbot kesehatan yang cerdas (NutriAI)
- 📔 Jurnal wellness dengan respon AI
- 🎯 Pelacakan target kesehatan dengan notifikasi otomatis
- 📊 Dashboard komprehensif dengan ringkasan AI
- 🔔 Sistem notifikasi real-time
- 📱 Dukungan Progressive Web App (PWA)

---

## Stack Teknologi

### Frontend

- **Framework**: Next.js 16.0.7 (App Router)
- **UI Library**: React 19.2.1
- **Styling**:
  - Chakra UI 3.29.0
  - Tailwind CSS 4.1.17
  - Emotion (CSS-in-JS)
- **Animasi**:
  - Lottie React 2.4.1
  - Motion 12.23.24
- **Type Safety**: TypeScript 5.9.3

### Backend

- **Runtime**: Node.js (Next.js Server Components)
- **Autentikasi**: NextAuth v5 (Auth.js)
- **Database ORM**: Prisma 6.19.0
- **Database**: PostgreSQL (dengan Prisma Accelerate)
- **Password Hashing**: bcryptjs

### Integrasi AI

- **Provider**: Google Generative AI (Gemini)
- **Model yang Digunakan**:
  - `gemini-2.5-flash` - Chatbot & respons jurnal
  - `gemini-2.0-flash-exp` - Analisis makanan
  - Multiple API keys untuk distribusi beban

### Cloud Services

- **Storage**: AWS S3 (upload gambar)
- **Database Hosting**: Vercel Postgres (dengan connection pooling)
- **Deployment**: Vercel
- **Analytics**: Vercel Analytics

### Development Tools

- **Package Manager**: npm/yarn
- **Linting**: ESLint 9.39.1
- **Kualitas Kode**: TypeScript strict mode
- **API Client**: Native fetch API

---

## Struktur Proyek

```
nutrisys/
├── prisma/                          # Skema database dan migrasi
│   ├── schema.prisma               # Definisi skema Prisma
│   ├── seed.ts                     # Script seeding database
│   └── migrations/                 # Riwayat migrasi database
│
├── public/                         # Aset statis
│   ├── manifest.json              # Manifest PWA
│   ├── Articles/                  # Gambar artikel
│   ├── Background/                # Gambar latar belakang
│   ├── icon/                      # Icon app dan favicon
│   └── Logo/                      # Logo brand
│
├── src/
│   ├── app/                       # Next.js App Router
│   │   ├── (public)/             # Route publik (landing, about, dll.)
│   │   │   ├── page.tsx          # Homepage
│   │   │   ├── about/            # Halaman tentang
│   │   │   ├── article/          # Daftar artikel
│   │   │   ├── contact-us/       # Halaman kontak
│   │   │   └── features/         # Halaman fitur
│   │   │
│   │   ├── (protected)/          # Route terproteksi (butuh autentikasi)
│   │   │   ├── layout.tsx        # Layout terproteksi dengan pengecekan auth
│   │   │   ├── dashboard/        # Dashboard pengguna
│   │   │   ├── analyze/          # Analisis nutrisi makanan
│   │   │   ├── chatbot/          # Interface chatbot AI
│   │   │   ├── journal/          # Jurnal wellness
│   │   │   ├── target/           # Manajemen target kesehatan
│   │   │   ├── notifications/    # Halaman notifikasi
│   │   │   └── user/             # Manajemen profil pengguna
│   │   │
│   │   ├── api/                  # API Routes
│   │   │   ├── auth/[...nextauth]/  # Endpoint NextAuth
│   │   │   ├── register/         # Registrasi pengguna
│   │   │   ├── user/             # Endpoint data pengguna
│   │   │   ├── dashboard/        # Data dashboard
│   │   │   ├── food/             # Log makanan
│   │   │   ├── chats/            # Riwayat chat
│   │   │   ├── journals/         # Entri jurnal
│   │   │   ├── target/           # Data target
│   │   │   ├── notifications/    # Notifikasi
│   │   │   ├── articles/         # Data artikel
│   │   │   ├── summarize-data/   # Endpoint ringkasan AI
│   │   │   └── total/            # Total statistik
│   │   │
│   │   ├── login/                # Halaman login
│   │   ├── register/             # Halaman registrasi
│   │   ├── layout.tsx            # Layout root
│   │   └── globals.css           # Style global
│   │
│   ├── lib/                      # Library utility
│   │   ├── actions/              # Server Actions
│   │   │   ├── createTarget.ts
│   │   │   ├── deleteTarget.ts
│   │   │   ├── generateAISummary.ts
│   │   │   ├── getArticles.ts
│   │   │   ├── getChatLogs.ts
│   │   │   ├── getDashboard.ts
│   │   │   ├── getFoodLogs.ts
│   │   │   ├── getImageUrl.ts
│   │   │   ├── getJournals.ts
│   │   │   ├── getNotifications.ts
│   │   │   ├── getSingleArticleDetail.ts
│   │   │   ├── getSummarizeData.ts
│   │   │   ├── getTarget.ts
│   │   │   ├── getTotal.ts
│   │   │   ├── getUnreadNotificationCount.ts
│   │   │   ├── getUsersInfo.ts
│   │   │   ├── markNotificationsAsRead.ts
│   │   │   ├── postUserImage.ts
│   │   │   ├── updateTargetStatus.ts
│   │   │   └── updateUserProfile.ts
│   │   │
│   │   ├── auth/                 # Utility autentikasi
│   │   │   └── password.ts       # Hashing/verifikasi password
│   │   │
│   │   ├── validation/           # Skema validasi input
│   │   │   └── auth.ts           # Validasi auth (Zod)
│   │   │
│   │   └── utils.ts              # Utility umum
│   │
│   ├── components/               # Komponen React yang reusable
│   │   ├── ui/                   # Komponen UI (Chakra/Custom)
│   │   ├── ProtectedLayout.tsx   # Wrapper untuk halaman terproteksi
│   │   ├── ProtectedNavbar.tsx   # Navigasi untuk halaman terproteksi
│   │   ├── Loader.tsx            # Komponen loading
│   │   ├── SignOutButton.tsx     # Fungsi sign out
│   │   └── TypingIndicator.tsx   # Indikator typing di chat
│   │
│   ├── context/                  # React Context providers
│   │   └── NotificationContext.tsx  # Manajemen state notifikasi
│   │
│   ├── types/                    # Definisi tipe TypeScript
│   │   ├── google-generative-ai.d.ts
│   │   └── next-auth.d.ts
│   │
│   ├── auth.ts                   # Konfigurasi NextAuth
│   ├── prisma.ts                 # Instance Prisma client
│   └── proxy.ts                  # Konfigurasi proxy
│
├── components.json               # Konfigurasi Shadcn/UI
├── next.config.ts                # Konfigurasi Next.js
├── tailwind.config.js            # Konfigurasi Tailwind CSS
├── tsconfig.json                 # Konfigurasi TypeScript
├── prisma.config.ts              # Konfigurasi Prisma
├── package.json                  # Dependencies dan scripts
└── README.md                     # README proyek

```

---

## Skema Database

### Model Inti

#### User (Autentikasi)

```prisma
model User {
  id              String            @id @default(cuid())
  name            String?           @db.VarChar(50)
  email           String            @unique
  emailVerified   DateTime?
  image           String?           // S3 key untuk foto profil
  passwordHash    String?           // bcrypt hash

  // Relasi
  accounts        Account[]
  sessions        Session[]
  Authenticator   Authenticator[]
  chat_logs       chat_logs[]
  food_logs       food_logs[]
  journal_entries journal_entries[]
  notifications   notifications[]
  summary         summary[]
  user_info       user_info[]
  user_targets    user_targets[]

  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt
}
```

#### User Info (Data Profil)

```prisma
model user_info {
  id              Int       @id @default(autoincrement())
  user_id         String    @unique @db.VarChar(255)
  gender          String?   @db.VarChar(50)
  age             Int?
  height          Int?      // dalam cm
  weight          Int?      // dalam kg
  blood_type      String?   @db.VarChar(10)
  food_allergy    String?
  medical_history String?
  created_at      DateTime? @default(now()) @db.Timestamptz(6)

  user            User?     @relation(fields: [user_id], references: [id], onDelete: Cascade)
}
```

#### Chat Logs (AI Chatbot)

```prisma
model chat_logs {
  id          Int       @id @default(autoincrement())
  user_id     String    @db.VarChar(255)
  session_id  String    @db.VarChar(255)
  sender_type String    @db.VarChar(50)  // 'user' atau 'bot'
  message     String
  timestamp   DateTime? @default(now()) @db.Timestamptz(6)

  user        User      @relation(fields: [user_id], references: [id], onDelete: Cascade)

  @@index([session_id])
  @@index([user_id])
}
```

#### Food Logs (Analisis Nutrisi)

```prisma
model food_logs {
  id          Int       @id @default(autoincrement())
  user_id     String    @db.VarChar(255)
  log_date    DateTime? @default(now()) @db.Timestamptz(6)
  input_type  String    @db.VarChar(50)  // 'image' atau 'text'
  image_url   String?   @db.VarChar(255) // S3 key
  description Json?     // Data nutrisi dari AI

  user        User?     @relation(fields: [user_id], references: [id], onDelete: Cascade)
}
```

#### Journal Entries (Jurnal Wellness)

```prisma
model journal_entries {
  id         Int       @id @default(autoincrement())
  user_id    String    @db.VarChar(255)
  entry_date DateTime? @default(now()) @db.Timestamptz(6)
  mood       String?   @default("neutral") @db.VarChar(50)
  content    String
  ai_reply   String?   // Respons yang dihasilkan AI

  user       User?     @relation(fields: [user_id], references: [id], onDelete: Cascade)
}
```

#### User Targets (Tujuan Kesehatan)

```prisma
model user_targets {
  id         Int       @id @default(autoincrement())
  user_id    String    @db.VarChar(255)
  name       String    @db.VarChar(255)
  start_date DateTime  @db.Date
  end_date   DateTime  @db.Date
  status     String?   @default("active") @db.VarChar(50)
  created_at DateTime? @default(now()) @db.Timestamptz(6)

  user       User?     @relation(fields: [user_id], references: [id], onDelete: Cascade)
}
```

#### Notifications

```prisma
model notifications {
  id         Int       @id @default(autoincrement())
  user_id    String    @db.VarChar(255)
  message    String
  type       String?   @default("info") @db.VarChar(50)  // 'info', 'success', 'warning', 'error'
  is_read    Boolean?  @default(false)
  created_at DateTime? @default(now()) @db.Timestamptz(6)

  user       User?     @relation(fields: [user_id], references: [id], onDelete: Cascade)
}
```

#### Summary (Ringkasan Pengguna yang Dihasilkan AI)

```prisma
model summary {
  id           Int       @id @default(autoincrement())
  user_id      String    @unique @db.VarChar(255)
  description  String?   // Ringkasan AI dalam format Markdown
  generated_at DateTime? @default(now()) @db.Timestamptz(6)

  user         User?     @relation(fields: [user_id], references: [id], onDelete: Cascade)
}
```

#### Articles (Konten Kesehatan)

```prisma
model articles {
  id          Int       @id @default(autoincrement())
  title       String    @db.VarChar(255)
  description String?   @db.VarChar(255)
  content     String?
  image_path  String?   @db.VarChar(255)
  created_at  DateTime? @default(now()) @db.Timestamptz(6)
}
```

---

## Sistem Autentikasi

### Konfigurasi NextAuth v5

**File**: `src/auth.ts`

#### Strategi Autentikasi

- **Strategi Session**: JWT (untuk mendukung login berbasis credentials)
- **Adapter**: Prisma Adapter (untuk manajemen session database)
- **Provider**: Credentials (email + password)

#### Alur Autentikasi

```typescript
export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  providers: [
    Credentials({
      authorize: async (credentials) => {
        // 1. Validasi input dengan Zod
        const parsed = loginSchema.safeParse(credentials);

        // 2. Cari user berdasarkan email
        const user = await prisma.user.findUnique({ where: { email } });

        // 3. Verifikasi password dengan bcrypt
        const valid = await verifyPassword(password, user.passwordHash);

        // 4. Generate presigned URL untuk gambar profil
        const imageUrl = await getImageUrl(user.image);

        // 5. Return objek user
        return { id, name, email, image: imageUrl };
      },
    }),
  ],
  callbacks: {
    jwt({ token, user }) {
      if (user) token.id = user.id;
      return token;
    },
    session({ session, token }) {
      session.user.id = token.id as string;
      return session;
    },
  },
});
```

#### Keamanan Password

- **Algoritma Hashing**: bcrypt
- **Salt Rounds**: 10
- **Fungsi**: `hashPassword()`, `verifyPassword()`

#### Route Terproteksi

Semua route di bawah direktori `(protected)` memerlukan autentikasi. Layout menangani redirect:

```typescript
// src/app/(protected)/layout.tsx
const session = await auth();
if (!session) {
  redirect("/login");
}
```

---

## API Routes

Semua API routes mengikuti konvensi RESTful dan mengembalikan respons JSON.

### Autentikasi

#### `POST /api/register`

Mendaftarkan akun pengguna baru.

**Request Body**:

```json
{
  "email": "user@example.com",
  "name": "John Doe",
  "password": "SecurePassword123"
}
```

**Response** (201):

```json
{
  "user": {
    "id": "clxxx...",
    "email": "user@example.com",
    "name": "John Doe"
  }
}
```

**Fitur**:

- Validasi keunikan email
- Hashing password dengan bcrypt
- Otomatis membuat record `user_info`
- Mengirim notifikasi selamat datang

---

### Data Pengguna

#### `GET /api/user`

Mendapatkan profil dan informasi pengguna saat ini.

**Auth**: Diperlukan

**Response** (200):

```json
{
  "data": {
    "id": 1,
    "user_id": "clxxx...",
    "age": 25,
    "gender": "Male",
    "height": 175,
    "weight": 70,
    "blood_type": "A+",
    "food_allergy": "Peanuts",
    "medical_history": "None",
    "created_at": "2024-01-01T00:00:00Z",
    "user": {
      "name": "John Doe",
      "email": "user@example.com",
      "image": "https://presigned-url..."
    }
  }
}
```

---

### Dashboard

#### `GET /api/dashboard`

Mendapatkan data dashboard yang komprehensif.

**Auth**: Diperlukan

**Response** (200):

```json
{
  "data": {
    "user": {
      "name": "John Doe",
      "email": "user@example.com",
      "image": "https://presigned-url..."
    },
    "userInfo": {
      "age": 25,
      "gender": "Male",
      "height": 175,
      "weight": 70,
      "blood_type": "A+",
      "food_allergy": "Peanuts",
      "medical_history": "None"
    },
    "notifications": [
      {
        "id": 1,
        "message": "Selamat datang di NutriSys!",
        "type": "Success",
        "is_read": false,
        "created_at": "2024-01-01T00:00:00Z"
      }
    ],
    "summary": {
      "description": "# Ringkasan yang dihasilkan AI dalam Markdown...",
      "generated_at": "2024-01-01T00:00:00Z"
    },
    "stats": {
      "totalAnalisis": 15,
      "totalPesan": 42,
      "totalJurnal": 8,
      "totalTarget": 3
    }
  }
}
```

---

### Analisis Makanan

#### `GET /api/food`

Mendapatkan semua log makanan untuk pengguna saat ini.

**Auth**: Diperlukan

**Response** (200):

```json
{
  "data": [
    {
      "id": 1,
      "user_id": "clxxx...",
      "log_date": "2024-01-01T12:00:00Z",
      "input_type": "image",
      "image_url": "https://presigned-url...",
      "description": {
        "food_name": "Nasi Goreng",
        "description": "Nasi goreng dengan telur, sayuran, dan ayam",
        "portion_size": {
          "amount": 250,
          "unit": "gram"
        },
        "nutritional_facts": {
          "calories": 450,
          "macronutrients": {
            "carbohydrates": 60,
            "protein": 18,
            "fat": 15
          },
          "micronutrients": {
            "fiber": 3,
            "sugar": 2,
            "sodium": 800,
            "cholesterol": 150
          }
        },
        "health_analysis": {
          "summary": "Makanan ini kaya karbohidrat...",
          "recommended_for": "Aktif secara fisik",
          "cautions": "Tinggi sodium"
        }
      }
    }
  ]
}
```

---

### Chatbot

#### `GET /api/chats`

Mendapatkan riwayat chat untuk pengguna saat ini.

**Auth**: Diperlukan

**Response** (200):

```json
{
  "data": [
    {
      "id": 1,
      "user_id": "clxxx...",
      "session_id": "default",
      "sender_type": "user",
      "message": "Apa yang harus saya makan untuk sarapan?",
      "timestamp": "2024-01-01T08:00:00Z"
    },
    {
      "id": 2,
      "user_id": "clxxx...",
      "session_id": "default",
      "sender_type": "bot",
      "message": "Untuk sarapan yang sehat, saya merekomendasikan...",
      "timestamp": "2024-01-01T08:00:05Z"
    }
  ]
}
```

---

### Jurnal

#### `GET /api/journals`

Mendapatkan semua entri jurnal untuk pengguna saat ini.

**Auth**: Diperlukan

**Response** (200):

```json
{
  "data": [
    {
      "id": 1,
      "user_id": "clxxx...",
      "entry_date": "2024-01-01T20:00:00Z",
      "mood": "happy",
      "content": "Hari ini sangat menyenangkan! Olahraga dan makan sehat.",
      "ai_reply": "Senang mendengar hari Anda menyenangkan! Terus pertahankan kebiasaan baik ini..."
    }
  ]
}
```

---

### Target

#### `GET /api/target`

Mendapatkan semua target kesehatan untuk pengguna saat ini.

**Auth**: Diperlukan

**Query Parameters**:

- `status` (opsional): Filter berdasarkan status ("Aktif" | "Selesai" | "Gagal")

**Response** (200):

```json
{
  "data": [
    {
      "id": 1,
      "user_id": "clxxx...",
      "name": "Turun 5kg dalam 2 bulan",
      "start_date": "2024-01-01",
      "end_date": "2024-03-01",
      "status": "Aktif",
      "created_at": "2024-01-01T00:00:00Z"
    }
  ]
}
```

---

### Notifikasi

#### `GET /api/notifications`

Mendapatkan semua notifikasi untuk pengguna saat ini.

**Auth**: Diperlukan

**Response** (200):

```json
{
  "data": [
    {
      "id": 1,
      "user_id": "clxxx...",
      "message": "Target Anda 'Turun 5kg' tinggal 7 hari lagi!",
      "type": "Reminder",
      "is_read": false,
      "created_at": "2024-01-01T00:00:00Z"
    }
  ]
}
```

#### `GET /api/notifications/unread-count`

Mendapatkan jumlah notifikasi yang belum dibaca.

**Auth**: Diperlukan

**Response** (200):

```json
{
  "count": 3
}
```

---

### Artikel

#### `GET /api/articles`

Mendapatkan semua artikel yang dipublikasikan.

**Auth**: Tidak diperlukan

**Response** (200):

```json
{
  "data": [
    {
      "id": 1,
      "title": "10 Tips Pola Makan Sehat",
      "description": "Pelajari dasar-dasar nutrisi...",
      "content": "Konten artikel lengkap...",
      "image_path": "/Articles/article-1.jpg",
      "created_at": "2024-01-01T00:00:00Z"
    }
  ]
}
```

#### `GET /api/articles/[id]`

Mendapatkan satu artikel berdasarkan ID.

**Auth**: Tidak diperlukan

**Response** (200):

```json
{
  "data": {
    "id": 1,
    "title": "10 Tips Pola Makan Sehat",
    "description": "Pelajari dasar-dasar nutrisi...",
    "content": "Konten artikel lengkap...",
    "image_path": "/Articles/article-1.jpg",
    "created_at": "2024-01-01T00:00:00Z"
  }
}
```

---

### Statistik

#### `GET /api/total`

Mendapatkan statistik aktivitas untuk pengguna saat ini.

**Auth**: Diperlukan

**Response** (200):

```json
{
  "data": {
    "foodLogs": 15,
    "chatLogs": 42,
    "journals": 8,
    "targets": 3
  }
}
```

---

### Ringkasan AI

#### `GET /api/summarize-data`

Mendapatkan data untuk pembuatan ringkasan AI.

**Auth**: Diperlukan

**Response** (200):

```json
{
  "data": {
    "user": {
      "name": "John Doe",
      "email": "user@example.com"
    },
    "userInfo": {
      /* ... */
    },
    "recentFoodLogs": [
      /* ... */
    ],
    "recentChatLogs": [
      /* ... */
    ],
    "recentJournals": [
      /* ... */
    ],
    "activeTargets": [
      /* ... */
    ]
  }
}
```

---

## Server Actions

Server Actions menggunakan directive `'use server'` dan dipanggil langsung dari komponen client.

### Manajemen Target

#### `createTarget()`

**File**: `src/lib/actions/createTarget.ts`

Membuat target kesehatan baru dan mengirim notifikasi.

```typescript
export async function createTarget(
  name: string,
  startDate: string,
  endDate: string,
  status: string
): Promise<{ success: boolean; message: string }>;
```

**Fitur**:

- Validasi autentikasi pengguna
- Membuat target di database
- Menghitung waktu tersisa
- Mengirim notifikasi untuk target aktif
- Revalidasi halaman `/target`

---

#### `deleteTarget()`

**File**: `src/lib/actions/deleteTarget.ts`

Menghapus target berdasarkan ID.

```typescript
export async function deleteTarget(targetId: number): Promise<{ success: boolean; message: string }>;
```

---

#### `updateTargetStatus()`

**File**: `src/lib/actions/updateTargetStatus.ts`

Memperbarui status target (Aktif | Selesai | Gagal).

```typescript
export async function updateTargetStatus(
  targetId: number,
  newStatus: string
): Promise<{ success: boolean; message: string }>;
```

**Fitur**:

- Validasi kepemilikan
- Memperbarui status
- Mengirim notifikasi saat status berubah
- Revalidasi halaman

---

### Profil Pengguna

#### `updateUserProfile()`

**File**: `src/lib/actions/updateUserProfile.ts`

Memperbarui informasi profil pengguna.

```typescript
export async function updateUserProfile(data: {
  name?: string;
  age?: number;
  gender?: string;
  height?: number;
  weight?: number;
  blood_type?: string;
  food_allergy?: string;
  medical_history?: string;
}): Promise<{ success: boolean; message: string }>;
```

---

#### `postUserImage()`

**File**: `src/lib/actions/postUserImage.ts`

Upload gambar profil pengguna ke S3.

```typescript
export async function uploadImageToS3(file: File): Promise<{ success: boolean; key?: string; error?: string }>;

export async function uploadBufferToS3(
  buffer: Buffer,
  filename: string
): Promise<{ success: boolean; key?: string; error?: string }>;
```

**Fitur**:

- Upload ke AWS S3
- Generate key yang unik
- Validasi tipe file
- Return S3 object key

---

#### `getImageUrl()`

**File**: `src/lib/actions/getImageUrl.ts`

Generate presigned URL untuk objek S3.

```typescript
export async function getImageUrl(key: string | null | undefined): Promise<string>;
```

**Return**: Presigned URL valid selama 1 jam

---

### Fitur AI

#### `generateAISummary()`

**File**: `src/lib/actions/generateAISummary.ts`

Generate ringkasan pengguna yang komprehensif dengan AI.

```typescript
export async function generateAISummary(): Promise<{
  success: boolean;
  message?: string;
  summary?: {
    description: string;
    generated_at: Date;
  };
}>;
```

**Fitur**:

- Mengambil semua data pengguna (profil, food logs, chats, journals, targets)
- Generate analisis personal menggunakan Gemini AI
- Format output dalam Markdown
- Simpan ke database
- Digunakan di dashboard

**AI Model**: `gemini-2.5-flash`

---

### Actions Analisis Makanan

#### `analyzeFood()`

**File**: `src/app/(protected)/analyze/actions/actions.ts`

Analisis nutrisi makanan menggunakan AI (input gambar atau teks).

```typescript
export async function analyzeFood(prevState: AnalyzeState, formData: FormData): Promise<AnalyzeState>;
```

**Tipe Input**:

- **Upload Gambar**: Analisis makanan dari gambar yang diupload
- **Deskripsi Teks**: Analisis dari deskripsi teks
- **Capture Kamera**: Analisis dari capture webcam (base64)

**Pemrosesan AI**:

- Model: `gemini-2.0-flash-exp`
- Kemampuan vision untuk analisis gambar
- Return JSON terstruktur dengan data nutrisi
- Simpan ke database dengan URL gambar S3

**Struktur Response**:

```typescript
{
  food_name: string;
  description: string;
  origin: string;
  portion_size: {
    amount: number;
    unit: string;
  }
  nutritional_facts: {
    calories: number;
    macronutrients: {
      carbohydrates, protein, fat;
    }
    micronutrients: {
      fiber, sugar, sodium, cholesterol, vitamins, minerals;
    }
  }
  health_analysis: {
    summary, recommended_for, cautions, reference;
  }
}
```

---

### Actions Chatbot

#### `sendMessage()`

**File**: `src/app/(protected)/chatbot/actions/actions.ts`

Kirim pesan ke chatbot AI dan dapatkan respons.

```typescript
export async function sendMessage(message: string): Promise<{ success: boolean; message?: string; error?: string }>;
```

**Fitur**:

- Mengambil konteks pengguna (umur, gender, alergi, riwayat medis)
- Memuat riwayat chat terkini (20 pesan terakhir)
- Generate respons AI yang personal
- Simpan pesan pengguna dan balasan bot
- Model: `gemini-2.5-flash`

**Perilaku Sistem**:

- Hanya menjawab pertanyaan kesehatan/nutrisi
- Menolak pertanyaan di luar topik
- Memberikan rekomendasi fitur dengan link
- Nada yang supportif dan ramah
- Merespons dalam bahasa pengguna (default: Bahasa Indonesia)

---

#### `resetChat()`

Menghapus semua riwayat chat untuk pengguna saat ini.

```typescript
export async function resetChat(): Promise<{
  success: boolean;
  error?: string;
}>;
```

---

### Actions Jurnal

#### `createJournal()`

**File**: `src/app/(protected)/journal/actions/actions.ts`

Membuat entri jurnal baru.

```typescript
export async function createJournal(
  mood: string,
  content: string
): Promise<{ success: boolean; data?: any; error?: string }>;
```

---

#### `getAiReply()`

Generate respons AI untuk entri jurnal.

```typescript
export async function getAiReply(
  journalId: number,
  content: string,
  mood: string
): Promise<{ success: boolean; reply?: string; error?: string }>;
```

**Fitur**:

- Analisis mood dan konten
- Generate respons yang empatik (<100 kata)
- Update jurnal dengan balasan AI
- Model: `gemini-2.5-flash`

---

### Actions Notifikasi

#### `markNotificationsAsRead()`

**File**: `src/lib/actions/markNotificationsAsRead.ts`

Tandai satu atau semua notifikasi sebagai sudah dibaca.

```typescript
export async function markNotificationsAsRead(notificationId?: number): Promise<{ success: boolean; message: string }>;
```

**Perilaku**:

- Jika `notificationId` diberikan: tandai satu notifikasi
- Jika tidak diberikan: tandai semua notifikasi pengguna sebagai sudah dibaca

---

### Actions Pengambilan Data

#### `getDashboard()`

Ambil data dashboard yang komprehensif (lihat bagian API).

#### `getFoodLogs()`

**File**: `src/lib/actions/getFoodLogs.ts`

Ambil semua log makanan dengan presigned S3 URLs.

#### `getChatLogs()`

**File**: `src/lib/actions/getChatLogs.ts`

Ambil riwayat chat yang diurutkan berdasarkan timestamp.

#### `getJournals()`

**File**: `src/lib/actions/getJournals.ts`

Ambil entri jurnal yang diurutkan berdasarkan tanggal.

#### `getTarget()`

**File**: `src/lib/actions/getTarget.ts`

Ambil target pengguna dengan filter status opsional.

#### `getNotifications()`

**File**: `src/lib/actions/getNotifications.ts`

Ambil notifikasi yang diurutkan berdasarkan tanggal pembuatan.

#### `getUnreadNotificationCount()`

**File**: `src/lib/actions/getUnreadNotificationCount.ts`

Dapatkan jumlah notifikasi yang belum dibaca.

#### `getArticles()`

**File**: `src/lib/actions/getArticles.ts`

Ambil semua artikel yang diurutkan berdasarkan tanggal pembuatan.

#### `getSingleArticleDetail()`

**File**: `src/lib/actions/getSingleArticleDetail.ts`

Ambil satu artikel berdasarkan ID.

#### `getUsersInfo()`

**File**: `src/lib/actions/getUsersInfo.ts`

Ambil info pengguna saat ini dengan data profil.

#### `getTotal()`

**File**: `src/lib/actions/getTotal.ts`

Ambil statistik aktivitas (jumlah).

#### `getSummarizeData()`

**File**: `src/lib/actions/getSummarizeData.ts`

Ambil semua data yang diperlukan untuk pembuatan ringkasan AI.

---

## Fitur Utama

### 1. Analisis Nutrisi Makanan (`/analyze`)

**Teknologi**:

- Google Gemini 2.0 Flash (multimodal)
- AWS S3 untuk penyimpanan gambar
- Webcam API untuk capture kamera

**Alur Kerja**:

1. Pengguna upload gambar/masukkan teks/capture foto
2. Gambar diupload ke S3 (jika ada)
3. Data dikirim ke Gemini AI untuk analisis
4. AI mengembalikan data nutrisi terstruktur (JSON)
5. Data ditampilkan dan disimpan ke database
6. Riwayat dapat diakses dengan presigned URLs

**Metode Input**:

- 📷 Upload Gambar (JPG, PNG, WebP)
- ✍️ Deskripsi Teks
- 📸 Capture Kamera (dioptimalkan untuk mobile)

---

### 2. AI Chatbot (`/chatbot`)

**Teknologi**:

- Google Gemini 2.5 Flash
- Percakapan yang sadar konteks
- Respons yang dipersonalisasi

**Fitur**:

- Tanya jawab kesehatan dan nutrisi
- Dipersonalisasi berdasarkan profil pengguna
- Riwayat percakapan terkini (20 pesan)
- Saran quick start
- Opsi reset percakapan
- Dukungan format Markdown
- Indikator typing

**Batasan**:

- Hanya topik kesehatan/nutrisi
- Tidak akan mengungkapkan detail teknis
- Tidak memberikan diagnosis medis

---

### 3. Jurnal Wellness (`/journal`)

**Teknologi**:

- Refleksi yang didukung AI
- Pelacakan mood
- Entri kronologis

**Alur Kerja**:

1. Pengguna menulis entri jurnal
2. Memilih mood (senang, sedih, cemas, dll.)
3. Submit entri
4. AI generate respons yang empatik
5. Keduanya disimpan di database
6. Dapat dilihat dalam format timeline

---

### 4. Target Kesehatan Pintar (`/target`)

**Fitur**:

- Buat tujuan kesehatan dengan batas waktu
- Pelacakan status (Aktif | Selesai | Gagal)
- Pengingat otomatis
- Visualisasi progress
- Integrasi notifikasi

**Notifikasi**:

- Dibuat saat target menjadi aktif
- Pengingat pada interval tertentu
- Notifikasi perubahan status

---

### 5. Dashboard (`/dashboard`)

**Data yang Ditampilkan**:

- Ringkasan profil pengguna
- Statistik aktivitas (analyze, chat, journal, targets)
- Notifikasi terkini (4 terbaru)
- Ringkasan kesehatan yang dihasilkan AI

**Ringkasan AI**:

- Analisis komprehensif dari semua data pengguna
- Insight dan rekomendasi personal
- Deteksi pola dalam kebiasaan makan
- Evaluasi progress tujuan
- Pesan motivasi
- Format dalam Markdown

---

### 6. Sistem Notifikasi

**Tipe**:

- **Info**: Informasi umum
- **Success**: Pencapaian, penyelesaian
- **Warning**: Pengingat penting
- **Reminder**: Deadline target, tips kesehatan

**Fitur**:

- Update real-time via context
- Badge jumlah yang belum dibaca
- Tandai sebagai sudah dibaca (individual/semua)
- Persisten di seluruh sesi

---

### 7. Manajemen Profil Pengguna (`/user`)

**Field yang Dapat Diedit**:

- Nama
- Foto profil (upload S3)
- Umur
- Jenis Kelamin
- Tinggi & Berat Badan
- Golongan Darah
- Alergi Makanan
- Riwayat Medis

**Penanganan Gambar**:

- Upload ke AWS S3
- Presigned URLs (expires 1 jam)
- Auto-refresh di UI

---

## Konfigurasi Environment

### Environment Variables yang Diperlukan

```bash
# Database
DATABASE_URL="postgresql://..."        # Koneksi pooled
DIRECT_URL="postgresql://..."          # Koneksi langsung

# Autentikasi
AUTH_SECRET="your-secret-key"          # Secret NextAuth
AUTH_URL="http://localhost:3000"       # Base URL

# Google Gemini AI (Multiple keys untuk distribusi beban)
GEMINI_API_KEY="..."                   # Analisis makanan
GEMINI_API_KEY2="..."                  # Chatbot & journal
GEMINI_API_KEY3="..."                  # Backup
GEMINI_API_KEY4="..."                  # Generate ringkasan

# AWS S3
AWS_REGION="us-east-1"
AWS_ACCESS_KEY_ID="..."
AWS_SECRET_ACCESS_KEY="..."
AWS_S3_BUCKET_NAME="nutrisys-bucket"

# Aplikasi
NEXT_PUBLIC_SITE_URL="https://nutrisys.my.id"
NODE_ENV="development"
```

### Konfigurasi Prisma

**Database Provider**: PostgreSQL

**Fitur**:

- Prisma Accelerate (connection pooling)
- Multiple binary targets (native, rhel-openssl-3.0.x)
- Generated client di `@prisma/client`

**Perintah**:

```bash
# Generate Prisma Client
npx prisma generate

# Jalankan migrasi
npx prisma migrate dev

# Reset database (hanya development)
npx prisma migrate reset

# Buka Prisma Studio
npx prisma studio
```

---

## Panduan Development

### Prasyarat

- Node.js 20.x atau lebih tinggi
- Database PostgreSQL
- AWS S3 bucket
- Google Gemini API keys

### Instalasi

```bash
# Clone repository
git clone https://github.com/mcqeems/nutrisys.git
cd nutrisys

# Install dependencies
npm install

# Setup environment variables
cp .env.example .env
# Edit .env dengan credentials Anda

# Generate Prisma Client
npx prisma generate

# Jalankan migrasi
npx prisma migrate dev

# Seed database (opsional)
npx prisma db seed
```

### Development Server

```bash
# Jalankan development server
npm run dev

# Buka browser
# http://localhost:3000
```

### Build untuk Production

```bash
# Build aplikasi
npm run build

# Jalankan production server
npm start
```

### Kualitas Kode

```bash
# Jalankan linter
npm run lint

# Type checking
npx tsc --noEmit
```

---

## Fitur Keamanan

### Content Security Policy (CSP)

Dikonfigurasi di `next.config.ts` dengan kebijakan ketat untuk:

- Script sources
- Style sources
- Image sources
- Font sources
- Connection sources
- Frame sources

### Security Headers

- `Strict-Transport-Security`: HSTS enabled
- `X-Frame-Options`: SAMEORIGIN
- `X-Content-Type-Options`: nosniff
- `Referrer-Policy`: strict-origin-when-cross-origin

### Keamanan Autentikasi

- Session berbasis JWT
- Hashing password dengan Bcrypt (10 rounds)
- Proteksi CSRF (built-in NextAuth)
- Secure cookies (httpOnly, sameSite)

### Keamanan Database

- Query dengan parameter (Prisma)
- Cascade delete saat penghapusan user
- Constraint unik pada email
- Validasi input dengan Zod

### Keamanan API

- Pengecekan autentikasi pada route terproteksi
- Verifikasi kepemilikan pengguna
- Rate limiting (via Vercel)
- Konfigurasi CORS

---

## Optimasi Performa

### Database

- Prisma Accelerate (connection pooling)
- Field yang diindeks (user_id, session_id)
- Query paralel dengan `Promise.all()`
- Pengambilan field selektif

### Gambar

- S3 presigned URLs
- Optimasi gambar (Next.js)
- Lazy loading
- Dukungan format WebP

### Frontend

- React Server Components
- Dynamic imports
- Suspense boundaries
- Client-side caching

### Optimasi AI

- Multiple API keys untuk distribusi beban
- Tuning temperature (0.7-0.9)
- Response streaming jika memungkinkan
- Manajemen context window

---

## Deployment

### Vercel (Direkomendasikan)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

**Konfigurasi**:

- Framework preset: Next.js
- Build command: `npm run build`
- Output directory: `.next`
- Install command: `npm install`

**Environment Variables**: Set di dashboard Vercel

---

## Troubleshooting

### Masalah Umum

#### Error Koneksi Database

- Periksa format `DATABASE_URL` dan `DIRECT_URL`
- Verifikasi database dapat diakses
- Jalankan `npx prisma db push` untuk sinkronisasi skema

#### Error API AI

- Verifikasi API keys valid
- Periksa batas kuota API
- Review pengaturan temperature dan model

#### Kegagalan Upload S3

- Konfirmasi credentials AWS
- Periksa permission bucket
- Verifikasi konfigurasi CORS bucket

#### Masalah Autentikasi

- Generate ulang `AUTH_SECRET`
- Hapus cookies browser
- Periksa `AUTH_URL` sesuai dengan URL deployment

---

## Rate Limit API

### Google Gemini AI

- **Free Tier**: 15 requests/menit, 1500 requests/hari
- **Paid Tier**: Batas lebih tinggi, cek Google AI Studio

### AWS S3

- Tidak ada batas rate ketat
- Biaya berdasarkan storage dan bandwidth

### Vercel

- **Hobby**: 100GB bandwidth/bulan
- **Pro**: 1TB bandwidth/bulan

---

## Pengembangan Masa Depan

### Fitur yang Direncanakan

- 📱 Aplikasi mobile (React Native)
- 🌐 Internasionalisasi (i18n)
- 📊 Analytics dan chart yang lebih advanced
- 🥗 Asisten AI perencanaan makanan
- 🏋️ Integrasi pelacakan olahraga
- 👥 Fitur sosial (share progress)
- 🔔 Push notifications (PWA)
- 📧 Email notifications
- 🎨 Theme yang dapat disesuaikan
- 📈 Export data (PDF, CSV)

### Peningkatan Teknis

- Layer caching dengan Redis
- Websocket untuk update real-time
- Background job processing
- Fine-tuning AI yang lebih advanced
- Dukungan multi-bahasa AI
- Voice input untuk analisis makanan
- Integrasi barcode scanner

---

## Lisensi

Proyek ini adalah software proprietary yang dikembangkan untuk TECHCOMFEST 2025.

## Kontributor

- **Tim Development**: Tim NutriSys
- **Integrasi AI**: Google Gemini AI
- **Cloud Infrastructure**: AWS, Vercel

## Dukungan

Untuk dukungan teknis atau pertanyaan:

- Email: support@nutrisys.my.id
- Dokumentasi: https://docs.nutrisys.my.id

---

**Terakhir Diperbarui**: 8 Desember 2025  
**Versi**: 0.1.0  
**Next.js**: 16.0.7  
**Prisma**: 6.19.0
