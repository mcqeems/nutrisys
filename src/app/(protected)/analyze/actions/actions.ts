'use server';

import { GoogleGenerativeAI } from '@google/generative-ai';
import { auth } from '@/auth';
import { prisma } from '@/prisma';
import { uploadImageToS3 } from '@/lib/actions/postUserImage';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

const SYSTEM_PROMPT = `
You are a certified nutritionist and food science expert.  
Your task is to analyze the described or uploaded food item and provide a detailed nutritional report in consistent JSON format.

Important rules:
1. Respond **only** in valid JSON format.
2. **All JSON keys must remain in English.**
3. **All JSON values (the content inside the quotation marks) must be written in Bahasa Indonesia.**
4. Do not include any text or explanation outside the JSON.
5. Follow this structure exactly:

{
"food_name": "string (exact name of the food, in Bahasa Indonesia)",
"description": "string (short description about the food, its main ingredients, and preparation method, in Bahasa Indonesia)",
"origin": "string (country or cultural origin, in Bahasa Indonesia if possible)",
"portion_size": {
    "amount": "numeric",
    "unit": "string (e.g., gram, ml, potong, mangkuk)"
},
"nutritional_facts": {
    "calories": "number (kcal)",
    "macronutrients": {
    "carbohydrates": "number (gram)",
    "protein": "number (gram)",
    "fat": "number (gram)"
    },
    "micronutrients": {
    "fiber": "number (gram)",
    "sugar": "number (gram)",
    "sodium": "number (mg)",
    "cholesterol": "number (mg)",
    "vitamins": {
        "vitamin_A": "number (mcg)",
        "vitamin_C": "number (mg)",
        "vitamin_D": "number (IU)",
        "vitamin_B12": "number (mcg)"
    },
    "minerals": {
        "calcium": "number (mg)",
        "iron": "number (mg)",
        "potassium": "number (mg)"
    }
    }
},
"health_analysis": {
    "summary": "string (professional nutritional evaluation of the food, written in Bahasa Indonesia)",
    "recommended_for": "string (which groups or individuals this food suits best, in Bahasa Indonesia)",
    "cautions": "string (warnings for certain health conditions, in Bahasa Indonesia)"
}
}

Analyze the given food and fill in all values accurately, ensuring every text value is written in clear and natural Bahasa Indonesia.
`;

export type AnalyzeState = {
  success?: boolean;
  error?: string | null;
  data?: unknown;
};

export async function analyzeFood(prevState: AnalyzeState, formData: FormData): Promise<AnalyzeState> {
  const session = await auth();
  if (!session?.user?.id) {
    return { error: 'Unauthorized' };
  }

  const inputType = formData.get('inputType') as string;
  const imageFile = formData.get('image') as File | null;
  const textInput = formData.get('text') as string | null;

  let s3Key: string | null = null;
  let geminiResponse = null;

  try {
    if (!process.env.GEMINI_API_KEY) {
      return { error: 'Gemini API Key is not configured' };
    }
    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

    if (inputType === 'image' && imageFile && imageFile.size > 0) {
      // 1. Upload to S3
      s3Key = await uploadImageToS3(imageFile);

      // 2. Prepare image for Gemini
      const arrayBuffer = await imageFile.arrayBuffer();
      const base64Image = Buffer.from(arrayBuffer).toString('base64');

      const result = await model.generateContent([
        SYSTEM_PROMPT,
        {
          inlineData: {
            data: base64Image,
            mimeType: imageFile.type,
          },
        },
      ]);

      const text = result.response.text();
      // Clean up markdown code blocks if present
      const jsonString = text
        .replace(/```json\n|\n```/g, '')
        .replace(/```/g, '')
        .trim();
      geminiResponse = JSON.parse(jsonString);
    } else if (inputType === 'text' && textInput) {
      const result = await model.generateContent([SYSTEM_PROMPT, `Food description: ${textInput}`]);

      const text = result.response.text();
      const jsonString = text
        .replace(/```json\n|\n```/g, '')
        .replace(/```/g, '')
        .trim();
      geminiResponse = JSON.parse(jsonString);
    } else {
      return { error: 'Please provide an image or text description' };
    }

    // 3. Save to DB
    await prisma.food_logs.create({
      data: {
        user_id: session.user.id,
        input_type: inputType,
        image_url: s3Key,
        description: geminiResponse, // Prisma handles JSON automatically
        log_date: new Date(),
      },
    });

    return { success: true, data: geminiResponse };
  } catch (error) {
    console.error('Analysis error:', error);
    return { error: error instanceof Error ? error.message : 'Failed to analyze food' };
  }
}
