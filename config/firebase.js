import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import { getFirestore, setDoc, getDoc, updateDoc, doc} from 'firebase/firestore';
import 'firebase/compat/firestore';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAY96YFnaor3iGCg_sKiqv30ECacELRcZk",
    authDomain: "computercompanion-5f2c0.firebaseapp.com",
    projectId: "computercompanion-5f2c0",
    storageBucket: "computercompanion-5f2c0.appspot.com",
    messagingSenderId: "667253194888",
    appId: "1:667253194888:web:17791f8c310d6260a15f3d",
    measurementId: "G-3KSC0S29Q3"
};

let app;

if (firebase.apps.length === 0) {
    app = firebase.initializeApp(firebaseConfig)
} else {
    app = firebase.app();
}

const db = app.firestore();
const visionKey = 'AIzaSyDzjcsZn0Y7B3pvAdLFCtU7DNejuxuzKU0'
const auth = firebase.auth();
const firestore = getFirestore(app);

let userDocument;

const signIn = () => {
    auth
        .signInWithEmailAndPassword(txtEmail, txtPassword)
        .then(result => {
            if (result) {
                return 1;
            }
        })
        .catch(({ message }) => {
            alert(message);
            return 0;
        });

    return 0;
}

const signInAuthAdmin = async () => {
    let signInResult = false;
    await auth
        .signInWithEmailAndPassword("test1234@gmail.com", "test123")
        .then(async result => {
            if (result) {
                signInResult = true;
                await getUserDocument();
            }
        })
        .catch(({ message }) => {
            alert(message);;
        });
    return signInResult;
}

const getUserDocument = async () => {
    const docRef = doc(db, "Users", auth.currentUser.email);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        userDocument = docSnap.data();
    } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
    }
}

const updateTutorialStep = async (tutorial, step) => {
    const docRef = doc(db, "Users", auth.currentUser.email);

    if (tutorial == "cleanAComputer") {
        await updateDoc(docRef, {
            "tutorialLastStep.cleanAComputer": step
        }).then(() => {
            getUserDocument();
        });
    } else {
        await updateDoc(docRef, {
            "tutorialLastStep.buildAComputer": step
        }).then(() => {
            getUserDocument();
        });
    }
}

export { db, auth, firestore, visionKey, signInAuthAdmin, userDocument, updateTutorialStep};