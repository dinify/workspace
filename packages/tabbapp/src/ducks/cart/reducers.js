// @flow
import R from 'ramda';
import types from './types';

const initialState = {
        "33e5a1c1-9daf-4b46-b996-7f62ca42ecbf": [
            {
                "id": "8a838134-98d6-42ed-a7c3-46caac3d72b8",
                "initiator": "5af8948d2537521a358c01fc",
                "status": "IN_CART",
                "meta": null,
                "subtotal": {
                    "amount": "123.780",
                    "currency": "KWD"
                },
                "locked": false,
                "paid": false,
                "menu_item": {
                    "id": "b003d21c-1ad8-4b2b-a1a1-78b1c33054e0",
                    "menu_category_id": "34133e4d-bfee-479f-ac4e-054a95286c45",
                    "published": true,
                    "calories": {
                        "fats": 4469,
                        "carbs": 2015,
                        "total": 6230,
                        "proteins": 9041
                    },
                    "precedence": 0,
                    "display": null,
                    "promotion": null,
                    "cooking_time": null,
                    "favorite": false,
                    "favorite_count": 0,
                    "price": {
                        "amount": "104.80",
                        "currency": "KWD"
                    },
                    "name": "Error fugiat",
                    "description": "Rerum numquam laudantium totam deserunt sit. Sit fugit molestiae aut. Amet ipsum voluptatem ut tempora vel. Fugit necessitatibus eos nesciunt consequuntur deserunt facilis sed.",
                    "images": {
                        "0064abfb-56af-437f-9bce-ed41f0a06360": {
                            "id": "0064abfb-56af-437f-9bce-ed41f0a06360",
                            "url": "https://images.unsplash.com/uploads/141143339879512fe9b0d/f72e2c85?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1600&h=900&fit=crop&ixid=eyJhcHBfaWQiOjF9&s=2efca427d513f0972c9ca80aff6ff3fc",
                            "precedence": 0,
                            "published": true
                        },
                        "df9c0c9a-6612-4196-8271-d63564074f37": {
                            "id": "df9c0c9a-6612-4196-8271-d63564074f37",
                            "url": "https://images.unsplash.com/photo-1476718406336-bb5a9690ee2a?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1600&h=900&fit=crop&ixid=eyJhcHBfaWQiOjF9&s=df1806c6bacfa9203bc4eb95342d1458",
                            "precedence": 0,
                            "published": true
                        }
                    }
                },
                "addons": {
                    "460d8a7e-a91d-4c6c-b9b9-0abd8201a2c3": {
                        "id": "460d8a7e-a91d-4c6c-b9b9-0abd8201a2c3",
                        "maximum": 19,
                        "name": "Beatae nam",
                        "price": {
                            "amount": "8.00",
                            "currency": "KWD"
                        }
                    }
                },
                "excludes": {
                    "1b7d4ed7-5527-467c-806c-41c566ffdf7b": {
                        "id": "1b7d4ed7-5527-467c-806c-41c566ffdf7b",
                        "excludable": true,
                        "name": "Quaerat eveniet"
                    }
                },
                "choices": {
                    "81b16dee-f29d-4206-a898-6c8322de3856": {
                        "id": "81b16dee-f29d-4206-a898-6c8322de3856",
                        "name": "Dolor id illum",
                        "difference": {
                            "amount": "2.98",
                            "currency": "KWD"
                        }
                    }
                }
            },
            {
                "id": "4e3fa134-7709-488e-b3b2-3de091de90af",
                "initiator": "5af8948d2537521a358c01fc",
                "status": "IN_CART",
                "meta": null,
                "subtotal": {
                    "amount": "200.650",
                    "currency": "KWD"
                },
                "locked": false,
                "paid": false,
                "menu_item": {
                    "id": "8b1c0dfe-ca3c-4209-b0e8-d152f7061d1c",
                    "menu_category_id": "34133e4d-bfee-479f-ac4e-054a95286c45",
                    "published": false,
                    "calories": {
                        "fats": 6074,
                        "carbs": 4535,
                        "total": 6406,
                        "proteins": 9714
                    },
                    "precedence": 0,
                    "display": null,
                    "promotion": null,
                    "cooking_time": null,
                    "favorite": false,
                    "favorite_count": 0,
                    "price": {
                        "amount": "128.40",
                        "currency": "KWD"
                    },
                    "name": "Quia culpa",
                    "description": "Molestiae placeat iusto ipsa. Nihil asperiores qui voluptas dolores officia praesentium cumque. Tenetur ut minus non velit consequatur. Maiores quo fugit illum non commodi iusto vel.",
                    "images": {
                        "e24a3cdc-9fad-4263-8141-67cc6e75622b": {
                            "id": "e24a3cdc-9fad-4263-8141-67cc6e75622b",
                            "url": "https://images.unsplash.com/photo-1489532060612-9910b757430f?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1600&h=900&fit=crop&ixid=eyJhcHBfaWQiOjF9&s=db4d3a6da0622f7f596bb3c3c3eec07d",
                            "precedence": 0,
                            "published": true
                        }
                    }
                },
                "addons": {
                    "b5da874b-fba2-44f4-a03d-a07dba5249b5": {
                        "id": "b5da874b-fba2-44f4-a03d-a07dba5249b5",
                        "maximum": 27,
                        "name": "Tempore",
                        "price": {
                            "amount": "8.80",
                            "currency": "KWD"
                        }
                    }
                },
                "excludes": {
                    "68d72586-fba0-4aad-8a15-fe6264320d0f": {
                        "id": "68d72586-fba0-4aad-8a15-fe6264320d0f",
                        "excludable": true,
                        "name": "Aspernatur ut"
                    }
                },
                "choices": {
                    "860042e8-59b8-488c-9b90-98eb34be8099": {
                        "id": "860042e8-59b8-488c-9b90-98eb34be8099",
                        "name": "Ab repellendus",
                        "difference": {
                            "amount": "34.50",
                            "currency": "KWD"
                        }
                    },
                    "62115d09-4a4f-40eb-a8a9-ee7edb1bd7ac": {
                        "id": "62115d09-4a4f-40eb-a8a9-ee7edb1bd7ac",
                        "name": "Suscipit est",
                        "difference": {
                            "amount": "20.15",
                            "currency": "KWD"
                        }
                    }
                }
            }
        ]
    };

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case types.ADD_ITEM: {
      const { dishId } = action.payload;
      return R.assoc('items', [...state.items, dishId])(state);
    }

    default:
      return state;
  }
}
