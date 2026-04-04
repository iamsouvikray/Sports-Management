import express from 'express';
import cors from 'cors';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { v4 as uuidv4 } from 'uuid';

const app = express();
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Data file path
const PLAYERS_FILE = path.join(__dirname, 'data', 'players.json');

// Helper functions for JSON file operations
const readPlayers = () => {
  try {
    if (!fs.existsSync(PLAYERS_FILE)) {
      return [];
    }
    const data = fs.readFileSync(PLAYERS_FILE, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading players file:', error);
    return [];
  }
};

const writePlayers = (players) => {
  try {
    // Ensure data directory exists
    const dataDir = path.dirname(PLAYERS_FILE);
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }
    fs.writeFileSync(PLAYERS_FILE, JSON.stringify(players, null, 2));
  } catch (error) {
    console.error('Error writing players file:', error);
    throw error;
  }
};

// Create uploads directory if it doesn't exist
if (!fs.existsSync(path.join(__dirname, 'uploads'))) {
  fs.mkdirSync(path.join(__dirname, 'uploads'), { recursive: true });
}

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, 'uploads'));
  },
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${uuidv4()}${path.extname(file.originalname)}`;
    cb(null, uniqueName);
  }
});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    const allowedMimes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    if (allowedMimes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type. Only JPEG, PNG, GIF, and WebP are allowed.'));
    }
  }
});

// Routes

// Health check
app.get('/api/health', (req, res) => {
  res.json({ message: 'Server is running' });
});

// Register new player
app.post('/api/players/register', upload.single('image'), async (req, res) => {
  try {
    const { playerName, email, phone, age, sport, jersey_number, position } = req.body;

    // Validation
    if (!playerName || !email || !phone || !age || !sport) {
      return res.status(400).json({ message: 'Please fill all required fields' });
    }

    if (!req.file) {
      return res.status(400).json({ message: 'Image is required' });
    }

    // Read existing players
    const players = readPlayers();

    // Check if email already exists
    const existingPlayer = players.find(player => player.email === email);
    if (existingPlayer) {
      // Delete uploaded file
      fs.unlinkSync(path.join(__dirname, 'uploads', req.file.filename));
      return res.status(400).json({ message: 'Email already registered' });
    }

    // Create new player object
    const newPlayer = {
      _id: uuidv4(),
      playerName,
      email,
      phone,
      age: parseInt(age),
      sport,
      jersey_number: jersey_number || null,
      position: position || null,
      imageUrl: `/uploads/${req.file.filename}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    // Add to players array
    players.push(newPlayer);

    // Save to file
    writePlayers(players);

    res.status(201).json({
      message: 'Player registered successfully',
      player: newPlayer
    });
  } catch (error) {
    console.error('Registration error:', error);
    if (req.file) {
      try {
        fs.unlinkSync(path.join(__dirname, 'uploads', req.file.filename));
      } catch (e) {
        // File deletion error
      }
    }
    res.status(500).json({ message: 'Registration failed' });
  }
});

// Get all players
app.get('/api/players', async (req, res) => {
  try {
    const players = readPlayers();
    res.json(players);
  } catch (error) {
    console.error('Error fetching players:', error);
    res.status(500).json({ message: 'Failed to fetch players' });
  }
});

// Get single player
app.get('/api/players/:id', async (req, res) => {
  try {
    const players = readPlayers();
    const player = players.find(p => p._id === req.params.id);

    if (!player) {
      return res.status(404).json({ message: 'Player not found' });
    }

    res.json(player);
  } catch (error) {
    console.error('Error fetching player:', error);
    res.status(500).json({ message: 'Failed to fetch player' });
  }
});

// Delete player
app.delete('/api/players/:id', async (req, res) => {
  try {
    const players = readPlayers();
    const playerIndex = players.findIndex(p => p._id === req.params.id);

    if (playerIndex === -1) {
      return res.status(404).json({ message: 'Player not found' });
    }

    const player = players[playerIndex];

    // Delete image file
    const imagePath = path.join(__dirname, player.imageUrl);
    if (fs.existsSync(imagePath)) {
      fs.unlinkSync(imagePath);
    }

    // Remove player from array
    players.splice(playerIndex, 1);

    // Save updated players
    writePlayers(players);

    res.json({ message: 'Player deleted successfully' });
  } catch (error) {
    console.error('Error deleting player:', error);
    res.status(500).json({ message: 'Failed to delete player' });
  }
});

// Error handling middleware
app.use((error, req, res, next) => {
  console.error('Error:', error);
  res.status(500).json({ message: error.message || 'Server error' });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  console.log('Endpoints:');
  console.log('  POST   /api/players/register - Register new player');
  console.log('  GET    /api/players - Get all players');
  console.log('  GET    /api/players/:id - Get single player');
  console.log('  DELETE /api/players/:id - Delete player');
});
