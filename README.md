# Service Provider & Customer Booking Platform

A full-stack web application for connecting customers with verified service providers.

## Architecture

- **Frontend**: Next.js 14 (App Router) - `/` (root)
- **Backend**: Express.js REST API - `/backend`
- **Database**: PostgreSQL with Prisma ORM
- **Image Uploads**: Cloudinary
- **Authentication**: JWT + OTP

## Project Structure

```
├── app/                    # Next.js frontend (App Router)
├── backend/                 # Express.js backend
│   └── src/
│       ├── routes/         # API routes
│       ├── controllers/    # Business logic
│       ├── middlewares/    # Auth, upload, etc.
│       ├── utils/          # Helpers, Prisma, JWT, OTP
│       └── server.js        # Express app entry
├── prisma/                  # Prisma schema and migrations
├── store/                   # Zustand state management
└── lib/                     # Frontend utilities (API client)
```

## Setup Instructions

### 1. Install Dependencies

**Frontend:**
```bash
npm install
```

**Backend:**
```bash
cd backend
npm install
```

### 2. Environment Variables

**Frontend (.env):**
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

**Backend (backend/.env):**
```env
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:3000

DATABASE_URL="postgresql://user:password@localhost:5432/service_booking?schema=public"
JWT_SECRET="your-secret-key-here"

CLOUDINARY_CLOUD_NAME="your-cloud-name"
CLOUDINARY_API_KEY="your-api-key"
CLOUDINARY_API_SECRET="your-api-secret"
```

### 3. Database Setup

```bash
# Generate Prisma Client
npx prisma generate

# Push schema to database
npx prisma db push

# Seed database
npm run db:seed
```

### 4. Run Development Servers

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```

**Terminal 2 - Frontend:**
```bash
npm run dev
```

## API Endpoints

### Auth
- `POST /api/auth/signup-customer`
- `POST /api/auth/signup-provider`
- `POST /api/auth/login`
- `POST /api/auth/login-otp`
- `POST /api/auth/send-otp`
- `POST /api/auth/forgot-password`
- `POST /api/auth/reset-password`

### Provider
- `GET /api/provider` (with filters)
- `GET /api/provider/:id`
- `PUT /api/provider/:id`
- `POST /api/provider/upload-id`
- `PUT /api/provider/:id/online-status`

### Customer
- `GET /api/customer/profile`
- `GET /api/customer/bookings`
- `GET /api/customer/payments`

### Booking
- `POST /api/booking/create`
- `POST /api/booking/confirm-otp`
- `PUT /api/booking/status/:id`
- `GET /api/booking/customer/:id`
- `GET /api/booking/provider/:id`

### Payment
- `POST /api/payment/create`
- `GET /api/payment/history`
- `GET /api/payment/invoice/:id`

### Admin
- `GET /api/admin/providers/pending`
- `PUT /api/admin/providers/verify`
- `GET /api/admin/bookings`
- `GET /api/admin/payments`
- `GET /api/admin/stats`

## Default Credentials (after seeding)

- **Admin**: admin@servicehub.com / admin123
- **Customer**: customer@example.com / customer123
- **Provider**: rajesh@example.com / provider123

## Tech Stack

- **Frontend**: Next.js 14, TypeScript, TailwindCSS, ShadCN UI, Zustand, Axios
- **Backend**: Node.js, Express.js, Prisma, PostgreSQL, JWT, Cloudinary
- **Deployment**: Vercel (Frontend), Railway/Render (Backend), Railway/Supabase (Database)
