require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');

const uploadRoute = require('./routes/upload');

const app = express();

app.use(cors());
app.use(express.json());

// ✅ Serve frontend FIRST
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// ✅ Logging AFTER routes setup
app.use((req, res, next) => {
  console.log(`Request handled by PORT: ${process.env.PORT}`);
  next();
});

// Routes
app.use('/upload', uploadRoute);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});