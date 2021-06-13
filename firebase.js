import firebase from 'firebase'
const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyBE6ZrxqpmTWvMkc9IA4pB-X4q1fbc3c-8",
    authDomain: "awesomeproject-5564f.firebaseapp.com",
    projectId: "awesomeproject-5564f",
    storageBucket: "awesomeproject-5564f.appspot.com",
    messagingSenderId: "661092837736",
    appId: "1:661092837736:web:b297cba4faa32027868edd"

})
const db = firebaseApp.firestore();
//const auth = firebase.auth();
const storage = firebase.storage();

export { db, storage };