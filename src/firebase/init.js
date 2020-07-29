const firebaseConfig = {
  apiKey: "AIzaSyB6MmX9-y2Qrw3Y7x_ADWAgOkbBNHTA1ac",
  authDomain: "newsarchive.firebaseapp.com",
  databaseURL: "https://newsarchive.firebaseio.com",
  projectId: "newsarchive",
  storageBucket: "newsarchive.appspot.com",
  messagingSenderId: "595990768689",
  appId: "1:595990768689:web:150fa4c437006d8969b910",
  measurementId: "G-KXDVTXCSN4"
};

const admin = require('firebase-admin')
admin.initializeApp(firebaseConfig);

module.exports.db = admin.firestore();
module.exports.bucket = admin.storage().bucket();