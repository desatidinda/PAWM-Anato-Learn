const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.options('*', (req, res) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With, Accept');
  res.header('Access-Control-Max-Age', '86400');
  res.status(204).send();
});

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept'],
  credentials: false,
  optionsSuccessStatus: 204
}));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With, Accept');
  res.header('Access-Control-Allow-Credentials', 'false');
  next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  console.log(`${req.method} ${req.path} - Origin: ${req.headers.origin || 'none'}`);
  next();
});

// FIREBASE INITIALIZATION
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
    cors: 'enabled',
    endpoints: {
      health: '/api/health',
      testFirebase: '/api/test-firebase',
      quizList: '/api/quiz/list',
      quizDetail: '/api/quiz/:quizId',
      authRegister: 'POST /api/auth/register',
      authLogin: 'POST /api/auth/login'
    }
  });
});

// HEALTH ENDPOINT
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'Server is running', 
    timestamp: new Date().toISOString(),
    firebase: db ? 'connected' : 'not configured',
    cors: 'enabled'
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

app.use((err, req, res, next) => {
  console.error('Server Error:', err);
  res.status(500).json({ 
    success: false, 
    error: err.message || 'Internal server error',
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
    timestamp: new Date().toISOString()
  });
});

module.exports = app;

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Backend URL: http://localhost:${PORT}`);
    console.log(`CORS enabled for all origins`);
  });
}