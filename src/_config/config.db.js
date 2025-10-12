// Config db
const firebaseConfig = {
  apiKey: "AIzaSyB5v0e77dvzHINhHzCKeMs6QPjqo7Z7img",
  authDomain: "login-database-black.firebaseapp.com",
  projectId: "login-database-black",
  storageBucket: "login-database-black.appspot.com",
  messagingSenderId: "768021690283",
  appId: "1:768021690283:web:221e866026541faffa04ee",
  databaseURL: "https://login-database-black-default-rtdb.firebaseio.com/"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export const auth = firebase.auth();
export const database = firebase.database();