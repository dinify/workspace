import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

import CartPage from '../../pages/Cart';
import { AppBar, AppBarAction, AppBarTitle } from '../../components/app-bar';
import CartItem from './cart.item';
import { OrderItem } from 'CartModels';

const CartView: React.FC<{
    onClose?: () => void,
    orderItemsList: OrderItem[]
}> = ({ orderItemsList, onClose = () => {}, ...otherProps}) => {

    const [editMode, setEditMode] = useState(false);
    const { t } = useTranslation();

    const cartItemCount = orderItemsList.length;
    
    return (
        <div {...otherProps}>
            <AppBar>
                {!editMode && <AppBarAction type="close" onClick={onClose}/>}
                <AppBarTitle 
                    title={t('cart.title')} 
                    subtitle={t('cart.itemCount', { count: cartItemCount, context: cartItemCount === 0 ? 'none' : undefined })}/>
                <AppBarAction type={editMode ? 'done' : 'edit'} onClick={() => {setEditMode(!editMode)}}/>
            </AppBar>
            {orderItemsList.map(item =>
                <CartItem key={item.id} editMode={editMode} orderItem={item}/>
            )}
            <CartPage />
        </div>
    );
}

export default CartView;