const express = require('express');
const router = express.Router();
const { admin, db } = require('../config/firebase');

router.get('/quiz/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const progressDoc = await db.collection('userProgress').doc(userId).get();
    
    if (progressDoc.exists) {
      const data = progressDoc.data();
      res.json({ 
        success: true, 
        data: {
          quizProgress: data.quizProgress || {},
          totalQuizzes: Object.keys(data.quizProgress || {}).length,
          totalHighScore: Object.values(data.quizProgress || {}).reduce((sum, quiz) => sum + (quiz.highScore || 0), 0)
        }
      });
    } else {
      res.json({ 
        success: true, 
        data: { quizProgress: {}, totalQuizzes: 0, totalHighScore: 0 }
      });
    }
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Save quiz score
router.post('/quiz', async (req, res) => {
  try {
    const { userId, quizId, score, totalQuestions, timeSpent } = req.body;
    
    if (!userId || !quizId || score === undefined) {
      return res.status(400).json({ success: false, error: 'Missing required fields' });
    }

    const progressRef = db.collection('userProgress').doc(userId);
    const progressDoc = await progressRef.get();
    
    let currentData = {};
    if (progressDoc.exists) {
      currentData = progressDoc.data();
    }
    if (!currentData.quizProgress) {
      currentData.quizProgress = {};
    }
    
    const currentQuizData = currentData.quizProgress[quizId] || {
      highScore: 0,
      attempts: 0,
      totalScore: 0,
      bestTime: null
    };
    
    currentQuizData.attempts += 1;
    currentQuizData.totalScore += score;
    currentQuizData.averageScore = Math.round(currentQuizData.totalScore / currentQuizData.attempts);
    currentQuizData.lastAttempt = new Date().toISOString();
    
    // Update high score
    if (score > currentQuizData.highScore) {
      currentQuizData.highScore = score;
      currentQuizData.isNewHighScore = true;
    } else {
      currentQuizData.isNewHighScore = false;
    }
    
    if (timeSpent && (currentQuizData.bestTime === null || timeSpent < currentQuizData.bestTime)) {
      currentQuizData.bestTime = timeSpent;
    }
    
    currentData.quizProgress[quizId] = currentQuizData;
    currentData.lastUpdated = new Date().toISOString();
    
    await progressRef.set(currentData, { merge: true });
    
    res.json({ 
      success: true, 
      data: currentQuizData,
      message: currentQuizData.isNewHighScore ? 'New high score!' : 'Score saved!'
    });
    
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

router.get('/quiz/:userId/:quizId', async (req, res) => {
  try {
    const { userId, quizId } = req.params;
    const progressDoc = await db.collection('userProgress').doc(userId).get();
    
    if (progressDoc.exists) {
      const data = progressDoc.data();
      const quizData = data.quizProgress?.[quizId] || { highScore: 0, attempts: 0 };
      res.json({ success: true, data: quizData });
    } else {
      res.json({ success: true, data: { highScore: 0, attempts: 0 } });
    }
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;