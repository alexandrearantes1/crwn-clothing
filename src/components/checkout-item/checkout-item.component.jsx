import { useContext } from 'react';
import { CartContext } from '../../contexts/cart.context';

import './checkout-item.styles.scss';

const CheckoutItem = ({ cartItem }) => {

   const { removeItemFromCart, addItemToCart } = useContext(CartContext);

   const { name, imageUrl, price, quantity } = cartItem;

   const addHandler = () => addItemToCart(cartItem);
   const removeHandler = () => removeItemFromCart(cartItem);
   const removeAllHandler = () => removeItemFromCart(cartItem, true);

   return (
      <div className='checkout-item-container'>
         <div className='image-container'>
            <img src={imageUrl} alt={name} />
         </div>
         <span className='name'>{name}</span>
         <span className='quantity'>
            <span className='arrow' onClick={removeHandler}>&#10094;</span>
            <span className='value'>{quantity}</span>
            <span className='arrow' onClick={addHandler}>&#10095;</span>
         </span>
         <span className='price'>{price * quantity}</span>
         <div className='remove-button' onClick={removeAllHandler}>&#10005;</div>
      </div>
   )
}

export default CheckoutItem;