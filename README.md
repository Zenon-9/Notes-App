# Notes App

A full-stack notes application with authentication, note management, and Docker-ready services.

## Project Overview

This repository contains a notes application split into two main parts:

- `Backend/`: Node.js + Express API with MongoDB, JWT authentication, and note/user controllers.
- `ui/`: React + Vite frontend with authentication, dashboard, and note editor.

## Key Features

- User signup and login
- JWT-based authentication
- Create, read, update, and delete notes
- MongoDB database persistence
- Docker Compose configuration for local development

## Architecture

- `Backend/server.js` starts the Express API and connects to MongoDB.
- `Backend/src/` contains app setup, routes, controllers, models, and auth middleware.
- `ui/` contains the React app and Vite configuration.
- `docker-compose.yml` orchestrates MongoDB, backend API, and frontend UI.

## Local Development

### Backend

1. Open a terminal in `Backend/`
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start in development mode:
   ```bash
   npm run dev
   ```
4. The backend listens on `http://localhost:5000` by default.

### Frontend

1. Open a terminal in `ui/`
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the Vite development server:
   ```bash
   npm run dev
   ```
4. The UI will be available at `http://localhost:5173`.

## Docker Setup

This project includes a `docker-compose.yml` file to run the full stack together.

```bash
docker compose up --build
```

Services:

- `mongodb`: MongoDB database exposed on port `27017`
- `backend`: Node.js API exposed on port `5000`
- `ui`: frontend served via Nginx on port `5173`

## Environment Variables

The backend uses the following environment variables:

- `PORT` - server port (default `5000`)
- `MONGO_URI` - MongoDB connection string
- `JWT_SECRET` - secret key for signing JWT tokens

## Notes

- The Docker Compose setup persists MongoDB data under `Backend/mongo_data`.
- The frontend uses `tailwindcss`, React, Redux Toolkit, and Axios.
- The backend uses `mongoose`, `bcryptjs`, `jsonwebtoken`, and `express`.

## License

This project is distributed under the `ISC` license.
