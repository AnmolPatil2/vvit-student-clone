import firebase from 'firebase'


const firebaseConfig = {
    apiKey: "AIzaSyCFWsv9YQhlZybshuMfSvu4CYgUjQsUL64",
    authDomain: "texadic-project.firebaseapp.com",
    databaseURL: "https://texadic-project.firebaseio.com",
    projectId: "texadic-project",
    storageBucket: "texadic-project.appspot.com",
    messagingSenderId: "89868809081",
    appId: "1:89868809081:web:52b45f2555ecc05a5bb5a8",
    measurementId: "G-ZX1VR5KM7T"
};
// Initialize Firebase
const fb = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore()

export { fb, db }