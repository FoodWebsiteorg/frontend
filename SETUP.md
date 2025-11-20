# Setup Guide

## Prerequisites

- Node.js 18+ installed
- PostgreSQL database (local or cloud)
- Cloudinary account (for image uploads)
- Email service (for OTP - optional for development)

## Installation Steps

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Set Up Environment Variables**
   Create a `.env` file in the root directory:
   ```env
   DATABASE_URL="postgresql://user:password@localhost:5432/service_booking?schema=public"
   NEXTAUTH_SECRET="your-secret-key-here-generate-with-openssl-rand-base64-32"
   NEXTAUTH_URL="http://localhost:3000"
   CLOUDINARY_CLOUD_NAME="your-cloud-name"
   CLOUDINARY_API_KEY="your-api-key"
   CLOUDINARY_API_SECRET="your-api-secret"
   ```

3. **Set Up Database**
   ```bash
   npx prisma generate
   npx prisma db push
   npm run db:seed
   ```

4. **Run Development Server**
   ```bash
   npm run dev
   ```

5. **Access the Application**
   - Home: http://localhost:3000
   - Login: http://localhost:3000/login
   - Register: http://localhost:3000/register
   - Admin: http://localhost:3000/admin/login

## Default Credentials (from seed data)

- **Admin**: admin@servicehub.com / admin123
- **Customer**: customer@example.com / customer123
- **Provider**: rajesh@example.com / provider123

## Features Implemented

✅ Authentication (Email/Password + OTP)
✅ Customer Registration
✅ Provider Registration with Udyam Verification
✅ Home Page with all sections
✅ Service Listing with Filters
✅ Provider Profile Pages
✅ Booking System with OTP
✅ Payment History
✅ Customer Dashboard
✅ Provider Dashboard
✅ Admin Dashboard
✅ Favorites System
✅ Reviews System (schema ready)

## Next Steps for Production

1. Set up actual email/SMS service for OTP
2. Integrate payment gateway (Stripe/Razorpay)
3. Add image upload functionality
4. Set up proper error handling
5. Add unit and integration tests
6. Configure CI/CD pipeline
7. Set up monitoring and logging

