<h1 align="center">
  <span style="padding: 0.2em 0.6em; border-radius: 6px;">
    Perfect <span style="color: #02417b;">Resume</span>
  </span>
</h1> 


Perfect Resume is a MERN stack web application that helps users create, customize, and download professional resumes effortlessly. It features real-time editing, LinkedIn data scraping, multiple template options, and one-click PDF export. The platform offers secure authentication and storage, making resume building intuitive and powerful.

---

## 🚀 Live Demo
https://perfect-resume-sable.vercel.app

## 🔍 Features

- 🧑‍🎓 Real-time resume editor with instant preview  
- 🔗 LinkedIn scraping to auto-fill your resume  
- 🎨 Customizable templates and layouts  
- 🖨️ Download resume as high-quality PDF  
- 🔐 JWT-based authentication with cookies and localStorage  
- 📁 Dashboard for managing multiple resumes  

---

## 📄 Pages Description

### 1. **Landing Page**
<p align="center">
  <img src="./images/landing.png" alt="landing" style="width: 100%; max-width: 800px;" />
</p>


### 2. **Authentication (Login / Register)**
- User login and sign-up with form validation
- Tokens stored in cookies and localStorage
<p align="center">
  <img src="./images/signup.png" alt="signup" style="width: 100%; max-width: 800px;" />
</p>
<p align="center">
  <img src="./images/login.png" alt="login" style="width: 100%; max-width: 800px;" />
</p>

### 3. **Dashboard**
- Displays all resumes created by the user
- Options to edit, delete, duplicate, or download resumes
<p align="center">
  <img src="./images/dashboard.png" alt="dashboard" style="width: 100%; max-width: 800px;" />
</p>

### 4. **Resume Editor**
- Modular form sections: Personal Info, Education, Work Experience, Skills, Projects, etc.
- Real-time preview of the resume
- Auto-fill resume data from LinkedIn profile
<p align="center">
  <img src="./images/linkedin.png" alt="linkedin" style="width: 100%; max-width: 800px;" />
</p>
<p align="center">
  <img src="./images/creation.png" alt="creation" style="width: 100%; max-width: 800px;" />
</p>

### 5. **Template Selector**
- Multiple professionally designed templates
- Instantly applies selected template to preview
<p align="center">
  <img src="./images/template.png" alt="template" style="width: 100%; max-width: 800px;" />
</p>

### 6. **Preview & Download**
- Final preview of the selected resume template
- Option to download as PDF
<p align="center">
  <img src="./images/download.png" alt="download" style="width: 100%; max-width: 800px;" />
</p>

---

## 🛠️ Installation Instructions

### 1. Clone the repository

```bash
git clone https://github.com/KarthikeyaTadiparti/Perfect-Resume.git
cd Perfect-Resume
```
### 2. Install dependencies
```bash
# Client setup
cd client
npm install

# Server setup
cd server
npm install
```

### 3. Run the application
```bash
# Start server
cd server
npm run dev

# In a new terminal, start client
cd client
npm start
```

