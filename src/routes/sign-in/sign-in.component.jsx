// import { getRedirectResult } from 'firebase/auth';

import SignUpForm from '../../components/sign-up-form/sign-up-form.component';
import Button from '../../components/button/button.component';
import {
   signInWithGooglePopup,
   createUserDocumentFromAuth
} from '../../utils/firebase/firebase.utils'



const SignIn = () => {
   const logGoogleUser = async () => {
      const { user } = await signInWithGooglePopup();
      const userDocRef = await createUserDocumentFromAuth(user);
      console.log(userDocRef);
   };
   return (
      <div>
         <h1>Sign in to your account</h1>
         <Button buttonType='google' onClick={logGoogleUser}>Sign in with Google Popup</Button>
         <SignUpForm />
      </div>
   )
}
export default SignIn;