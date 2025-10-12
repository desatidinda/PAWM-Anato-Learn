const express = require('express');
const router = express.Router();
const { admin, db } = require('../config/firebase');

router.get('/list', async (req, res) => {
  try {
    const quizzesSnapshot = await db.collection('quizzes').get();
    const quizzes = [];
    
    quizzesSnapshot.forEach(doc => {
      const data = doc.data();
      quizzes.push({
        id: doc.id,
        title: data.title,
        category: data.category,
        description: data.description,
        totalQuestions: data.totalQuestions,
        timeLimit: data.timeLimit,
        difficulty: data.difficulty || 'medium',
        isActive: data.isActive !== false,
        image: data.image || `./assets/quiz/${doc.id}.jpg`,
        type: doc.id
      });
    });
    
    res.json({ success: true, data: quizzes });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

router.get('/:quizId', async (req, res) => {
  try {
    const { quizId } = req.params;
    const quizDoc = await db.collection('quizzes').doc(quizId).get();
    
    if (!quizDoc.exists) {
      return res.status(404).json({ success: false, error: 'Quiz not found' });
    }
    
    const quizData = quizDoc.data();
    res.json({ success: true, data: { id: quizDoc.id, ...quizData } });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;