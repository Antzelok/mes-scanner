
📘 QR Device Error Reporter

A modern web application for scanning device QR codes, capturing live geolocation, and submitting device error reports with ease.

This project is built with Next.js, React, Tailwind CSS, Redux Toolkit, Prisma, NextAuth, and several powerful utilities including react-qr-scanner and react-geolocated.

🚀 Features
🔍 QR Code Scanning

Scan device QR codes using your device camera
Extract serial number / device info instantly
Built on top of react-qr-scanner

📍 Automatic Geolocation
Get the user’s current latitude & longitude with one click
Uses react-geolocated for permission handling and accuracy feedback

📝 Error Reporting
Submit detailed error records for devices
Form validation powered by Zod
Stores data securely in the database using Prisma ORM

🔐 Admin Authentication
Admin-only dashboard
Login via NextAuth Credentials Provider
Protected routes and session-based access

⚛️ Modern React UI
Built using the Next.js App Router
Styled with Tailwind CSS
State managed through Redux Toolkit + RTK Query
Fully responsive frontend

🧰 Tech Stack
Frontend
React 18 / Next.js 14
Tailwind CSS
Redux Toolkit
RTK Query
react-qr-scanner
react-geolocated

Backend
Next.js API Routes
Prisma ORM (PostgreSQL)
NextAuth.js (Credentials Strategy)
Validation
Zod schema validation

📁 Features Overview
👨‍💼 Admin Login

Admins authenticate via email & password.
NextAuth handles sessions with JWT strategy.

🖨 Scan & Report Workflow
Click Scan QR
Automatically read:
Device EUI
Serial Number
Click Get Location to fetch:
Latitude
Longitude
Fill in:
Error type(s)
Actions taken
Optional comment
Submit report → stored in database via Prisma

📊 View Stored Error Records

Admins can access and manage all stored device error logs.

📦 Installation
1. Clone the repo
git clone https://github.com/your-username/Antzelok/mes-digital
cd repo-name

2. Install dependencies
npm install

3. Create .env file
DATABASE_URL=your_prisma_database_url
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_random_secret

4. Push Prisma schema
npx prisma migrate dev

5. Start the development server
npm run dev
