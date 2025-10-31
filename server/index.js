const express = require('express');
const cors = require('cors');

let admin, db;
try {
  const firebase = require('./config/firebase');
  admin = firebase.admin;
  db = firebase.db;
} catch (error) {
  console.log('Firebase config not found');
  admin = null;
  db = null;
}

const app = express();
const PORT = process.env.PORT || 3000;

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', '*');
  res.header('Access-Control-Allow-Headers', '*');
  res.header('Access-Control-Allow-Credentials', 'false');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  next();
});

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['*'],
  credentials: false
}));

app.use(express.json());

try {
  const authRoutes = require('./routes/auth');
  app.use('/api/auth', authRoutes);
  console.log('Auth routes loaded');
} catch (error) {
  console.error('Auth routes failed:', error.message);
}

try {
  const progressRoutes = require('./routes/progress');
  app.use('/api/progress', progressRoutes);
  console.log('Progress routes loaded');
} catch (error) {
  console.error('Progress routes failed:', error.message);
}

try {
  const quizRoutes = require('./routes/quiz');
  app.use('/api/quiz', quizRoutes);
  console.log('Quiz routes loaded');
} catch (error) {
  console.error('Quiz routes failed:', error.message);
}

// ROOT ENDPOINT
app.get('/', (req, res) => {
  res.json({ 
    message: 'Anato-Learn API is running!', 
    timestamp: new Date().toISOString(),
    status: 'OK',
    firebase: db ? 'connected' : 'not available'
  });
});

// HEALTH ENDPOINT
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'Server is running', 
    timestamp: new Date().toISOString(),
    firebase: db ? 'connected' : 'not available'
  });
});

// FIREBASE CONNECTION TEST
app.get('/api/test-firebase', async (req, res) => {
  if (!db) {
    return res.json({ 
      success: false, 
      message: 'Firebase not configured',
      timestamp: new Date().toISOString()
    });
  }

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

// ERROR HANDLING MIDDLEWARE
app.use((err, req, res, next) => {
  console.error('Server Error:', err.stack);
  res.status(500).json({ 
    success: false, 
    error: 'Something went wrong!',
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