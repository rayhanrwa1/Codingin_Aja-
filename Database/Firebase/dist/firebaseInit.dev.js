const { initializeApp } = require("firebase/app");
const { getStorage } = require("firebase/storage");
const { getAuth } = require("firebase/auth");
const { getDatabase } = require("firebase/database");

const firebaseConfig = {
  apiKey: "AIzaSyBUNzYg4_coa2MeGkaaOjOvs_IhmJ-jB0U",
  authDomain: "database-user-412ee.firebaseapp.com",
  databaseURL: "https://database-user-412ee-default-rtdb.firebaseio.com/",
  projectId: "database-user-412ee",
  storageBucket: "database-user-412ee.appspot.com",
  messagingSenderId: "221654233077",
  appId: "1:221654233077:web:31079f1b8bb2cd72423abc",
  measurementId: "G-H5SGZ779WZ",
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const auth = getAuth(app);
const database = getDatabase(app);

module.exports = { app, storage, auth, database };
