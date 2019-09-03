import React, { Fragment } from 'react';

const CartView: React.FC<{
    onClose?: () => void,
    cart: any
}> = ({onClose = () => {}, ...otherProps}) => {
    return (
        <Fragment {...otherProps}>
            <span>Some text</span>
        </Fragment>
    );
}

export default CartView;