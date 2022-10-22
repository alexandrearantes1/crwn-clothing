import { initializeApp } from 'firebase/app';
import {
   getAuth,
   signInWithRedirect,
   signInWithPopup,
   GoogleAuthProvider,
   createUserWithEmailAndPassword,
   signInWithEmailAndPassword,
   signOut,
   onAuthStateChanged
} from 'firebase/auth';

import {
   getFirestore,
   doc,
   getDoc,
   setDoc
} from 'firebase/firestore';


const firebaseConfig = {
   apiKey: "AIzaSyA74uhk4Q5Aggc8-J-e6wrFdTei_lbmBhM",
   authDomain: "crwn-clothing-db-66f14.firebaseapp.com",
   projectId: "crwn-clothing-db-66f14",
   storageBucket: "crwn-clothing-db-66f14.appspot.com",
   messagingSenderId: "646170572778",
   appId: "1:646170572778:web:62b4a2cf37f4838c2da493"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
console.log(firebaseApp);

const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
   prompt: "select_account"
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, googleProvider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth, additionalInformation = {}) => {
   if (!userAuth) return;

   const userDocRef = doc(db, 'users', userAuth.uid);
   const userSnapshot = await getDoc(userDocRef);
   console.log(userSnapshot.exists());

   if (!userSnapshot.exists()) {
      const { displayName, email } = userAuth;
      const createdAt = new Date();

      try {
         await setDoc(userDocRef, {
            displayName,
            email,
            createdAt,
            ...additionalInformation
         });
      } catch (e) {
         console.log(`Error creating a new user: ${e.message}`);
      }
   }
   return userDocRef;
}

export const createAuthUserWithEmailAndPassword = async (email, password) => {
   if (!email || !password) return;

   return await createUserWithEmailAndPassword(auth, email, password);
}

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
   if (!email || !password) return;

   return await signInWithEmailAndPassword(auth, email, password);
}

export const signOutUser = async () => signOut(auth);

export const onAuthStateChangedListener = (callback) => onAuthStateChanged(auth, callback);
