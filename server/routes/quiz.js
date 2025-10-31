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

// GET /api/quiz/list - Get all available quizzes
router.get('/list', async (req, res) => {
  try {
    console.log('Getting quiz list...');
    
    const quizzes = [
      {
        id: 'circulatory',
        title: 'Circulatory System',
        description: 'Test your knowledge about the circulatory system',
        difficulty: 'medium',
        questionCount: 10,
        timeLimit: 300,
        available: true
      },
      {
        id: 'respiratory',
        title: 'Respiratory System', 
        description: 'Learn about breathing and lungs',
        difficulty: 'easy',
        questionCount: 8,
        timeLimit: 240,
        available: true
      },
      {
        id: 'nervous',
        title: 'Nervous System',
        description: 'Explore the brain and nervous system', 
        difficulty: 'hard',
        questionCount: 12,
        timeLimit: 360,
        available: true
      }
    ];

    res.json({
      success: true,
      data: quizzes,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Error getting quiz list:', error);
    res.status(500).json({
      success: false,
      error: error.message,
      timestamp: new Date().toISOString()
    });
  }
});

// GET /api/quiz/:quizId - Get specific quiz data
router.get('/:quizId', async (req, res) => {
  try {
    const { quizId } = req.params;
    console.log(`Getting quiz data for: ${quizId}`);

    // Sample quiz data - bisa diganti dengan Firebase nanti
    const quizData = {
      circulatory: {
        id: 'circulatory',
        title: 'Circulatory System Quiz',
        description: 'Test your knowledge about heart and blood circulation',
        timeLimit: 300,
        questions: [
          {
            id: 1,
            question: "What is the main function of the heart?",
            options: [
              "To pump blood throughout the body",
              "To filter oxygen from air", 
              "To produce red blood cells",
              "To store nutrients"
            ],
            correct: 0,
            explanation: "The heart's primary function is to pump blood throughout the body."
          },
          {
            id: 2,
            question: "Which blood vessel carries oxygenated blood away from the heart?",
            options: [
              "Veins",
              "Arteries", 
              "Capillaries",
              "Lymphatic vessels"
            ],
            correct: 1,
            explanation: "Arteries carry oxygenated blood away from the heart to body tissues."
          }
        ]
      },
      respiratory: {
        id: 'respiratory',
        title: 'Respiratory System Quiz',
        description: 'Learn about lungs and breathing',
        timeLimit: 240,
        questions: [
          {
            id: 1,
            question: "What is the main organ of the respiratory system?",
            options: [
              "Heart",
              "Lungs",
              "Brain", 
              "Liver"
            ],
            correct: 1,
            explanation: "The lungs are the main organs responsible for gas exchange."
          }
        ]
      }
    };

    const quiz = quizData[quizId];
    
    if (!quiz) {
      return res.status(404).json({
        success: false,
        error: `Quiz '${quizId}' not found`,
        timestamp: new Date().toISOString()
      });
    }

    res.json({
      success: true,
      data: quiz,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Error getting quiz:', error);
    res.status(500).json({
      success: false,
      error: error.message,
      timestamp: new Date().toISOString()
    });
  }
});

module.exports = router;