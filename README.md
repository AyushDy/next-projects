# Catalyst 🚀  
**A Modern Project Management & Collaboration Platform**

🔗 **Live Demo:** [catalyst-gamma-weld.vercel.app](https://catalyst-gamma-weld.vercel.app/)

Catalyst is a full-stack, production-ready project management platform inspired by tools like Jira and Trello. It is designed to help teams plan, track, and deliver work efficiently using projects, Kanban boards, tasks, and team-based collaboration — all wrapped in a clean, responsive UI.

Built with **Next.js 15**, Catalyst focuses on scalability, role-based access control, and real-world collaboration workflows.

---

## ✨ Key Features

### 🔐 Authentication & User Management
- Email/password authentication  
- Google OAuth single sign-on  
- User profiles with name, bio, and profile image  
- Secure profile image uploads via Cloudinary  

---

### 📁 Project Management
- Create and manage multiple projects  
- Public and private project visibility  
- Role-based project members (Owner, Member)  
- Project configuration and settings  
- Safe project deletion  

---

### 📋 Kanban Boards
- Multiple boards per project  
- Customizable columns with ordering  
- Drag-and-drop task movement  
- Archive completed boards  
- Default board selection per project  

---

### ✅ Task Management
- Create tasks with title and description  
- Task status workflow:  
  - TODO  
  - IN_PROGRESS  
  - REVIEW  
  - DONE  
  - BLOCKED  
- Priority levels and due dates  
- Task completion checkboxes  
- Assign tasks to users or teams  
- Comment system for task discussions  

---

### 👥 Team Collaboration
- Create and manage teams  
- Team roles: Member, Lead, Admin  
- Assign teams to projects  
- Team-specific board access  
- Manage team membership dynamically  

---

### 🎨 UI / UX
- Dark and Light theme support  
- Fully responsive layout  
- Sidebar-based navigation  
- Notification system  
- Search functionality  
- Skeleton loaders and loading states  

---

## 🧱 Tech Stack

| Layer | Technology |
|-----|-----------|
| Framework | Next.js 15 (App Router, Turbopack) |
| Database | MongoDB |
| ORM | Prisma |
| API | GraphQL (Apollo Server) |
| State Management | React Query |
| Styling | Tailwind CSS + Radix UI |
| Authentication | NextAuth.js |
| Media Storage | Cloudinary |

---

## 🏗 Architecture Highlights
- Modular, scalable folder structure  
- GraphQL API for efficient data fetching  
- Role-based access control (RBAC)  
- Optimized client-server data synchronization  
- Production-grade authentication and authorization flow  

---

## 🚀 Getting Started

```bash
# Clone the repository
git clone https://github.com/AyushDy/next-projects.git

# Navigate to the project
cd z-personal/catalyst

# Install dependencies
npm install

# Run the development server
npm run dev
