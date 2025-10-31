const express = require('express');
const router = express.Router();

let db;
try {
  const firebase = require('../config/firebase');
  db = firebase.db;
} catch (error) {
  console.log('Firebase not available in quiz routes');
  db = null;
}

router.options('*', (req, res) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With, Accept');
  res.status(204).send();
});

// GET /api/quiz/list
router.get('/list', async (req, res) => {
  try {
    console.log('[QUIZ] Getting quiz list from Firebase...');
    console.log('[QUIZ] Origin:', req.headers.origin);
    
    if (!db) {
      return res.status(500).json({
        success: false,
        error: 'Firebase not initialized',
        timestamp: new Date().toISOString()
      });
    }
    
    const quizzesRef = db.collection('quizzes');
    const snapshot = await quizzesRef.get();
    
    if (snapshot.empty) {
      return res.json({
        success: false,
        error: 'No quizzes found in Firebase',
        timestamp: new Date().toISOString()
      });
    }
    
    const quizzes = [];
    snapshot.forEach(doc => {
      quizzes.push({
        id: doc.id,
        ...doc.data()
      });
    });

    console.log(`[QUIZ] Found ${quizzes.length} quizzes`);

    res.json({
      success: true,
      data: quizzes,
      timestamp: new Date().toISOString(),
      source: 'firebase'
    });

  } catch (error) {
    console.error('[QUIZ] Error getting quiz list:', error);
    res.status(500).json({
      success: false,
      error: error.message,
      timestamp: new Date().toISOString()
    });
  }
});

// GET /api/quiz/:quizId
router.get('/:quizId', async (req, res) => {
  try {
    const { quizId } = req.params;
    console.log(`[QUIZ] Getting quiz ${quizId} from Firebase...`);

    if (!db) {
      return res.status(500).json({
        success: false,
        error: 'Firebase not initialized',
        timestamp: new Date().toISOString()
      });
    }

    const quizRef = db.collection('quizzes').doc(quizId);
    const doc = await quizRef.get();

    if (!doc.exists) {
      return res.status(404).json({
        success: false,
        error: `Quiz '${quizId}' not found in Firebase`,
        timestamp: new Date().toISOString()
      });
    }

    const quizData = {
      id: doc.id,
      ...doc.data()
    };

    console.log(`[QUIZ] Found quiz ${quizId}`);

    res.json({
      success: true,
      data: quizData,
      timestamp: new Date().toISOString(),
      source: 'firebase'
    });

  } catch (error) {
    console.error(`[QUIZ] Error getting quiz:`, error);
    res.status(500).json({
      success: false,
      error: error.message,
      timestamp: new Date().toISOString()
    });
  }
});

module.exports = router;