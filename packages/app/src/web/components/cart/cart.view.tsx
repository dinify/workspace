import React from 'react';
import { useTranslation } from 'react-i18next';

import CartPage from '../../pages/Cart';
import { AppBar, AppBarAction, AppBarTitle } from '../../components/app-bar';

import { Cart } from 'CartModels';

const CartView: React.FC<{
    onClose?: () => void,
    cart: Cart
}> = ({cart, onClose = () => {}, ...otherProps}) => {
    const { t } = useTranslation();
    const cartItemCount = (cart && cart.items) ? cart.items.length : 0;
    return (
        <div {...otherProps}>
            <AppBar>
                <AppBarAction type="close" onClick={onClose}/>
                <AppBarTitle 
                    title={t('cart.title')} 
                    subtitle={t('cart.itemCount', { count: cartItemCount, context: cartItemCount === 0 ? 'none' : undefined })}/>
            </AppBar>
            <CartPage />
        </div>
    );
}

export default CartView;