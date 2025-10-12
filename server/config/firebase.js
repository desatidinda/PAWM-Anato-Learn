const admin = require('firebase-admin');
const serviceAccount = require('../serviceAccountKey.json');

// Initialize Firebase Admin
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: `https://anato-learn-default-rtdb.firebaseio.com`
  });
}

// Initialize Firestore
const db = admin.firestore();

module.exports = { admin, db };