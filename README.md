# 💼 Job Tracker App

A full-stack MERN application to help you track your job applications, stay organized, and manage your career progress.

**Live Demo:** [https://job-tracker-app-ma21.onrender.com](https://job-tracker-app-ma21.onrender.com)

---

## ✨ Features

- **CRUD Operations**: Create, read, update, and delete job applications.
- **Real-time Status Tracking**: Monitor applications through stages like "Applied", "Interview", "Offer", and "Rejected".
- **Rate Limiting**: Integrated with **Upstash Redis** to protect the API from abuse.
- **Modern UI**: Built with **Tailwind CSS v4** and **DaisyUI v5** for a sleek, responsive, and customizable dark-themed interface.
- **Responsive Design**: Works perfectly on mobile, tablet, and desktop screens.
- **User Notifications**: Interactive toast notifications for actions like creating or deleting jobs.

---

## 🚀 Tech Stack

### Frontend
- **React 19** & **Vite**
- **Tailwind CSS v4**
- **DaisyUI v5** (Forest Theme)
- **Lucide React** (Icons)
- **React Router Dom 7**
- **Axios** (API Requests)
- **React Hot Toast** (Notifications)

### Backend
- **Node.js** & **Express 5**
- **MongoDB** & **Mongoose**
- **Upstash Redis** (Rate Limiting)
- **Dotenv** (Environment variables)

---

## 🛠️ Installation & Setup

### Prerequisites
- Node.js installed
- MongoDB URI
- Upstash Redis credentials

### 1. Clone the repository
```bash
git clone https://github.com/abubakarmohaa2002-ux/job-tracker-app.git
cd job-tracker-app
```

### 2. Install dependencies
Install root, backend, and frontend dependencies:
```bash
npm install
npm install --prefix backend
npm install --prefix frontend
```

### 3. Environment Variables
Create a `.env` file in the `backend` folder and add the following:
```env
PORT=5000
MONGODB_URI=your_mongodb_uri
UPSTASH_REDIS_REST_URL=your_upstash_url
UPSTASH_REDIS_REST_TOKEN=your_upstash_token
NODE_ENV=development
```

### 4. Run the application
Run both backend and frontend in development mode:
```bash
# In the root directory
npm run dev --prefix backend
npm run dev --prefix frontend
```
The app will be available at `http://localhost:5173`.

---

## 📦 Deployment

The app is optimized for deployment on **Render**.

### Build Command
```bash
npm install --prefix backend && npm install --prefix frontend && npm run build --prefix frontend
```

### Start Command
```bash
npm run start --prefix backend
```

---

