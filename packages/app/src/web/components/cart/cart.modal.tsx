import React, { useState } from 'react';
import Dialog from '@material-ui/core/Dialog';
import { useSpring, animated } from 'react-spring';
import { connect } from 'react-redux';
import { RootState } from 'typesafe-actions';


import CartBar from './cart.bar';
import CartView from './cart.view';
import { getOrderItemsList } from '../../../ducks/cart/selectors';
import { OrderItemN } from 'CartModels';

const CartModal: React.FC<{
    orderItemsList: OrderItemN[]
}> = ({ orderItemsList, ...otherProps }) => {

    // TODO: move to global state with redux along with other modals
    const [open, setOpen] = useState(false);
    const cartVisible = orderItemsList.length > 0;
    const props = useSpring({
        transform: cartVisible ? `translate3d(0, 0px, 0)` : `translate3d(0, 56px, 0)`
    });
    const AnimatedCartBar = animated(CartBar);
    return (
        <div>
            <AnimatedCartBar
                onClick={() => { setOpen(true); }}
                style={{
                    bottom: 56,
                    ...props
                }}/>
            <Dialog fullScreen open={open} onClose={() => { setOpen(false); }}>
                <CartView orderItemsList={orderItemsList} onClose={() => { setOpen(false); }} />
            </Dialog>
        </div>
    );
}

export default connect(
    (state: RootState) => ({
        orderItemsList: getOrderItemsList(state.cart),
    })
)(CartModal);

// export default CartModal;