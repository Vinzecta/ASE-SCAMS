# SCAMS - Smart Campus System

SCAMS (Smart Campus System) is a full-stack web application for campus classroom management. The system provides a centralized platform for room scheduling, classroom reservation, and academic resource management. It is built with React, Node.js, Express, and MongoDB, following a client-server architecture.

## Features

- User authentication with JWT
- Classroom schedule management
- Room booking and reservation
- Calendar-based schedule visualization
- Dashboard for campus resources
- Course, teacher, room, and schedule management
- RESTful API with Swagger documentation

## Tech Stack

### Frontend

- React.js
- TypeScript
- Vite
- React Router DOM
- Axios

### Backend

- Node.js
- Express.js
- JWT
- Swagger

### Database

- MongoDB
- Mongoose

## Installation

Clone the repository:

```bash
git clone https://github.com/Vinzecta/ASE-SCAMS.git
cd ASE-SCAMS
```

Install frontend dependencies:

```bash
npm install
```

Install backend dependencies:

```bash
cd back_end
npm install
```

Create a `.env` file inside the `back_end` directory:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

Run the backend server:

```bash
cd back_end
npm start
```

Run the frontend:

```bash
npm run dev
```

## License

This project was developed for educational purposes
