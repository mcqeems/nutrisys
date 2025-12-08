# NutriSys - Technical Documentation

## Table of Contents

1. [Project Overview](#project-overview)
2. [Technology Stack](#technology-stack)
3. [Project Structure](#project-structure)
4. [Database Schema](#database-schema)
5. [Authentication System](#authentication-system)
6. [API Routes](#api-routes)
7. [Server Actions](#server-actions)
8. [Key Features](#key-features)
9. [Environment Configuration](#environment-configuration)
10. [Development Guide](#development-guide)

---

## Project Overview

**NutriSys** is an AI-powered health and wellness platform built with Next.js 16 that helps users track nutrition, analyze food, manage wellness journals, set health targets, and get personalized health insights through AI-powered chatbot interactions.

### Key Capabilities

- 🍽️ AI-powered food nutrition analysis (image & text input)
- 💬 Intelligent health chatbot assistant (NutriAI)
- 📔 Wellness journal with AI-generated responses
- 🎯 Health target tracking with automated notifications
- 📊 Comprehensive dashboard with AI-generated summaries
- 🔔 Real-time notification system
- 📱 Progressive Web App (PWA) support

---

## Technology Stack

### Frontend

- **Framework**: Next.js 16.0.7 (App Router)
- **UI Library**: React 19.2.1
- **Styling**:
  - Chakra UI 3.29.0
  - Tailwind CSS 4.1.17
  - Emotion (CSS-in-JS)
- **Animations**:
  - GSAP 3.13.0
  - Lottie React 2.4.1
  - Motion 12.23.24
- **Type Safety**: TypeScript 5.9.3

### Backend

- **Runtime**: Node.js (Next.js Server Components)
- **Authentication**: NextAuth v5 (Auth.js)
- **Database ORM**: Prisma 6.19.0
- **Database**: PostgreSQL (with Prisma Accelerate)
- **Password Hashing**: bcryptjs

### AI Integration

- **Provider**: Google Generative AI (Gemini)
- **Models Used**:
  - `gemini-2.5-flash` - Chatbot & Journal responses
  - `gemini-2.0-flash-exp` - Food analysis
  - Multiple API keys for load distribution

### Cloud Services

- **Storage**: AWS S3 (image uploads)
- **Database Hosting**: Vercel Postgres (with connection pooling)
- **Deployment**: Vercel
- **Analytics**: Vercel Analytics

### Development Tools

- **Package Manager**: npm/yarn
- **Linting**: ESLint 9.39.1
- **Code Quality**: TypeScript strict mode
- **API Client**: Native fetch API

---

## Project Structure

```
nutrisys/
├── prisma/                          # Database schema and migrations
│   ├── schema.prisma               # Prisma schema definition
│   ├── seed.ts                     # Database seeding script
│   └── migrations/                 # Database migration history
│
├── public/                         # Static assets
│   ├── manifest.json              # PWA manifest
│   ├── Articles/                  # Article images
│   ├── Background/                # Background images
│   ├── icon/                      # App icons and favicons
│   └── Logo/                      # Brand logos
│
├── src/
│   ├── app/                       # Next.js App Router
│   │   ├── (public)/             # Public routes (landing, about, etc.)
│   │   │   ├── page.tsx          # Homepage
│   │   │   ├── about/            # About page
│   │   │   ├── article/          # Articles listing
│   │   │   ├── contact-us/       # Contact page
│   │   │   └── features/         # Features page
│   │   │
│   │   ├── (protected)/          # Protected routes (requires auth)
│   │   │   ├── layout.tsx        # Protected layout with auth check
│   │   │   ├── dashboard/        # User dashboard
│   │   │   ├── analyze/          # Food nutrition analyzer
│   │   │   ├── chatbot/          # AI chatbot interface
│   │   │   ├── journal/          # Wellness journal
│   │   │   ├── target/           # Health targets management
│   │   │   ├── notifications/    # Notifications page
│   │   │   └── user/             # User profile management
│   │   │
│   │   ├── api/                  # API Routes
│   │   │   ├── auth/[...nextauth]/  # NextAuth endpoints
│   │   │   ├── register/         # User registration
│   │   │   ├── user/             # User data endpoint
│   │   │   ├── dashboard/        # Dashboard data
│   │   │   ├── food/             # Food logs
│   │   │   ├── chats/            # Chat history
│   │   │   ├── journals/         # Journal entries
│   │   │   ├── target/           # Targets data
│   │   │   ├── notifications/    # Notifications
│   │   │   ├── articles/         # Articles data
│   │   │   ├── summarize-data/   # AI summary endpoint
│   │   │   └── total/            # Statistics totals
│   │   │
│   │   ├── login/                # Login page
│   │   ├── register/             # Registration page
│   │   ├── layout.tsx            # Root layout
│   │   └── globals.css           # Global styles
│   │
│   ├── lib/                      # Utility libraries
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
│   │   ├── auth/                 # Authentication utilities
│   │   │   └── password.ts       # Password hashing/verification
│   │   │
│   │   ├── validation/           # Input validation schemas
│   │   │   └── auth.ts           # Auth validation (Zod)
│   │   │
│   │   └── utils.ts              # General utilities
│   │
│   ├── components/               # Reusable React components
│   │   ├── ui/                   # UI components (Chakra/Custom)
│   │   ├── ProtectedLayout.tsx   # Protected pages wrapper
│   │   ├── ProtectedNavbar.tsx   # Navigation for protected pages
│   │   ├── Loader.tsx            # Loading component
│   │   ├── SignOutButton.tsx     # Sign out functionality
│   │   └── TypingIndicator.tsx   # Chat typing indicator
│   │
│   ├── context/                  # React Context providers
│   │   └── NotificationContext.tsx  # Notification state management
│   │
│   ├── types/                    # TypeScript type definitions
│   │   ├── google-generative-ai.d.ts
│   │   └── next-auth.d.ts
│   │
│   ├── auth.ts                   # NextAuth configuration
│   ├── prisma.ts                 # Prisma client instance
│   └── proxy.ts                  # Proxy configuration
│
├── components.json               # Shadcn/UI config
├── next.config.ts                # Next.js configuration
├── tailwind.config.js            # Tailwind CSS configuration
├── tsconfig.json                 # TypeScript configuration
├── prisma.config.ts              # Prisma configuration
├── package.json                  # Dependencies and scripts
└── README.md                     # Project README

```

---

## Database Schema

### Core Models

#### User (Authentication)

```prisma
model User {
  id              String            @id @default(cuid())
  name            String?           @db.VarChar(50)
  email           String            @unique
  emailVerified   DateTime?
  image           String?           // S3 key for profile picture
  passwordHash    String?           // bcrypt hash

  // Relations
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

#### User Info (Profile Data)

```prisma
model user_info {
  id              Int       @id @default(autoincrement())
  user_id         String    @unique @db.VarChar(255)
  gender          String?   @db.VarChar(50)
  age             Int?
  height          Int?      // in cm
  weight          Int?      // in kg
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
  sender_type String    @db.VarChar(50)  // 'user' or 'bot'
  message     String
  timestamp   DateTime? @default(now()) @db.Timestamptz(6)

  user        User      @relation(fields: [user_id], references: [id], onDelete: Cascade)

  @@index([session_id])
  @@index([user_id])
}
```

#### Food Logs (Nutrition Analysis)

```prisma
model food_logs {
  id          Int       @id @default(autoincrement())
  user_id     String    @db.VarChar(255)
  log_date    DateTime? @default(now()) @db.Timestamptz(6)
  input_type  String    @db.VarChar(50)  // 'image' or 'text'
  image_url   String?   @db.VarChar(255) // S3 key
  description Json?     // Nutrition data from AI

  user        User?     @relation(fields: [user_id], references: [id], onDelete: Cascade)
}
```

#### Journal Entries (Wellness Journal)

```prisma
model journal_entries {
  id         Int       @id @default(autoincrement())
  user_id    String    @db.VarChar(255)
  entry_date DateTime? @default(now()) @db.Timestamptz(6)
  mood       String?   @default("neutral") @db.VarChar(50)
  content    String
  ai_reply   String?   // AI-generated response

  user       User?     @relation(fields: [user_id], references: [id], onDelete: Cascade)
}
```

#### User Targets (Health Goals)

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

#### Summary (AI-Generated User Summary)

```prisma
model summary {
  id           Int       @id @default(autoincrement())
  user_id      String    @unique @db.VarChar(255)
  description  String?   // AI-generated summary in Markdown
  generated_at DateTime? @default(now()) @db.Timestamptz(6)

  user         User?     @relation(fields: [user_id], references: [id], onDelete: Cascade)
}
```

#### Articles (Health Content)

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

## Authentication System

### NextAuth v5 Configuration

**File**: `src/auth.ts`

#### Authentication Strategy

- **Session Strategy**: JWT (to support credentials-based login)
- **Adapter**: Prisma Adapter (for database session management)
- **Provider**: Credentials (email + password)

#### Authentication Flow

```typescript
export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: { strategy: 'jwt' },
  providers: [
    Credentials({
      authorize: async (credentials) => {
        // 1. Validate input with Zod
        const parsed = loginSchema.safeParse(credentials);

        // 2. Find user by email
        const user = await prisma.user.findUnique({ where: { email } });

        // 3. Verify password with bcrypt
        const valid = await verifyPassword(password, user.passwordHash);

        // 4. Generate presigned URL for profile image
        const imageUrl = await getImageUrl(user.image);

        // 5. Return user object
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

#### Password Security

- **Hashing Algorithm**: bcrypt
- **Salt Rounds**: 10
- **Functions**: `hashPassword()`, `verifyPassword()`

#### Protected Routes

All routes under `(protected)` directory require authentication. Layout handles redirect:

```typescript
// src/app/(protected)/layout.tsx
const session = await auth();
if (!session) {
  redirect('/login');
}
```

---

## API Routes

All API routes follow RESTful conventions and return JSON responses.

### Authentication

#### `POST /api/register`

Register a new user account.

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

**Features**:

- Email uniqueness validation
- Password hashing with bcrypt
- Auto-creates `user_info` record
- Sends welcome notification

---

### User Data

#### `GET /api/user`

Get current user profile and information.

**Auth**: Required

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

Get comprehensive dashboard data.

**Auth**: Required

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
        "message": "Welcome to NutriSys!",
        "type": "Success",
        "is_read": false,
        "created_at": "2024-01-01T00:00:00Z"
      }
    ],
    "summary": {
      "description": "# AI-generated summary in Markdown...",
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

### Food Analysis

#### `GET /api/food`

Get all food logs for current user.

**Auth**: Required

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

Get chat history for current user.

**Auth**: Required

**Response** (200):

```json
{
  "data": [
    {
      "id": 1,
      "user_id": "clxxx...",
      "session_id": "default",
      "sender_type": "user",
      "message": "What should I eat for breakfast?",
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

### Journal

#### `GET /api/journals`

Get all journal entries for current user.

**Auth**: Required

**Response** (200):

```json
{
  "data": [
    {
      "id": 1,
      "user_id": "clxxx...",
      "entry_date": "2024-01-01T20:00:00Z",
      "mood": "happy",
      "content": "Had a great day today! Exercised and ate healthy.",
      "ai_reply": "Senang mendengar hari Anda menyenangkan! Terus pertahankan kebiasaan baik ini..."
    }
  ]
}
```

---

### Targets

#### `GET /api/target`

Get all health targets for current user.

**Auth**: Required

**Query Parameters**:

- `status` (optional): Filter by status ("Aktif" | "Selesai" | "Gagal")

**Response** (200):

```json
{
  "data": [
    {
      "id": 1,
      "user_id": "clxxx...",
      "name": "Lose 5kg in 2 months",
      "start_date": "2024-01-01",
      "end_date": "2024-03-01",
      "status": "Aktif",
      "created_at": "2024-01-01T00:00:00Z"
    }
  ]
}
```

---

### Notifications

#### `GET /api/notifications`

Get all notifications for current user.

**Auth**: Required

**Response** (200):

```json
{
  "data": [
    {
      "id": 1,
      "user_id": "clxxx...",
      "message": "Your target 'Lose 5kg' has 7 days remaining!",
      "type": "Reminder",
      "is_read": false,
      "created_at": "2024-01-01T00:00:00Z"
    }
  ]
}
```

#### `GET /api/notifications/unread-count`

Get count of unread notifications.

**Auth**: Required

**Response** (200):

```json
{
  "count": 3
}
```

---

### Articles

#### `GET /api/articles`

Get all published articles.

**Auth**: Not required

**Response** (200):

```json
{
  "data": [
    {
      "id": 1,
      "title": "10 Tips for Healthy Eating",
      "description": "Learn the fundamentals of nutrition...",
      "content": "Full article content...",
      "image_path": "/Articles/article-1.jpg",
      "created_at": "2024-01-01T00:00:00Z"
    }
  ]
}
```

#### `GET /api/articles/[id]`

Get single article by ID.

**Auth**: Not required

**Response** (200):

```json
{
  "data": {
    "id": 1,
    "title": "10 Tips for Healthy Eating",
    "description": "Learn the fundamentals of nutrition...",
    "content": "Full article content...",
    "image_path": "/Articles/article-1.jpg",
    "created_at": "2024-01-01T00:00:00Z"
  }
}
```

---

### Statistics

#### `GET /api/total`

Get activity statistics for current user.

**Auth**: Required

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

### AI Summary

#### `GET /api/summarize-data`

Get data for AI summary generation.

**Auth**: Required

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

Server Actions use `'use server'` directive and are called directly from client components.

### Target Management

#### `createTarget()`

**File**: `src/lib/actions/createTarget.ts`

Create a new health target and send notification.

```typescript
export async function createTarget(
  name: string,
  startDate: string,
  endDate: string,
  status: string
): Promise<{ success: boolean; message: string }>;
```

**Features**:

- Validates user authentication
- Creates target in database
- Calculates time remaining
- Sends notification for active targets
- Revalidates `/target` page

---

#### `deleteTarget()`

**File**: `src/lib/actions/deleteTarget.ts`

Delete a target by ID.

```typescript
export async function deleteTarget(targetId: number): Promise<{ success: boolean; message: string }>;
```

---

#### `updateTargetStatus()`

**File**: `src/lib/actions/updateTargetStatus.ts`

Update target status (Aktif | Selesai | Gagal).

```typescript
export async function updateTargetStatus(
  targetId: number,
  newStatus: string
): Promise<{ success: boolean; message: string }>;
```

**Features**:

- Validates ownership
- Updates status
- Sends notification on status change
- Revalidates page

---

### User Profile

#### `updateUserProfile()`

**File**: `src/lib/actions/updateUserProfile.ts`

Update user profile information.

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

Upload user profile image to S3.

```typescript
export async function uploadImageToS3(file: File): Promise<{ success: boolean; key?: string; error?: string }>;

export async function uploadBufferToS3(
  buffer: Buffer,
  filename: string
): Promise<{ success: boolean; key?: string; error?: string }>;
```

**Features**:

- Uploads to AWS S3
- Generates unique keys
- Validates file types
- Returns S3 object key

---

#### `getImageUrl()`

**File**: `src/lib/actions/getImageUrl.ts`

Generate presigned URL for S3 objects.

```typescript
export async function getImageUrl(key: string | null | undefined): Promise<string>;
```

**Returns**: Presigned URL valid for 1 hour

---

### AI Features

#### `generateAISummary()`

**File**: `src/lib/actions/generateAISummary.ts`

Generate comprehensive AI-powered user summary.

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

**Features**:

- Fetches all user data (profile, food logs, chats, journals, targets)
- Generates personalized analysis using Gemini AI
- Formats output in Markdown
- Saves to database
- Used in dashboard

**AI Model**: `gemini-2.5-flash`

---

### Food Analysis Actions

#### `analyzeFood()`

**File**: `src/app/(protected)/analyze/actions/actions.ts`

Analyze food nutrition using AI (image or text input).

```typescript
export async function analyzeFood(prevState: AnalyzeState, formData: FormData): Promise<AnalyzeState>;
```

**Input Types**:

- **Image Upload**: Analyzes food from uploaded image
- **Text Description**: Analyzes from text description
- **Camera Capture**: Analyzes from webcam capture (base64)

**AI Processing**:

- Model: `gemini-2.0-flash-exp`
- Vision capability for image analysis
- Returns structured JSON with nutrition data
- Saves to database with S3 image URL

**Response Structure**:

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

### Chatbot Actions

#### `sendMessage()`

**File**: `src/app/(protected)/chatbot/actions/actions.ts`

Send message to AI chatbot and get response.

```typescript
export async function sendMessage(message: string): Promise<{ success: boolean; message?: string; error?: string }>;
```

**Features**:

- Fetches user context (age, gender, allergies, medical history)
- Loads recent chat history (last 20 messages)
- Generates personalized AI response
- Saves both user message and bot reply
- Model: `gemini-2.5-flash`

**System Behavior**:

- Only answers health/nutrition questions
- Refuses off-topic queries
- Provides feature recommendations with links
- Supportive and friendly tone
- Responds in user's language (default: Bahasa Indonesia)

---

#### `resetChat()`

Delete all chat history for current user.

```typescript
export async function resetChat(): Promise<{
  success: boolean;
  error?: string;
}>;
```

---

### Journal Actions

#### `createJournal()`

**File**: `src/app/(protected)/journal/actions/actions.ts`

Create a new journal entry.

```typescript
export async function createJournal(
  mood: string,
  content: string
): Promise<{ success: boolean; data?: any; error?: string }>;
```

---

#### `getAiReply()`

Generate AI response for journal entry.

```typescript
export async function getAiReply(
  journalId: number,
  content: string,
  mood: string
): Promise<{ success: boolean; reply?: string; error?: string }>;
```

**Features**:

- Analyzes mood and content
- Generates empathetic response (<100 words)
- Updates journal with AI reply
- Model: `gemini-2.5-flash`

---

### Notification Actions

#### `markNotificationsAsRead()`

**File**: `src/lib/actions/markNotificationsAsRead.ts`

Mark one or all notifications as read.

```typescript
export async function markNotificationsAsRead(notificationId?: number): Promise<{ success: boolean; message: string }>;
```

**Behavior**:

- If `notificationId` provided: marks single notification
- If omitted: marks all user notifications as read

---

### Data Retrieval Actions

#### `getDashboard()`

Fetch comprehensive dashboard data (see API section).

#### `getFoodLogs()`

**File**: `src/lib/actions/getFoodLogs.ts`

Fetch all food logs with presigned S3 URLs.

#### `getChatLogs()`

**File**: `src/lib/actions/getChatLogs.ts`

Fetch chat history ordered by timestamp.

#### `getJournals()`

**File**: `src/lib/actions/getJournals.ts`

Fetch journal entries ordered by date.

#### `getTarget()`

**File**: `src/lib/actions/getTarget.ts`

Fetch user targets with optional status filter.

#### `getNotifications()`

**File**: `src/lib/actions/getNotifications.ts`

Fetch notifications ordered by creation date.

#### `getUnreadNotificationCount()`

**File**: `src/lib/actions/getUnreadNotificationCount.ts`

Get count of unread notifications.

#### `getArticles()`

**File**: `src/lib/actions/getArticles.ts`

Fetch all articles ordered by creation date.

#### `getSingleArticleDetail()`

**File**: `src/lib/actions/getSingleArticleDetail.ts`

Fetch single article by ID.

#### `getUsersInfo()`

**File**: `src/lib/actions/getUsersInfo.ts`

Fetch current user info with profile data.

#### `getTotal()`

**File**: `src/lib/actions/getTotal.ts`

Fetch activity statistics (counts).

#### `getSummarizeData()`

**File**: `src/lib/actions/getSummarizeData.ts`

Fetch all data needed for AI summary generation.

---

## Key Features

### 1. Food Nutrition Analyzer (`/analyze`)

**Technology**:

- Google Gemini 2.0 Flash (multimodal)
- AWS S3 for image storage
- Webcam API for camera capture

**Workflow**:

1. User uploads image/enters text/captures photo
2. Image uploaded to S3 (if applicable)
3. Data sent to Gemini AI for analysis
4. AI returns structured nutrition data (JSON)
5. Data displayed and saved to database
6. History accessible with presigned URLs

**Input Methods**:

- 📷 Image Upload (JPG, PNG, WebP)
- ✍️ Text Description
- 📸 Camera Capture (mobile-optimized)

---

### 2. AI Chatbot (`/chatbot`)

**Technology**:

- Google Gemini 2.5 Flash
- Context-aware conversations
- Personalized responses

**Features**:

- Health and nutrition Q&A
- Personalized based on user profile
- Recent conversation history (20 messages)
- Quick start suggestions
- Reset conversation option
- Markdown formatting support
- Typing indicators

**Restrictions**:

- Only health/nutrition topics
- Won't disclose technical details
- Won't provide medical diagnoses

---

### 3. Wellness Journal (`/journal`)

**Technology**:

- AI-powered reflections
- Mood tracking
- Chronological entries

**Workflow**:

1. User writes journal entry
2. Selects mood (happy, sad, anxious, etc.)
3. Submits entry
4. AI generates empathetic response
5. Both stored in database
6. Viewable in timeline format

---

### 4. Smart Health Targets (`/target`)

**Features**:

- Create time-bound health goals
- Status tracking (Aktif | Selesai | Gagal)
- Automated reminders
- Progress visualization
- Notification integration

**Notifications**:

- Created when target becomes active
- Reminders at specific intervals
- Status change notifications

---

### 5. Dashboard (`/dashboard`)

**Data Displayed**:

- User profile summary
- Activity statistics (analyze, chat, journal, targets)
- Recent notifications (4 most recent)
- AI-generated health summary

**AI Summary**:

- Comprehensive analysis of all user data
- Personalized insights and recommendations
- Pattern detection in eating habits
- Goal progress evaluation
- Motivational messages
- Formatted in Markdown

---

### 6. Notifications System

**Types**:

- **Info**: General information
- **Success**: Achievements, completions
- **Warning**: Important reminders
- **Reminder**: Target deadlines, health tips

**Features**:

- Real-time updates via context
- Unread count badge
- Mark as read (individual/all)
- Persistent across sessions

---

### 7. User Profile Management (`/user`)

**Editable Fields**:

- Name
- Profile picture (S3 upload)
- Age
- Gender
- Height & Weight
- Blood Type
- Food Allergies
- Medical History

**Image Handling**:

- Upload to AWS S3
- Presigned URLs (1-hour expiry)
- Auto-refresh in UI

---

## Environment Configuration

### Required Environment Variables

```bash
# Database
DATABASE_URL="postgresql://..."        # Pooled connection
DIRECT_URL="postgresql://..."          # Direct connection

# Authentication
AUTH_SECRET="your-secret-key"          # NextAuth secret
AUTH_URL="http://localhost:3000"       # Base URL

# Google Gemini AI (Multiple keys for load distribution)
GEMINI_API_KEY="..."                   # Food analysis
GEMINI_API_KEY2="..."                  # Chatbot & journal
GEMINI_API_KEY3="..."                  # Backup
GEMINI_API_KEY4="..."                  # Summary generation

# AWS S3
AWS_REGION="us-east-1"
AWS_ACCESS_KEY_ID="..."
AWS_SECRET_ACCESS_KEY="..."
AWS_S3_BUCKET_NAME="nutrisys-bucket"

# Application
NEXT_PUBLIC_SITE_URL="https://nutrisys.my.id"
NODE_ENV="development"
```

### Prisma Configuration

**Database Provider**: PostgreSQL

**Features**:

- Prisma Accelerate (connection pooling)
- Multiple binary targets (native, rhel-openssl-3.0.x)
- Generated client in `@prisma/client`

**Commands**:

```bash
# Generate Prisma Client
npx prisma generate

# Run migrations
npx prisma migrate dev

# Reset database (development only)
npx prisma migrate reset

# Open Prisma Studio
npx prisma studio
```

---

## Development Guide

### Prerequisites

- Node.js 20.x or higher
- PostgreSQL database
- AWS S3 bucket
- Google Gemini API keys

### Installation

```bash
# Clone repository
git clone https://github.com/mcqeems/nutrisys.git
cd nutrisys

# Install dependencies
npm install

# Setup environment variables
cp .env.example .env
# Edit .env with your credentials

# Generate Prisma Client
npx prisma generate

# Run migrations
npx prisma migrate dev

# Seed database (optional)
npx prisma db seed
```

### Development Server

```bash
# Start development server
npm run dev

# Open browser
# http://localhost:3000
```

### Build for Production

```bash
# Build application
npm run build

# Start production server
npm start
```

### Code Quality

```bash
# Run linter
npm run lint

# Type checking
npx tsc --noEmit
```

---

## Security Features

### Content Security Policy (CSP)

Configured in `next.config.ts` with strict policies for:

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

### Authentication Security

- JWT-based sessions
- Bcrypt password hashing (10 rounds)
- CSRF protection (NextAuth built-in)
- Secure cookies (httpOnly, sameSite)

### Database Security

- Parameterized queries (Prisma)
- Cascade delete on user removal
- Unique constraints on emails
- Input validation with Zod

### API Security

- Authentication checks on protected routes
- User ownership verification
- Rate limiting (via Vercel)
- CORS configuration

---

## Performance Optimizations

### Database

- Prisma Accelerate (connection pooling)
- Indexed fields (user_id, session_id)
- Parallel queries with `Promise.all()`
- Selective field fetching

### Images

- S3 presigned URLs
- Image optimization (Next.js)
- Lazy loading
- WebP format support

### Frontend

- React Server Components
- Dynamic imports
- Suspense boundaries
- Client-side caching

### AI Optimization

- Multiple API keys for load distribution
- Temperature tuning (0.7-0.9)
- Response streaming where applicable
- Context window management

---

## Deployment

### Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

**Configuration**:

- Framework preset: Next.js
- Build command: `npm run build`
- Output directory: `.next`
- Install command: `npm install`

**Environment Variables**: Set in Vercel dashboard

---

## Troubleshooting

### Common Issues

#### Database Connection Errors

- Check `DATABASE_URL` and `DIRECT_URL` format
- Verify database is accessible
- Run `npx prisma db push` to sync schema

#### AI API Errors

- Verify API keys are valid
- Check API quota limits
- Review temperature and model settings

#### S3 Upload Failures

- Confirm AWS credentials
- Check bucket permissions
- Verify bucket CORS configuration

#### Authentication Issues

- Regenerate `AUTH_SECRET`
- Clear browser cookies
- Check `AUTH_URL` matches deployment URL

---

## API Rate Limits

### Google Gemini AI

- **Free Tier**: 15 requests/minute, 1500 requests/day
- **Paid Tier**: Higher limits, check Google AI Studio

### AWS S3

- No strict rate limits
- Charges based on storage and bandwidth

### Vercel

- **Hobby**: 100GB bandwidth/month
- **Pro**: 1TB bandwidth/month

---

## Future Enhancements

### Planned Features

- 📱 Mobile app (React Native)
- 🌐 Internationalization (i18n)
- 📊 Advanced analytics and charts
- 🥗 Meal planning AI assistant
- 🏋️ Exercise tracking integration
- 👥 Social features (share progress)
- 🔔 Push notifications (PWA)
- 📧 Email notifications
- 🎨 Customizable themes
- 📈 Data export (PDF, CSV)

### Technical Improvements

- Redis caching layer
- Websocket for real-time updates
- Background job processing
- Advanced AI fine-tuning
- Multi-language AI support
- Voice input for food analysis
- Barcode scanner integration

---

## License

This project is proprietary software developed for TECHCOMFEST 2025.

## Contributors

- **Development Team**: NutriSys Team
- **AI Integration**: Google Gemini AI
- **Cloud Infrastructure**: AWS, Vercel

## Support

For technical support or questions:

- Email: support@nutrisys.my.id
- Documentation: https://docs.nutrisys.my.id

---

**Last Updated**: December 8, 2025  
**Version**: 0.1.0  
**Next.js**: 16.0.7  
**Prisma**: 6.19.0
