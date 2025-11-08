# 📚 Library Capstone (MERN Stack)

A full-stack MERN (MongoDB, Express, React, Node.js) project with a Node/Express backend and a React (Vite) frontend.  
This project uses `concurrently` to run both the server and client with a single command.

---

## 🚀 Getting Started

### 1. Clone the repository
```bash
git clone <your-repo-url>
cd MERN_StackWeb
```

### 2. Install dependencies
From the root of the project, run:
```bash
npm install
```
> This will install both **server** and **client** dependencies automatically (thanks to the `postinstall` script).

### 3. Run the development environment
```bash
npm run dev
```

This will:
- Start the **Express backend** (`server/index.js`)
- Start the **React frontend** (Vite dev server in `/client`)

You can then open your browser at:
```
http://localhost:5173
```
(default Vite port)

---

## ⚙️ Other Scripts

### Seed the database
```bash
npm run seed
```

---

## 🛠 Tech Stack
- **Frontend:** React + Vite
- **Backend:** Node.js + Express
- **Database:** MongoDB (via Mongoose)
- **Tools:** concurrently, nodemon, dotenv

---

## 📄 Environment Variables
Create a `.env` file inside the `server/` folder with the following:
```
MONGO_URI=your_mongo_connection_string
PORT=5000
```
