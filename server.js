const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const moodRoutes = require('./routes/moodRoutes');
const resourceRoutes = require('./routes/resourceRoutes');
const goalRoutes = require('./routes/goalRoutes');

app.use('/api/moods', moodRoutes);
app.use('/api/resources', resourceRoutes);
app.use('/api/goals', goalRoutes);

// Root route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to MindTrack API 🧠' });
});

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ MongoDB Connected');
    app.listen(process.env.PORT || 5000, () => {
      console.log(`🚀 Server running on port ${process.env.PORT || 5000}`);
    });
  })
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err.message);
    process.exit(1);
  });
