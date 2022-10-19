import { useState } from "react";

import {
   signInAuthUserWithEmailAndPassword,
   signInWithGooglePopup,
   createUserDocumentFromAuth
} from "../../utils/firebase/firebase.utils";

import FormInput from '../form-input/form-input.component';
import Button from '../../components/button/button.component';

import './sign-in-form.styles.scss';

const defaultFormFields = {
   email: '',
   password: ''
}

const SignInForm = () => {

   const [formFields, setFormFields] = useState(defaultFormFields);
   const { email, password } = formFields;

   const logGoogleUser = async () => {
      const { user } = await signInWithGooglePopup();
      const userDocRef = await createUserDocumentFromAuth(user);
      console.log(userDocRef);
   };

   const resetFormFields = () => {
      setFormFields(defaultFormFields);
   }
   const handleChange = (event) => {
      const { name, value } = event.target;
      setFormFields({ ...formFields, [name]: value });
      console.log(email, password);
   }
   const handleSubmit = async (event) => {
      event.preventDefault();
      // verify password / confirmPassword
      if (!password || !email) {
         alert('Email or password missing!');
         return;
      }
      try {
         const { user } = await signInAuthUserWithEmailAndPassword(email, password);
         console.log(user);
         resetFormFields();

      } catch (error) {
         switch (error.code) {
            case 'auth/wrong-password':
            case 'auth/user-not-found':
               alert('incorrect email or password');
               break;
            default:
               alert('An error occurred. Please try again later');
         }
      }
   }

   return (
      <div className='sign-in-container'>
         <h2>Already have an account?</h2>
         <span>Sign in with your email and password</span>
         <form onSubmit={handleSubmit}>

            <FormInput
               label='Email'
               type='email'
               required
               onChange={handleChange}
               name='email'
               value={email} />

            <FormInput
               label='Password'
               type='password'
               required
               onChange={handleChange}
               name='password'
               value={password} />
            <div className='buttons-container'>
               <Button type='submit'>Sign in</Button>
               <Button type='button' buttonType='google' onClick={logGoogleUser}>Sign in with Google</Button>
            </div>

         </form>
      </div>
   )
}

export default SignInForm;
