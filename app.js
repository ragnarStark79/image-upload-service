require('dotenv').config();
const express = require('express');
const cors = require('cors');

const uploadRoute = require('./routes/upload');

const app = express();

app.use(cors());
app.use(express.json());


app.use((req, res, next) => {
  console.log(`Request handled by PORT: ${process.env.PORT}`);
  next();
});

app.use('/upload', uploadRoute);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});