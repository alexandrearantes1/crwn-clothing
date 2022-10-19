import { initializeApp } from 'firebase/app';
import {
   getAuth,
   signInWithRedirect,
   signInWithPopup,
   GoogleAuthProvider
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

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
   prompt: "select_account"
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
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
            createdAt
         });
      } catch (e) {
         console.log(`Error creating a new user: ${e.message}`);
      }
   }
   return userDocRef;
}