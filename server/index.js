const express = require('express');
const cors = require('cors');
const { db } = require('./config/firebase');

const app = express();
const PORT = process.env.PORT || 3000;

// CORS CONFIGURATION
app.use(cors({
  origin: true,
  credentials: false,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  optionsSuccessStatus: 200
}));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');
  res.header('Access-Control-Max-Age', '3600');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).json({ success: true, message: 'CORS preflight OK' });
  }
  
  next();
});

app.use(express.json());

// ROOT ENDPOINT
app.get('/', (req, res) => {
  res.json({ 
    message: 'Anato-Learn API is running!', 
    timestamp: new Date().toISOString(),
    status: 'OK',
    firebase: db ? 'connected' : 'disconnected'
  });
});

// HEALTH ENDPOINT
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'Server is running', 
    timestamp: new Date().toISOString(),
    firebase: db ? 'connected' : 'disconnected'
  });
});

const authRoutes = require('./routes/auth');
const progressRoutes = require('./routes/progress');
const quizRoutes = require('./routes/quiz');

app.use('/api/auth', authRoutes);
app.use('/api/progress', progressRoutes);
app.use('/api/quiz', quizRoutes);

console.log('All routes loaded');

// FIREBASE TEST ENDPOINT
app.get('/api/test-firebase', async (req, res) => {
  try {
    const collections = await db.listCollections();
    const collectionNames = collections.map(col => col.id);
    
    res.json({ 
      success: true, 
      message: 'Firebase connected!',
      collections: collectionNames,
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

// ERROR HANDLING
app.use((err, req, res, next) => {
  console.error('Server Error:', err);
  res.status(500).json({ 
    success: false, 
    error: err.message || 'Something went wrong!',
    timestamp: new Date().toISOString()
  });
});

app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    error: 'Endpoint not found',
    path: req.originalUrl,
    timestamp: new Date().toISOString()
  });
});

module.exports = app;