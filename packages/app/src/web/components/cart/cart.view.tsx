import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

import CartPage from '../../pages/Cart';
import { AppBar, AppBarAction, AppBarTitle } from '../../components/app-bar';
import CartItem from './cart.item';
import { Cart, Price } from 'CartModels';

const CartView: React.FC<{
    onClose?: () => void,
    cart: Cart
}> = ({cart, onClose = () => {}, ...otherProps}) => {
    const [editMode, setEditMode] = useState(false);
    const { t } = useTranslation();

    const cartItemCount = (cart && cart.items) ? cart.items.length : 0;
    console.log(cart);
    
    return (
        <div {...otherProps}>
            <AppBar>
                {!editMode && <AppBarAction type="close" onClick={onClose}/>}
                <AppBarTitle 
                    title={t('cart.title')} 
                    subtitle={t('cart.itemCount', { count: cartItemCount, context: cartItemCount === 0 ? 'none' : undefined })}/>
                <AppBarAction type={editMode ? 'done' : 'edit'} onClick={() => {setEditMode(!editMode)}}/>
            </AppBar>
            {cart.items.map(item => {
                return (
                    <CartItem editMode={editMode} cartItem={item}/>
                );
            })}
            <CartPage />
        </div>
    );
}

export default CartView;