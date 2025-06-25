# Expense Tracker – Architecture & Flow



## 1. High-Level Architecture

```
[ User (Browser) ]
      |
      v
[ React Frontend (Vite, TypeScript, Tailwind) ]
      |
      v
[ REST API (Node.js, Express) ]
      |
      v
[ MongoDB Database ]
```

- **Frontend**: SPA built with React, communicates with backend via REST API.
- **Backend**: Express server exposes API endpoints, handles authentication, business logic, and serves static frontend files in production.
- **Database**: MongoDB stores users, expenses, and related data.

---

## 2. Application Flow

### User Journey
1. **Registration/Login**: User signs up or logs in. JWT token is issued and stored in localStorage.
2. **Dashboard**: After login, user sees analytics, stats, and recent expenses. All data is fetched via authenticated API calls.
3. **Expense Management**: User can add, edit, delete, and filter expenses. All changes are sent to the backend and persisted in MongoDB.
4. **Profile & Preferences**: User can update profile, avatar, currency, and theme. Theme changes are applied instantly.
5. **Chatbot**: User can interact with the chatbot for help and tips.

### API Flow
- **Frontend** sends HTTP requests (with JWT in headers) to `/api/*` endpoints.
- **Backend** authenticates requests, processes logic, and interacts with MongoDB.
- **Responses** are sent back as JSON.

---

## 3. Key Components

### Frontend
- **React Context**: Manages authentication state and user preferences.
- **Pages/Components**: Dashboard, Profile, Expense List, Chatbot, etc.
- **Theme Switching**: Applies dark/light mode using Tailwind's class-based dark mode.

### Backend
- **Express Middleware**: Handles CORS, JSON parsing, authentication (JWT).
- **Routes**: `/api/auth`, `/api/expenses`, `/api/users`.
- **Models**: User, Expense (Mongoose schemas).
- **JWT Auth**: Protects private routes, verifies tokens.

### Database
- **MongoDB**: Stores users, expenses, and preferences.
- **Indexes**: For efficient queries on user and date.

---

## 4. Deployment & Docker
- **Dockerfile**: Multi-stage build for frontend and backend.
- **Production**: Single container runs both backend API and serves static frontend.
- **Environment Variables**: MongoDB URI, JWT secret, and port are set via `.env` or Docker `-e` flags.

---

## 5. Diagram

```
+-------------------+        HTTP        +-------------------+        MongoDB Protocol        +-------------------+
|   User Browser    | <----------------> |   Node/Express    | <---------------------------> |     MongoDB       |
| (React Frontend)  |   REST API calls   |    Backend API    |        Queries/Updates       |    Database       |
+-------------------+                    +-------------------+                              +-------------------+
```

---

## 6. Security & Best Practices
- Passwords are hashed with bcryptjs.
- JWT tokens are used for stateless authentication.
- CORS is configured for frontend-backend communication.
- Sensitive data is kept in environment variables.

---

## 7. Extensibility
- Add more features (budgets, notifications, integrations) by extending backend routes and frontend components.
- Easily deployable anywhere with Docker.

---

For more details, see the codebase and README.md. 
