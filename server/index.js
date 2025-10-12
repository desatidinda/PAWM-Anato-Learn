const express = require('express');
const cors = require('cors');
const { admin, db } = require('./config/firebase');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

app.use(express.json());

// Routes
const authRoutes = require('./routes/auth');
const progressRoutes = require('./routes/progress');
const quizRoutes = require('./routes/quiz');

app.use('/api/auth', authRoutes);
app.use('/api/progress', progressRoutes);
app.use('/api/quiz', quizRoutes);

app.get('/', (req, res) => {
  res.json({ message: 'Anato-Learn API is running!' });
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running' });
});

// Firebase connection
app.get('/test-firebase', async (req, res) => {
  try {
    const collections = await db.listCollections();
    res.json({ 
      success: true, 
      message: 'Firebase connected!',
      collections: collections.length 
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, error: 'Something went wrong!' });
});

app.listen(PORT, () => {
  console.log(`   Server running on port ${PORT}`);
  console.log(`   API Endpoints:`);
  console.log(`   POST /api/auth/create-profile`);
  console.log(`   GET  /api/auth/profile`);
  console.log(`   POST /api/progress/quiz`);
  console.log(`   GET  /api/progress/quiz/:userId`);
  console.log(`   GET  /api/progress/quiz/:userId/:quizId`);
  console.log(`   GET  /api/quiz/list`);
  console.log(`   GET  /api/quiz/:quizId`);
  console.log(`   POST /api/quiz/create`);
});

module.exports = app;