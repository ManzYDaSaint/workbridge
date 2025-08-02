# 🚀 WorkBridge

**WorkBridge** is a lightweight, WhatsApp-based job matching platform designed for underserved markets. It connects job seekers with employers in real time using rule-based logic — without the use of AI. The system operates primarily via WhatsApp, allowing users to register, browse, and apply for jobs without needing a smartphone app or internet-heavy interface.

---

## 📌 Features

### ✅ Job Seekers
- Register via WhatsApp
- Set profile: location, job category, experience, skills
- View matching job listings
- Apply instantly via WhatsApp
- Receive real-time job alerts

### ✅ Employers
- Post job openings via web dashboard or API
- Set job requirements: location, experience, category, etc.
- Receive matched candidates instantly
- Manage applicants from dashboard

### ✅ Admin
- Manage users, jobs, and employers
- Monitor system logs and matching history
- Optionally manage premium job listing plans

---

## ⚙️ Tech Stack

| Component    | Technology        |
|--------------|------------------|
| Backend      | Node.js (Express) |
| Database     | MySQL |
| WhatsApp API | Twilio |
| Admin Panel  | React.js |
| Hosting      | Cpanel |

---

## 🏗️ Project Structure

```bash
WorkBridge/
│
├── backend/              # Node.js backend logic
│   ├── controllers/      # Request handling
│   ├── models/           # DB schema definitions
│   ├── routes/           # API routes
│   └── utils/            # Matching engine, helpers
│
├── whatsapp-bot/         # WhatsApp webhook handlers
│   └── messageFlows.js   # User interaction logic
│
├── dashboard/            # Employer/Admin dashboard (React or HTML)
│
├── .env.example          # Sample environment config
└── README.md             # Project documentation
