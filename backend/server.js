import express from 'express';
import cors from 'cors';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { v4 as uuidv4 } from 'uuid';

const app = express();
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// ================= MIDDLEWARE =================
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// ================= FILE PATHS =================
const PLAYERS_FILE = path.join(__dirname, 'data', 'players.json');
const USERS_FILE = path.join(__dirname, 'data', 'users.json');

// ================= USER FUNCTIONS =================
const readUsers = () => {
  if (!fs.existsSync(USERS_FILE)) return [];
  return JSON.parse(fs.readFileSync(USERS_FILE, 'utf8'));
};

const writeUsers = (users) => {
  const dir = path.dirname(USERS_FILE);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
};

// ================= PLAYER FUNCTIONS =================
const readPlayers = () => {
  if (!fs.existsSync(PLAYERS_FILE)) return [];
  return JSON.parse(fs.readFileSync(PLAYERS_FILE, 'utf8'));
};

const writePlayers = (players) => {
  const dir = path.dirname(PLAYERS_FILE);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(PLAYERS_FILE, JSON.stringify(players, null, 2));
};

// ================= UPLOAD SETUP =================
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadsDir),
  filename: (req, file, cb) => {
    const name = `${Date.now()}-${uuidv4()}${path.extname(file.originalname)}`;
    cb(null, name);
  }
});

const upload = multer({ storage });

// ================= ROUTES =================

// Health
app.get('/api/health', (req, res) => {
  res.json({ message: 'Server running' });
});

// ================= AUTH =================

// Register
app.post('/api/auth/register', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'All fields required' });
  }

  const users = readUsers();

  if (users.find(u => u.email === email)) {
    return res.status(400).json({ message: 'User already exists' });
  }

  // 🔥 Assign role
  const role = email === 'admin@gmail.com' ? 'admin' : 'user';

  const newUser = {
    id: uuidv4(),
    email,
    password,
    role
  };

  users.push(newUser);
  writeUsers(users);

  res.json({ message: 'Registered successfully' });
});

// Login
app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;

  const users = readUsers();

  const user = users.find(
    u => u.email === email && u.password === password
  );

  if (!user) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  res.json({
    message: 'Login successful',
    user: {
      id: user.id,
      email: user.email,
      role: user.role
    }
  });
});

// ================= PLAYERS =================

// Register player
app.post('/api/players/register', upload.single('image'), (req, res) => {
  const { playerName, email, phone, age, sport } = req.body;

  if (!playerName || !email || !phone || !age || !sport) {
    return res.status(400).json({ message: 'Fill all fields' });
  }

  if (!req.file) {
    return res.status(400).json({ message: 'Image required' });
  }

  const players = readPlayers();

  if (players.find(p => p.email === email)) {
    return res.status(400).json({ message: 'Email exists' });
  }

  const newPlayer = {
    _id: uuidv4(),
    playerName,
    email,
    phone,
    age: parseInt(age),
    sport,
    imageUrl: `/uploads/${req.file.filename}`,
    createdAt: new Date().toISOString()
  };

  players.push(newPlayer);
  writePlayers(players);

  res.json({ message: 'Player registered', player: newPlayer });
});

// Get players
app.get('/api/players', (req, res) => {
  res.json(readPlayers());
});

// Delete player
app.delete('/api/players/:id', (req, res) => {
  const players = readPlayers();
  const index = players.findIndex(p => p._id === req.params.id);

  if (index === -1) {
    return res.status(404).json({ message: 'Not found' });
  }

  players.splice(index, 1);
  writePlayers(players);

  res.json({ message: 'Deleted' });
});

// ================= ERROR =================
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// ================= START =================
app.listen(5000, () => {
  console.log('Server running on http://localhost:5000');
});