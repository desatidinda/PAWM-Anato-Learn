const express = require('express');
const cors = require('cors');

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

// TRY FIREBASE
let db;
try {
  const firebase = require('./config/firebase');
  db = firebase.db;
  console.log('Firebase initialized');
} catch (error) {
  console.error('Firebase initialization failed:', error.message);
  db = null;
}

// ROOT ENDPOINT
app.get('/', (req, res) => {
  res.json({ 
    message: 'Anato-Learn API is running!', 
    timestamp: new Date().toISOString(),
    status: 'OK',
    firebase: db ? 'connected' : 'not configured',
    endpoints: [
      'GET /',
      'GET /api/health',
      'GET /api/test-firebase',
      'GET /api/quiz/list',
      'GET /api/quiz/:quizId',
      'POST /api/auth/register',
      'POST /api/auth/login'
    ]
  });
});

// HEALTH ENDPOINT
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'Server is running', 
    timestamp: new Date().toISOString(),
    firebase: db ? 'connected' : 'not configured'
  });
});

// FIREBASE TEST ENDPOINT
app.get('/api/test-firebase', async (req, res) => {
  console.log('Testing Firebase connection...');
  
  if (!db) {
    return res.status(500).json({ 
      success: false, 
      message: 'Firebase not initialized',
      env: {
        project_id: process.env.FIREBASE_PROJECT_ID ? 'set' : 'missing',
        private_key: process.env.FIREBASE_PRIVATE_KEY ? 'set' : 'missing',
        client_email: process.env.FIREBASE_CLIENT_EMAIL ? 'set' : 'missing'
      },
      timestamp: new Date().toISOString()
    });
  }

  try {
    const collections = await db.listCollections();
    const collectionNames = collections.map(col => col.id);
    
    console.log('Firebase test successful:', collectionNames);
    
    res.json({ 
      success: true, 
      message: 'Firebase connected successfully!',
      collections: collectionNames,
      collectionCount: collectionNames.length,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Firebase test failed:', error);
    res.status(500).json({ 
      success: false, 
      error: error.message,
      timestamp: new Date().toISOString()
    });
  }
});

// LOAD ROUTES
try {
  const authRoutes = require('./routes/auth');
  const progressRoutes = require('./routes/progress');
  const quizRoutes = require('./routes/quiz');

  app.use('/api/auth', authRoutes);
  app.use('/api/progress', progressRoutes);
  app.use('/api/quiz', quizRoutes);
  
  console.log('All routes loaded');
} catch (error) {
  console.error('Error loading routes:', error.message);
}

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
  console.log('404 - Endpoint not found:', req.originalUrl);
  res.status(404).json({
    success: false,
    error: 'Endpoint not found',
    path: req.originalUrl,
    method: req.method,
    availableEndpoints: [
      'GET /',
      'GET /api/health',
      'GET /api/test-firebase',
      'GET /api/quiz/list',
      'GET /api/quiz/:quizId',
      'POST /api/auth/register',
      'POST /api/auth/login'
    ],
    timestamp: new Date().toISOString()
  });
});

module.exports = app;

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Backend URL: http://localhost:${PORT}`);
  });
}