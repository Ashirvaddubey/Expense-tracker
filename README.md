# Expense Tracker

A modern, AI-inspired expense management platform for individuals, families, and teams. Track, analyze, and optimize your expenses with beautiful analytics, smart features, and a secure, user-friendly interface.

---

## 📐 Architecture Overview
For a detailed explanation of the application's structure, data flow, and deployment, see [ARCHITECTURE.md](./ARCHITECTURE.md).

- **High-level diagrams** of frontend, backend, and database
- **How authentication, API, and theming work**
- **Deployment and Dockerization details**
- **Security and extensibility notes**

---

## 🚀 Features
- **Instant Expense Capture:** Snap a photo of your bill or receipt and auto-categorize expenses.
- **Goal-Based Planning:** Set savings goals and track your progress visually.
- **Rewards & Badges:** Earn badges for smart spending and consistent tracking.
- **Split & Settle Instantly:** Easily split bills and settle up with friends or family.
- **Advanced Analytics:** Visualize your spending with interactive charts and reports.
- **Bank-Grade Security:** Your data is encrypted and protected.
- **Multi-User Support:** Personalized dashboards for every user.
- **Theme Switching (Light/Dark Mode):** Personalize your experience with a single click from your profile.
- **Integrated Chatbot Assistant:** Get instant help, tips, and answers to your questions right inside the app.

---

## 🛠️ Tech Stack
- **Frontend:** React, TypeScript, Vite, Tailwind CSS, Framer Motion
- **Backend:** Node.js, Express.js, MongoDB, Mongoose
- **Authentication:** JWT (JSON Web Token), bcryptjs

---

## 📦 Installation

### 1. Clone the Repository
```bash
git clone <your-repo-url>
cd project
```

### 2. Install Dependencies
#### Main Project (Frontend)
```bash
npm install
```
#### Backend
```bash
cd server
npm install
```

### 3. Environment Variables
Create a `.env` file in the `server` directory:
```
MONGO_URI=mongodb://localhost:27017/Expense-Management-System
JWT_SECRET=yourSuperSecretKey
PORT=5000
```

---

## ▶️ Running the App

### 1. Start the Backend
```bash
cd server
npm run dev
```

### 2. Start the Frontend
Open a new terminal in the root directory:
```bash
npm run dev
```

- Frontend: [http://localhost:5173](http://localhost:5173)
- Backend: [http://localhost:5000](http://localhost:5000)

---

## 📁 Folder Structure
```
project/
├── server/           # Backend (Node.js, Express, MongoDB)
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── server.js
│   └── ...
├── src/              # Frontend (React, TypeScript)
│   ├── components/
│   ├── pages/
│   ├── contexts/
│   ├── App.tsx
│   └── ...
├── package.json
├── README.md
└── ...
```

---

## 📝 Contribution
1. Fork the repository
2. Create a new branch (`git checkout -b feature/your-feature`)
3. Commit your changes (`git commit -m 'Add some feature'`)
4. Push to the branch (`git push origin feature/your-feature`)
5. Open a Pull Request

---

## 📧 Contact
For questions, suggestions, or support, open an issue or contact the maintainer.
Name-Ashirvad Dubey
Linkein-https://www.linkedin.com/in/ashirvad-dubey-a43bb7253/

---

## 🖼️ Screenshots

Showcase the app's look and feel!.

### Registration Page
![Registration Screenshot](https://github.com/user-attachments/assets/4867d64f-6458-463e-903b-c6c5b2200e4c)

### Login Page
![Login Screenshot](https://github.com/user-attachments/assets/755d3638-090a-48aa-87a3-2339337afa2a)

### Add Expense
![Expenses Screenshot](https://github.com/user-attachments/assets/c2b55a9c-4e10-4104-b2b2-b7c20c8a1a0c)

### Edit Expenses and Transactions
![Expenses Screenshot](https://github.com/user-attachments/assets/1bdc11d5-890a-4d06-a3b5-19ae192ef555)

### Dashboard
![Dashboard Screenshot](https://github.com/user-attachments/assets/7a7c361c-6fd2-4ba4-afb6-1efe216fd320)
![Dashboard Screenshot](https://github.com/user-attachments/assets/36e9ae76-6725-4b49-873a-0689570a9254)

### Chat Assistant
![ChatAssistant Screenshot](https://github.com/user-attachments/assets/7011160a-7334-4b9b-923b-80d6e3936a1d)

### Profile
![Profile Screenshot](https://github.com/user-attachments/assets/1cb43fd4-5d1b-47b5-a842-2471bff3f91d)

### MongoDB
![Database Screenshot](https://github.com/user-attachments/assets/bd341511-cd3e-43d3-a657-b20fc3408653)
![Database Screenshot](https://github.com/user-attachments/assets/c836b3c7-697b-4d94-b7c8-d9ba31ad9e39)

---

## 💡 Theme Switching
Easily toggle between light and dark mode from your profile page. The app will instantly update to match your preference.

## 🤖 Chatbot Assistant
Use the built-in chatbot for quick help, financial tips, and to answer your questions about using the platform.

**Enjoy taking control of your financial future with Expense Tracker!**

---

## 🐳 Docker

You can run the entire app (frontend + backend) in a single Docker container.

### 1. Build the Docker image
```bash
docker build -t expense-tracker .
```

### 2. Run the container
```bash
docker run -d -p 5000:5000 \
  -e MONGO_URI=your_mongo_uri \
  -e JWT_SECRET=your_jwt_secret \
  --name expense-tracker expense-tracker
```

- The backend API will be available at [http://localhost:5000/api](http://localhost:5000/api)
- The frontend will be served at [http://localhost:5000](http://localhost:5000)

> **Note:** You must provide your own MongoDB connection string and JWT secret as environment variables.
