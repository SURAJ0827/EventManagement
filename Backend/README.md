# Event Management Backend

This repository contains the backend code for the Event Management application. The backend is built using Node.js and Express, and it provides a RESTful API for managing events, users, and registrations.

## Features

- User authentication and authorization
- CRUD operations for events
- User registration and profile management
- Event registration and attendee management
- Integration with a database (e.g., MongoDB)

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)
- MongoDB

### Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/yourusername/eventmanagement-backend.git
   ```
2. Navigate to the project directory:
   ```sh
   cd eventmanagement-backend
   ```
3. Install the dependencies:
   ```sh
   npm install
   ```

### Configuration

1. Create a `.env` file in the root directory and add the following environment variables:
   ```env
   PORT=3000
   MONGODB_URI=mongodb://localhost:27017/eventmanagement
   JWT_SECRET=your_jwt_secret
   ```

### Running the Application

1. Start the MongoDB server:
   ```sh
   mongod
   ```
2. Start the application:
   ```sh
   node server.js
   ```
3. The server will be running at `http://localhost:5000`.

## API Endpoints

### Authentication

- `POST /users/register` - Register a new user
- `POST /users/login` - Login a user

### Events

- `GET /api/events` - Get all events
- `POST /api/events` - Create a new event
- `GET /api/events/:id` - Get a single event
- `PUT /api/events/:id` - Update an event
- `DELETE /api/events/:id` - Delete an event

### Users

- `GET /users` - Get all users
- `GET /users/:id` - Get a single user

### Registrations

- `POST /api/registrations` - Register for an event
- `GET /api/registrations` - Get all registrations
- `GET /api/registrations/:id` - Get a single registration
