import React, { useState } from 'react';
import Dialog from '@material-ui/core/Dialog';
import { useSpring, animated } from 'react-spring';
import { connect } from 'react-redux';

import CartBar from './cart.bar';
import CartView from './cart.view';
import { getCart } from '../../../ducks/cart/selectors';
import { RootState } from 'typesafe-actions';

const CartModal: React.FC<{
    cart: any
}> = ({cart, ...otherProps}) => {
    if (!cart) return null;

    // TODO: move to global state with redux along with other modals
    const [open, setOpen] = useState(false);
    const cartVisible = cart.count !== undefined && cart.count > 0;
    const props = useSpring({
        transform: cartVisible ? `translate3d(0, 0px, 0)` : `translate3d(0, 56px, 0)`
    });
    const AnimatedCartBar = animated(CartBar);
    return (
        <div {...otherProps}>
            <AnimatedCartBar
                onClick={() => { setOpen(true); }} 
                cart={cart}
                style={{
                    bottom: 56,
                    ...props
                }}/>
            <Dialog fullScreen open={open} onClose={() => { setOpen(false); }}>
                <CartView onClose={() => { setOpen(false); }} cart={cart}/>
            </Dialog>
        </div>
    );
}

export default connect(
    (state: RootState) => ({
        cart: getCart(state.cart),
    }),
    { }
)(CartModal);

// export default CartModal;