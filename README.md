# Sports Management Application

A full-stack web application for managing sports players with registration, image upload, and player management features.

## Features

- Player registration with image upload
- View all registered players
- Individual player details
- Delete players
- Responsive UI with dark/light theme support

## Tech Stack

- **Frontend**: React + Vite
- **Backend**: Node.js + Express
- **Database**: MongoDB
- **File Storage**: Local file system for images

## Prerequisites

Before running this application, make sure you have the following installed:

1. **Node.js** (v16 or higher) - [Download here](https://nodejs.org/)
2. **MongoDB** - [Download here](https://www.mongodb.com/try/download/community)

### Installing MongoDB on Windows

1. Download MongoDB Community Server from the official website
2. Run the installer and follow the installation wizard
3. During installation, you can choose to install MongoDB as a service
4. After installation, MongoDB should start automatically
5. Alternatively, you can start MongoDB manually by running `mongod` from the command line

### Installing MongoDB on macOS (using Homebrew)

```bash
brew install mongodb-community
brew services start mongodb-community
```

### Installing MongoDB on Linux

```bash
# Ubuntu/Debian
sudo apt-get install mongodb

# CentOS/RHEL
sudo yum install mongodb
```

## Installation

1. Clone or download this repository
2. Navigate to the project directory

### Backend Setup

```bash
cd backend
npm install
```

### Frontend Setup

```bash
cd frontend
npm install
```

## Running the Application

### Start MongoDB

Make sure MongoDB is running on your system. The application connects to `mongodb://localhost:27017/sports-management`.

### Start the Backend

```bash
cd backend
npm start
```

The backend will start on `http://localhost:5000`

### Start the Frontend

```bash
cd frontend
npm run dev
```

The frontend will start on `http://localhost:5173`

## API Endpoints

- `GET /api/health` - Health check
- `POST /api/players/register` - Register a new player (with image upload)
- `GET /api/players` - Get all players
- `GET /api/players/:id` - Get a specific player
- `DELETE /api/players/:id` - Delete a player

## Project Structure

```
sports-management/
├── backend/
│   ├── server.js
│   ├── package.json
│   └── uploads/          # Uploaded player images
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── styles/
│   │   └── ...
│   ├── package.json
│   └── ...
└── README.md
```

## Development

- The backend uses ES modules (`"type": "module"` in package.json)
- File uploads are stored in the `backend/uploads/` directory
- Images are served statically from `/uploads/` path
- MongoDB stores player data with automatic timestamps

## Troubleshooting

### MongoDB Connection Issues

- Ensure MongoDB is running: `net start MongoDB` (Windows) or `brew services start mongodb-community` (macOS)
- Check if MongoDB is listening on port 27017
- Verify the connection string in `backend/server.js`

### Port Conflicts

- Backend runs on port 5000 by default
- Frontend runs on port 5173 by default
- Make sure these ports are available

### File Upload Issues

- Ensure the `backend/uploads/` directory exists and is writable
- Check file permissions if uploads fail