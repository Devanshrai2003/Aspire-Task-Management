# Aspire - Task Management Application

## 📌 Overview

Aspire is a modern task management web application designed to help users organize their professional and personal responsibilities. It features an intuitive interface with a Kanban-style board that categorizes tasks into three stages: Not Started, In Progress, and Completed.

## ✨ Features

- **User Authentication**
  - Sign up with email, username, and password
  - Login with username and password
  - Guest login option for quick access without registration
  
- **Task Management**
  - Create, edit, and delete tasks
  - Categorize tasks (Work, Personal, etc.)
  - Set priority levels (Low, Medium, High)
  - Track task status (Not Started, In Progress, Completed)
  - Set deadlines for tasks
  - Add detailed descriptions to tasks

- **User Experience**
  - Responsive design for desktop and mobile devices
  - Visual indicators for task priority and status
  - Intuitive drag-and-drop interface (coming soon)
  - Clean, modern UI for optimal productivity

## 🚀 Live Demo

Access Aspire online at: [https://aspire-task-management.onrender.com](https://aspire-task-management.onrender.com)

## 💻 Technologies Used

- **Frontend**
  - HTML5, CSS3, JavaScript
  - Axios for API requests
  - Font Awesome for icons

- **Backend**
  - Node.js
  - Express.js
  - MongoDB (database)
  - JWT for authentication

- **Deployment**
  - Render (hosting platform)

## 🛠️ Installation and Setup

### Prerequisites
- Node.js and npm installed
- MongoDB installed locally or MongoDB Atlas account

### Local Development

1. Clone the repository
   ```bash
   git clone https://github.com/Devanshrai2003/aspire-task-management.git
   cd aspire-task-management
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory with the following variables:
   ```
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   PORT=5000
   ```

4. Start the development server
   ```bash
   npm run dev
   ```

5. Open your browser and navigate to `http://localhost:5000`

## 📋 Usage

1. **Sign Up / Login**
   - Create a new account or log in with existing credentials
   - Alternatively, use the "Log In As Guest" option for quick access

2. **Managing Tasks**
   - Click the "+" button in any column to add a new task
   - Fill out the task details form (title, description, priority, status, deadline, category)
   - Edit tasks by clicking the edit icon
   - Delete tasks by clicking the trash icon
   - Tasks are automatically sorted into the appropriate columns based on status

3. **Logging Out**
   - Click the "Log Out" button in the navigation bar
   - Guest user tasks are automatically deleted upon logout

## 🔮 Future Enhancements

- Drag and drop functionality for moving tasks between columns
- Task filtering and sorting options
- Dark/light theme toggle
- Task sharing and collaboration features
- Mobile application
- Calendar view for deadlines
- Email notifications for upcoming deadlines

## 👨‍💻 Developer

Made with ❤️ by [Devansh Rai](https://github.com/Devanshrai2003)

- GitHub: [https://github.com/Devanshrai2003](https://github.com/Devanshrai2003)
- Twitter: [https://x.com/devanshrai2003](https://x.com/devanshrai2003)
