import React, { Fragment, useState } from 'react';
import Dialog from '@material-ui/core/Dialog';
import { useSpring, animated } from 'react-spring';
import { connect } from 'react-redux';
import { cartExists as cartExistsSelector } from 'ducks/cart/selector';

import CartBar from './cart.bar';
import CartView from './cart.view';

const cartData = {
    "subtotal": {
        "amount": 1043,
        "currency": "CZK",
        "precision": 2
    },
    "items": [
        {
            "orderItem": {
                "id": "0FJ9UlhH9Ltv1QFEItrhm2",
                "orderId": null,
                "menuItemId": "4BxssXIsiU0FHMWNxaMluF",
                "initiator": "uYSAZ0AzzQbpLXMN68HMKM3wLsx2",
                "status": "IN_CART",
                "meta": null,
                "owners": [
                    {
                        "id": "2d9A1ZIZHatD5lQcpQLKk4",
                        "orderItemId": "0FJ9UlhH9Ltv1QFEItrhm2",
                        "userId": "uYSAZ0AzzQbpLXMN68HMKM3wLsx2",
                        "transactionId": null,
                        "paid": 0,
                        "createdAt": "2019-09-03T12:46:52.000Z",
                        "updatedAt": "2019-09-03T12:46:52.000Z"
                    }
                ],
                "menuItem": {
                    "id": "4BxssXIsiU0FHMWNxaMluF",
                    "menuCategoryId": "0bEjabBUMiQ2BWos6bwnz",
                    "published": 1,
                    "calories": null,
                    "precedence": 0,
                    "display": null,
                    "promotion": null,
                    "cookingTime": null,
                    "translations": [
                        {
                            "name": "Pho Vietnam",
                            "description": "Broth simmered with beef bones in 12 hours, Vietnamese rice noodle pho, fresh herbs, onion",
                            "locale": "en"
                        }
                    ],
                    "price": {
                        "amount": 149,
                        "currency": "CZK"
                    }
                },
                "orderAddons": [],
                "orderChoices": [
                    {
                        "orderItemId": "0FJ9UlhH9Ltv1QFEItrhm2",
                        "choiceId": "4umLIs8zasiI1Zz1btiVTk",
                        "choice_id": "4umLIs8zasiI1Zz1btiVTk",
                        "choice": {
                            "id": "4umLIs8zasiI1Zz1btiVTk",
                            "optionId": "4ZnIVzLjeYGTjU9VAdVdIY",
                            "price": {
                                "amount": 0,
                                "currency": "CZK"
                            },
                            "translations": [
                                {
                                    "locale": "en",
                                    "name": "Chicken"
                                }
                            ]
                        }
                    }
                ],
                "orderExcludes": []
            },
            "subtotal": {
                "amount": 149,
                "currency": "CZK",
                "precision": 2
            }
        },
        {
            "orderItem": {
                "id": "1cOSuKmPBD2umrZ9MsF4BX",
                "orderId": null,
                "menuItemId": "4BxssXIsiU0FHMWNxaMluF",
                "initiator": "uYSAZ0AzzQbpLXMN68HMKM3wLsx2",
                "status": "IN_CART",
                "meta": null,
                "owners": [
                    {
                        "id": "0aMi6IHqNVu50pUDORmHQZ",
                        "orderItemId": "1cOSuKmPBD2umrZ9MsF4BX",
                        "userId": "uYSAZ0AzzQbpLXMN68HMKM3wLsx2",
                        "transactionId": null,
                        "paid": 0,
                        "createdAt": "2019-09-03T13:08:42.000Z",
                        "updatedAt": "2019-09-03T13:08:42.000Z"
                    }
                ],
                "menuItem": {
                    "id": "4BxssXIsiU0FHMWNxaMluF",
                    "menuCategoryId": "0bEjabBUMiQ2BWos6bwnz",
                    "published": 1,
                    "calories": null,
                    "precedence": 0,
                    "display": null,
                    "promotion": null,
                    "cookingTime": null,
                    "translations": [
                        {
                            "name": "Pho Vietnam",
                            "description": "Broth simmered with beef bones in 12 hours, Vietnamese rice noodle pho, fresh herbs, onion",
                            "locale": "en"
                        }
                    ],
                    "price": {
                        "amount": 149,
                        "currency": "CZK"
                    }
                },
                "orderAddons": [],
                "orderChoices": [
                    {
                        "orderItemId": "1cOSuKmPBD2umrZ9MsF4BX",
                        "choiceId": "4umLIs8zasiI1Zz1btiVTk",
                        "choice_id": "4umLIs8zasiI1Zz1btiVTk",
                        "choice": {
                            "id": "4umLIs8zasiI1Zz1btiVTk",
                            "optionId": "4ZnIVzLjeYGTjU9VAdVdIY",
                            "price": {
                                "amount": 0,
                                "currency": "CZK"
                            },
                            "translations": [
                                {
                                    "locale": "en",
                                    "name": "Chicken"
                                }
                            ]
                        }
                    }
                ],
                "orderExcludes": []
            },
            "subtotal": {
                "amount": 149,
                "currency": "CZK",
                "precision": 2
            }
        },
        {
            "orderItem": {
                "id": "2nzSQjlGJNdIz0tESL1klK",
                "orderId": null,
                "menuItemId": "4BxssXIsiU0FHMWNxaMluF",
                "initiator": "uYSAZ0AzzQbpLXMN68HMKM3wLsx2",
                "status": "IN_CART",
                "meta": null,
                "owners": [],
                "menuItem": {
                    "id": "4BxssXIsiU0FHMWNxaMluF",
                    "menuCategoryId": "0bEjabBUMiQ2BWos6bwnz",
                    "published": 1,
                    "calories": null,
                    "precedence": 0,
                    "display": null,
                    "promotion": null,
                    "cookingTime": null,
                    "translations": [
                        {
                            "name": "Pho Vietnam",
                            "description": "Broth simmered with beef bones in 12 hours, Vietnamese rice noodle pho, fresh herbs, onion",
                            "locale": "en"
                        }
                    ],
                    "price": {
                        "amount": 149,
                        "currency": "CZK"
                    }
                },
                "orderAddons": [],
                "orderChoices": [
                    {
                        "orderItemId": "2nzSQjlGJNdIz0tESL1klK",
                        "choiceId": "4umLIs8zasiI1Zz1btiVTk",
                        "choice_id": "4umLIs8zasiI1Zz1btiVTk",
                        "choice": {
                            "id": "4umLIs8zasiI1Zz1btiVTk",
                            "optionId": "4ZnIVzLjeYGTjU9VAdVdIY",
                            "price": {
                                "amount": 0,
                                "currency": "CZK"
                            },
                            "translations": [
                                {
                                    "locale": "en",
                                    "name": "Chicken"
                                }
                            ]
                        }
                    }
                ],
                "orderExcludes": []
            },
            "subtotal": {
                "amount": 149,
                "currency": "CZK",
                "precision": 2
            }
        },
        {
            "orderItem": {
                "id": "3jVfDq8IHiFgR63ezwHa9R",
                "orderId": null,
                "menuItemId": "4BxssXIsiU0FHMWNxaMluF",
                "initiator": "uYSAZ0AzzQbpLXMN68HMKM3wLsx2",
                "status": "IN_CART",
                "meta": null,
                "owners": [
                    {
                        "id": "3L6bTVzLfp773LwnmUdAul",
                        "orderItemId": "3jVfDq8IHiFgR63ezwHa9R",
                        "userId": "uYSAZ0AzzQbpLXMN68HMKM3wLsx2",
                        "transactionId": null,
                        "paid": 0,
                        "createdAt": "2019-09-03T13:09:25.000Z",
                        "updatedAt": "2019-09-03T13:09:25.000Z"
                    }
                ],
                "menuItem": {
                    "id": "4BxssXIsiU0FHMWNxaMluF",
                    "menuCategoryId": "0bEjabBUMiQ2BWos6bwnz",
                    "published": 1,
                    "calories": null,
                    "precedence": 0,
                    "display": null,
                    "promotion": null,
                    "cookingTime": null,
                    "translations": [
                        {
                            "name": "Pho Vietnam",
                            "description": "Broth simmered with beef bones in 12 hours, Vietnamese rice noodle pho, fresh herbs, onion",
                            "locale": "en"
                        }
                    ],
                    "price": {
                        "amount": 149,
                        "currency": "CZK"
                    }
                },
                "orderAddons": [],
                "orderChoices": [
                    {
                        "orderItemId": "3jVfDq8IHiFgR63ezwHa9R",
                        "choiceId": "4umLIs8zasiI1Zz1btiVTk",
                        "choice_id": "4umLIs8zasiI1Zz1btiVTk",
                        "choice": {
                            "id": "4umLIs8zasiI1Zz1btiVTk",
                            "optionId": "4ZnIVzLjeYGTjU9VAdVdIY",
                            "price": {
                                "amount": 0,
                                "currency": "CZK"
                            },
                            "translations": [
                                {
                                    "locale": "en",
                                    "name": "Chicken"
                                }
                            ]
                        }
                    }
                ],
                "orderExcludes": []
            },
            "subtotal": {
                "amount": 149,
                "currency": "CZK",
                "precision": 2
            }
        },
        {
            "orderItem": {
                "id": "4n5G7r1LpofhndpT5JArea",
                "orderId": null,
                "menuItemId": "4BxssXIsiU0FHMWNxaMluF",
                "initiator": "uYSAZ0AzzQbpLXMN68HMKM3wLsx2",
                "status": "IN_CART",
                "meta": null,
                "owners": [
                    {
                        "id": "0MzOsAT6WgJAhDANPHmOQN",
                        "orderItemId": "4n5G7r1LpofhndpT5JArea",
                        "userId": "uYSAZ0AzzQbpLXMN68HMKM3wLsx2",
                        "transactionId": null,
                        "paid": 0,
                        "createdAt": "2019-09-03T11:33:17.000Z",
                        "updatedAt": "2019-09-03T11:33:17.000Z"
                    }
                ],
                "menuItem": {
                    "id": "4BxssXIsiU0FHMWNxaMluF",
                    "menuCategoryId": "0bEjabBUMiQ2BWos6bwnz",
                    "published": 1,
                    "calories": null,
                    "precedence": 0,
                    "display": null,
                    "promotion": null,
                    "cookingTime": null,
                    "translations": [
                        {
                            "name": "Pho Vietnam",
                            "description": "Broth simmered with beef bones in 12 hours, Vietnamese rice noodle pho, fresh herbs, onion",
                            "locale": "en"
                        }
                    ],
                    "price": {
                        "amount": 149,
                        "currency": "CZK"
                    }
                },
                "orderAddons": [],
                "orderChoices": [
                    {
                        "orderItemId": "4n5G7r1LpofhndpT5JArea",
                        "choiceId": "4umLIs8zasiI1Zz1btiVTk",
                        "choice_id": "4umLIs8zasiI1Zz1btiVTk",
                        "choice": {
                            "id": "4umLIs8zasiI1Zz1btiVTk",
                            "optionId": "4ZnIVzLjeYGTjU9VAdVdIY",
                            "price": {
                                "amount": 0,
                                "currency": "CZK"
                            },
                            "translations": [
                                {
                                    "locale": "en",
                                    "name": "Chicken"
                                }
                            ]
                        }
                    }
                ],
                "orderExcludes": []
            },
            "subtotal": {
                "amount": 149,
                "currency": "CZK",
                "precision": 2
            }
        },
        {
            "orderItem": {
                "id": "6Pc58sflnIYcA32PW59lMy",
                "orderId": null,
                "menuItemId": "4BxssXIsiU0FHMWNxaMluF",
                "initiator": "uYSAZ0AzzQbpLXMN68HMKM3wLsx2",
                "status": "IN_CART",
                "meta": null,
                "owners": [
                    {
                        "id": "7eMMxOvjKjPUH4Ttq7VJTa",
                        "orderItemId": "6Pc58sflnIYcA32PW59lMy",
                        "userId": "uYSAZ0AzzQbpLXMN68HMKM3wLsx2",
                        "transactionId": null,
                        "paid": 0,
                        "createdAt": "2019-09-03T13:08:04.000Z",
                        "updatedAt": "2019-09-03T13:08:04.000Z"
                    }
                ],
                "menuItem": {
                    "id": "4BxssXIsiU0FHMWNxaMluF",
                    "menuCategoryId": "0bEjabBUMiQ2BWos6bwnz",
                    "published": 1,
                    "calories": null,
                    "precedence": 0,
                    "display": null,
                    "promotion": null,
                    "cookingTime": null,
                    "translations": [
                        {
                            "name": "Pho Vietnam",
                            "description": "Broth simmered with beef bones in 12 hours, Vietnamese rice noodle pho, fresh herbs, onion",
                            "locale": "en"
                        }
                    ],
                    "price": {
                        "amount": 149,
                        "currency": "CZK"
                    }
                },
                "orderAddons": [],
                "orderChoices": [
                    {
                        "orderItemId": "6Pc58sflnIYcA32PW59lMy",
                        "choiceId": "4umLIs8zasiI1Zz1btiVTk",
                        "choice_id": "4umLIs8zasiI1Zz1btiVTk",
                        "choice": {
                            "id": "4umLIs8zasiI1Zz1btiVTk",
                            "optionId": "4ZnIVzLjeYGTjU9VAdVdIY",
                            "price": {
                                "amount": 0,
                                "currency": "CZK"
                            },
                            "translations": [
                                {
                                    "locale": "en",
                                    "name": "Chicken"
                                }
                            ]
                        }
                    }
                ],
                "orderExcludes": []
            },
            "subtotal": {
                "amount": 149,
                "currency": "CZK",
                "precision": 2
            }
        },
        {
            "orderItem": {
                "id": "77qA6DNdKksHhTMN82EZt7",
                "orderId": null,
                "menuItemId": "4BxssXIsiU0FHMWNxaMluF",
                "initiator": "uYSAZ0AzzQbpLXMN68HMKM3wLsx2",
                "status": "IN_CART",
                "meta": null,
                "owners": [],
                "menuItem": {
                    "id": "4BxssXIsiU0FHMWNxaMluF",
                    "menuCategoryId": "0bEjabBUMiQ2BWos6bwnz",
                    "published": 1,
                    "calories": null,
                    "precedence": 0,
                    "display": null,
                    "promotion": null,
                    "cookingTime": null,
                    "translations": [
                        {
                            "name": "Pho Vietnam",
                            "description": "Broth simmered with beef bones in 12 hours, Vietnamese rice noodle pho, fresh herbs, onion",
                            "locale": "en"
                        }
                    ],
                    "price": {
                        "amount": 149,
                        "currency": "CZK"
                    }
                },
                "orderAddons": [],
                "orderChoices": [
                    {
                        "orderItemId": "77qA6DNdKksHhTMN82EZt7",
                        "choiceId": "4umLIs8zasiI1Zz1btiVTk",
                        "choice_id": "4umLIs8zasiI1Zz1btiVTk",
                        "choice": {
                            "id": "4umLIs8zasiI1Zz1btiVTk",
                            "optionId": "4ZnIVzLjeYGTjU9VAdVdIY",
                            "price": {
                                "amount": 0,
                                "currency": "CZK"
                            },
                            "translations": [
                                {
                                    "locale": "en",
                                    "name": "Chicken"
                                }
                            ]
                        }
                    }
                ],
                "orderExcludes": []
            },
            "subtotal": {
                "amount": 149,
                "currency": "CZK",
                "precision": 2
            }
        }
    ]
};

const CartModal: React.FC<{
    cart: any
}> = ({cart, ...otherProps}) => {
    if (!cart) return null;

    // TODO: move to global state with redux along with other modals
    const [open, setOpen] = useState(false);
    const props = useSpring({ 
        transform: false ? `translate3d(0, 56px, 0)` : `translate3d(0, 0, 0)`
    });
    const AnimatedCartBar = animated(CartBar);
    return (
        <div {...otherProps}>
            <AnimatedCartBar
                onClick={() => { setOpen(true); }} 
                cart={cartData}
                style={{
                    bottom: 56,
                    ...props
                }}/>
            <Dialog fullScreen open={open} onClose={() => { setOpen(false); }}>
                <CartView cart={cartData}/>
            </Dialog>
        </div>
    );
}

export default connect(
    (state: any) => ({
        cart: state.cart.cart,
    }),
    { }
)(CartModal);

// export default CartModal;