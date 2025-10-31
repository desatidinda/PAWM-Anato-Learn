const express = require('express');
const cors = require('cors');
const { admin, db } = require('./config/firebase');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  credentials: false
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
  res.json({ message: 'Anato-Learn API is running!', timestamp: new Date().toISOString() });
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running', timestamp: new Date().toISOString() });
});

// Firebase connection test
app.get('/api/test-firebase', async (req, res) => {
  try {
    const collections = await db.listCollections();
    res.json({ 
      success: true, 
      message: 'Firebase connected!',
      collections: collections.length,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      error: error.message,
      timestamp: new Date().toISOString()
    });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, error: 'Something went wrong!' });
});

// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
//   console.log(`Backend URL: https://be-anato-learn-6ex73rcgf-desati-dindas-projects.vercel.app`);
//   console.log(`Frontend URL: https://anato-learn.vercel.app`);
// });

module.exports = app;