import "firebase/auth";
import "firebase/firebase-firestore";
import "firebase/storage";
import "firebase/functions";

// import FirebaseContext, { withFirebase } from "./Context";
import app from "firebase/app";



// const config = {
//   apiKey: "AIzaSyBW1EzSSygHFKzAGw3YT6a1gT11S9OIgbc",
//   authDomain: "trakee-template.firebaseapp.com",
//   projectId: "trakee-template",
//   storageBucket: "trakee-template.appspot.com",
//   messagingSenderId: "647290800855",
//   appId: "1:647290800855:web:ba67988027862b8541fe92",
//   measurementId: "G-3NKZLLYFNV",
// };

// const config = {
//   apiKey: "AIzaSyBnhca8Btd0qEVkZ5TAn7c_7ttPbM0lVgQ",
//   authDomain: "iotmis-ab7aa.firebaseapp.com",
//   projectId: "iotmis-ab7aa",
//   storageBucket: "iotmis-ab7aa.appspot.com",
//   messagingSenderId: "867570131289",
//   appId: "1:867570131289:web:18e83256335615e8886c48",
// };

const config = {
  apiKey: "AIzaSyBEfeGVKP7xUme5BuBLdXHt0Olp84WUkkU",
  authDomain: "rasp-med.firebaseapp.com",
  projectId: "rasp-med",
  storageBucket: "rasp-med.appspot.com",
  messagingSenderId: "761511559820",
  appId: "1:761511559820:web:4b292b1938548b13c3b1a9",
  measurementId: "G-WGMKMEEGM1"
};

class Firebase {
  constructor() {
    app.initializeApp(config);
    this.auth = app.auth();
    this.db = app.firestore();
    this.storage = app.storage();
  }

  login(email, password) {
    return this.auth.signInWithEmailAndPassword(email, password);
  }
  
  logout = () => this.auth.signOut();


  async signUp(email, password) {
    await this.auth.createUserWithEmailAndPassword(email, password);
    return this.auth.signInWithEmailAndPassword(email, password);
  }

  // return this.auth.currentUser.updateProfile({
  //   displayName: email,
  // });
  isInitialized() {
    return new Promise((resolve) => {
      this.auth.onAuthStateChanged(resolve);
    });
  }
  getCurrentUserEmail() {
    return this.auth.currentUser && this.auth.currentUser.email;
  }

  getCurrentUsername() {
    return this.auth.currentUser && this.auth.currentUser.displayName;
  }

}

export default new Firebase();
