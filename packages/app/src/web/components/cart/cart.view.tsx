import React from 'react';
import Cart from '../../pages/Cart';

import IconButton from '@material-ui/core/IconButton';
import Close from '@material-ui/icons/CloseRounded';

const CartView: React.FC<{
    onClose?: () => void,
    cart: any
}> = ({cart, onClose = () => {}, ...otherProps}) => {
    return (
        <div {...otherProps}>
            <IconButton onClick={onClose}>
                <Close />
            </IconButton>
            <Cart />
        </div>
    );
}

export default CartView;