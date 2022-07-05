import { initializeApp } from 'firebase/app';
import { getAuth,GoogleAuthProvider,signInWithPopup, 
    createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, doc, setDoc, getDoc } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCdHcwkiKt5gl53iAJHk0t76KV_e1JvDl4",
  authDomain: "crwn-clothing-db-d4824.firebaseapp.com",
  projectId: "crwn-clothing-db-d4824",
  storageBucket: "crwn-clothing-db-d4824.appspot.com",
  messagingSenderId: "920947843151",
  appId: "1:920947843151:web:578afee395f6de759e8a3a",
  measurementId: "G-MBT9249VJV"
};


// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
    prompt: 'select_account'
})

const auth = getAuth();

export const signInWithGooglePopUp = () => signInWithPopup(auth, provider);

const db = getFirestore();

export const createUserDocFireStore = async ( userAuth, additionalInfo={} ) => {
    if(!userAuth) return;

    const userDocRef = doc(db, 'users', userAuth.uid);
    console.log(userDocRef);

    const userSnapShot = await getDoc(userDocRef);
    if(!userSnapShot.exists()){
        const email= userAuth.email;
        const displayName = userAuth.displayName;
        const createdAt = new Date();

        try{
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt,
                ...additionalInfo
            })
        }catch(err){
            console.log("error", err.message);
        }
    }
    return userDocRef;
}


export const createFirebaseUserWithEmailAndPassword = async (email, password) => {
    if(!email || !password) return;

    return await createUserWithEmailAndPassword(auth, email, password);
}

export const signInFirebaseWithEmailAndPassword = async (email, password) => {
    if(!email || !password) return;

    return await signInWithEmailAndPassword(auth, email, password);
}