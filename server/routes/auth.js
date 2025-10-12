const express = require('express');
const { auth, db } = require('../config/firebase');
const router = express.Router();

const verifyToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    
    if (!token) {
      return res.status(401).json({ error: 'No token provided' });
    }
    
    const decodedToken = await auth.verifyIdToken(token);
    req.user = decodedToken;
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Invalid token' });
  }
};

router.post('/create-profile', verifyToken, async (req, res) => {
  try {
    const { uid, email, displayName } = req.user;
    
    const userDoc = {
      uid,
      email,
      displayName: displayName || '',
      createdAt: new Date(),
      lastLogin: new Date()
    };
    
    await db.collection('users').doc(uid).set(userDoc, { merge: true });
    
    res.json({ 
      success: true, 
      message: 'User profile created/updated',
      user: userDoc 
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/profile', verifyToken, async (req, res) => {
  try {
    const { uid } = req.user;
    const userDoc = await db.collection('users').doc(uid).get();
    
    if (!userDoc.exists) {
      return res.status(404).json({ error: 'User profile not found' });
    }
    
    res.json({ 
      success: true, 
      user: userDoc.data() 
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;