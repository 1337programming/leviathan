var FireBase = module.exports = {};

const firebase = require("firebase");
const logger = require('../../util');

logger.log('Initializing firebase');
// Initialize the app with a service account, granting admin privileges
firebase.initializeApp({
  databaseURL: "https://arduinonfc-e0df7.firebaseio.com",
  serviceAccount: "./src/firebase/init/service-account-credentials.json"
});

FireBase.db = firebase.database();
