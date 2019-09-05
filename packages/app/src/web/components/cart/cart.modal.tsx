import React, { useState } from 'react';
import Dialog from '@material-ui/core/Dialog';
import { useSpring, animated } from 'react-spring';
import { connect } from 'react-redux';

import CartBar from './cart.bar';
import CartView from './cart.view';
import { getCartItemsList } from '../../../ducks/cart/selectors';
import { RootState } from 'typesafe-actions';

import { Cart, CartItem } from 'CartModels';

const CartModal: React.FC<{
    cartItemsList: [CartItem]
}> = ({ cartItemsList, ...otherProps }) => {
    if (!cartItemsList) return null;

    // TODO: move to global state with redux along with other modals
    const [open, setOpen] = useState(false);
    const cartVisible = cartItemsList.length > 0;
    const props = useSpring({
        transform: cartVisible ? `translate3d(0, 0px, 0)` : `translate3d(0, 56px, 0)`
    });
    const AnimatedCartBar = animated(CartBar);
    return (
        <div {...otherProps}>
            <AnimatedCartBar
                onClick={() => { setOpen(true); }} 
                cart={cartItemsList}
                style={{
                    bottom: 56,
                    ...props
                }}/>
            <Dialog fullScreen open={open} onClose={() => { setOpen(false); }}>
                <CartView onClose={() => { setOpen(false); }} cart={cartItemsList}/>
            </Dialog>
        </div>
    );
}

export default connect(
    (state: RootState) => ({
        cartItemsList: getCartItemsList(state.cart),
    }),
    { }
)(CartModal);

// export default CartModal;