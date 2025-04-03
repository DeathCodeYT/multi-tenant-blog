# **Multi-Tenant Blog Application**  

🚀 A **scalable and feature-rich** multi-tenant blog application built with the **MERN Stack**, using **Next.js, Express, MongoDB, ShadCN, and TailwindCSS**.  

This project follows **industry best practices** and covers **advanced full-stack concepts**, including **OTP-based authentication, global error handling, custom middlewares, API response handling**, and much more!  

## 📌 **Tech Stack**  
- **Frontend**: Next.js (Hosted on **Port 4000**)  
- **Backend**: Node.js, Express, MongoDB (Hosted on **Port 4001**)  
- **Styling**: TailwindCSS & ShadCN  
- **Authentication**: OTP-based Email Verification  
- **Security Features**: Role-based Access, Secure API Endpoints, JWT Authentication  

## ✨ **Features**  

### ✅ **Backend (Express & MongoDB)**  
- **Complete Authentication System** (OTP Email Verification, JWT)  
- **Role-Based Access Control (RBAC)**  
- **Global Error Handling & Custom Middlewares**  
- **Custom API Response Wrapper**  
- **Secure User Authentication with Industry Standards**  
- **Async Wrapper for Clean and Efficient Code**  

### ✅ **Frontend (Next.js + Tailwind + ShadCN)**  
- **User-friendly UI with ShadCN Components**  
- **Modern Design with TailwindCSS**  
- **Seamless API Integration with Backend**  
- **Dynamic Content Rendering with Next.js**  
- **Optimized Performance with Server-Side Rendering (SSR)**  

## 🔥 **Project Setup**  

### **1️⃣ Clone the Repository**  
```sh
git clone https://github.com/your-username/multi-tenant-blog.git
cd multi-tenant-blog
```

### **2️⃣ Setup Backend**  
```sh
cd backend
npm install
```
#### **Configure Environment Variables**  
Create a `.env` file in the **backend** folder and add:  
```
PORT=4001
MONGO_URI="mongodb://localhost:27017/BlogApp"
JWT_SECRET="Any@Secrete"
ACCESS_TOKEN_EXP="5d"
REFRESH_TOKEN_EXP="10d"
ADMIN_USERNAME="anyUserNameWhichIsGoingToBeAdmin"
CLOUDINARY_CLOUD_NAME="Cloud name"
CLOUDINARY_API_KEY="Api Key"
CLOUDINARY_API_SECRET="API Secrete"
GMAIL_PASSWORD="your Gmail app password"
```
#### **Run the Backend Server**  
```sh
npm run dev
```
Server will start at **http://localhost:4001**

---

### **3️⃣ Setup Frontend**  
```sh
cd ../frontend
npm install
```
#### **Configure Environment Variables**  
Create a `.env` file in the **frontend** folder and add:  
```
NEXT_PUBLIC_API_URL="http://localhost:4000/api/v1"
```
#### **Run the Frontend Server**  
```sh
npm run dev
```
Frontend will start at **http://localhost:4000**

## 🚀 **How to Use**  
1. **Signup/Login** using OTP-based email verification.  
2. **Create & Manage Blogs** as a tenant.  
3. **Role-based Access** for different user types.  
4. **Explore & Read Blogs** dynamically rendered via Next.js.  

## 📌 **Project Structure**  

```
multi-tenant-blog/
│── backend/          # Express & MongoDB Backend
│   ├── controllers/  # Business logic
│   ├── models/       # Mongoose Schemas
│   ├── routes/       # API Endpoints
│   ├── middlewares/  # Authentication, Error Handling
│   ├── utils/        # Custom Helpers
│   ├── .env          # Environment Variables
│   ├── server.js     # Express App Entry Point
│   └── package.json  # Dependencies & Scripts
│
│── frontend/         # Next.js Frontend
│   ├── public
│   ├── src
│       ├── components # Custom Components
│       ├── app     # Pages and router
│       ├── hooks
│       ├── lib     # some tailwind lib
│       ├── stores    # State store with Zustand
│   ├── next.config.js # Next.js Configuration
│   ├── package.json  # Dependencies & Scripts
│
└── README.md         # Project Documentation
```

## 💡 **Motivation & Learning Goals**  
This project is designed to give you **real-world full-stack experience** by covering **complex authentication, scalable architecture, and industry-standard best practices**.  

📢 *"The best way to learn is by building! Keep coding and growing!"*  



🔗 **Follow & Star the Repo!** 🚀
