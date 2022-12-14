import { Fragment, useContext } from 'react';
import { Outlet, Link } from 'react-router-dom';
import { ReactComponent as CrwnLogo } from '../../assets/crown.svg';

import { UserContext } from '../../contexts/user.context';
import { CartContext } from '../../contexts/cart.context';

import CartIcon from '../../components/cart-icon/cart-icon.component';
import CartDropdown from '../../components/cart-dropdown/cart-dropdown.component';

import { signOutUser } from '../../utils/firebase/firebase.utils';

import './navigation.styles.scss';

const Navigation = () => {
   const { currentUser } = useContext(UserContext);
   const { isCartOpen } = useContext(CartContext);

   return (
      <Fragment>
         <div className='navigation'>
            <Link className='logo-container' to='/'>
               <CrwnLogo className='logo' />
            </Link>
            <div className='nav-links-container'> {currentUser ? (<span>Welcome, {currentUser.displayName}</span>) : ''}
               <Link className='nav-link' to='/shop'>
                  Shop
               </Link>
               {
                  currentUser ? (
                     <span className='nav-link' onClick={signOutUser}>SIGN OUT</span>
                  )
                     : (
                        <Link className='nav-link' to='/auth'>
                           Sign In
                        </Link>
                     )
               }
               <CartIcon />
            </div>
            {isCartOpen && <CartDropdown />}
         </div>
         <Outlet />
      </Fragment>
   )
}

export default Navigation;