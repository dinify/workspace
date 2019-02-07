export default [{
  subtotal: {
    amount: "16.300",
    currency: "KWD"
  },
  menu_item: {
    favorite: false,
    favorite_count: 0,
    price: {
      amount: "87.90",
      currency: "KWD"
    },
    name: "Cabbage kimchi",
    description: "Quia reprehenderit fugiat aliquam. Architecto tenetur ut et laborum harum maiores. Veritatis explicabo necessitatibus iusto sed error commodi at. Aut numquam consequatur odit praesentium.",
    images: {
      "26fe5030-4638-40d4-a2de-c69a27e58406": {
        id: "26fe5030-4638-40d4-a2de-c69a27e58406",
        url: "https://images.unsplash.com/photo-1490474418585-ba9bad8fd0ea?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1600&h=900&fit=crop&ixid=eyJhcHBfaWQiOjF9&s=25f8eaff1b0999e2f5f6c52e3af4c9d0",
        precedence: 0,
        published: true
      },
      "974349df-5b08-4024-aacb-bc144ab86d9b": {
        id: "974349df-5b08-4024-aacb-bc144ab86d9b",
        url: "https://images.unsplash.com/24/SAM_0551.JPG?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1600&h=900&fit=crop&ixid=eyJhcHBfaWQiOjF9&s=cb5ed1a3fb606612dc325ecee33d4950",
        precedence: 0,
        published: true
      }
    },
    translations: {
      en: {
        locale: "en",
        name: "Quia explicabo",
        description: "Quia reprehenderit fugiat aliquam. Architecto tenetur ut et laborum harum maiores. Veritatis explicabo necessitatibus iusto sed error commodi at. Aut numquam consequatur odit praesentium."
      }
    }
  },
  addons: {
    "5d6865ff-faa5-4191-84e1-9ac8f8f85641": {
      id: "5d6865ff-faa5-4191-84e1-9ac8f8f85641",
      maximum: 3,
      name: "Aut ipsa dicta",
      pivot: {
        amount: 1
      },
      price: {
        amount: "4.00",
        currency: "KWD"
      },
      translations: {
        en: {
          locale: "en",
          name: "Aut ipsa dicta"
        }
      }
    },
    "649c17c5-93fd-4ac4-bc38-a18a8c03289a": {
      id: "649c17c5-93fd-4ac4-bc38-a18a8c03289a",
      maximum: 28,
      name: "Consectetur",
      pivot: {
        amount: 1
      },
      price: {
        amount: "0.40",
        currency: "KWD"
      },
      translations: {
        en: {
          locale: "en",
          name: "Consectetur"
        }
      }
    },
    "68d59d4f-46bd-4445-82f2-e59517ad09ba": {
      id: "68d59d4f-46bd-4445-82f2-e59517ad09ba",
      maximum: 30,
      name: "Quis expedita",
      pivot: {
        amount: 1
      },
      price: {
        amount: "6.80",
        currency: "KWD"
      },
      translations: {
        en: {
          locale: "en",
          name: "Quis expedita"
        }
      }
    }
  },
  excludes: {
    "bc350bd7-e18e-43b6-83d6-418914866638": {
      id: "bc350bd7-e18e-43b6-83d6-418914866638",
      excludable: false,
      name: "Tenetur nulla",
      pivot: {
        order_item_id: "773486ad-1da3-4d21-81b8-921f134476fa",
        ingredient_id: "bc350bd7-e18e-43b6-83d6-418914866638"
      },
      translations: {
        en: {
          locale: "en",
          name: "Tenetur nulla"
        }
      }
    },
    "a59b3761-b83d-4e2f-ba73-ce40c8dbdb2e": {
      id: "a59b3761-b83d-4e2f-ba73-ce40c8dbdb2e",
      excludable: true,
      name: "Est recusandae",
      pivot: {
        order_item_id: "773486ad-1da3-4d21-81b8-921f134476fa",
        ingredient_id: "a59b3761-b83d-4e2f-ba73-ce40c8dbdb2e"
      },
      translations: {
        en: {
          locale: "en",
          name: "Est recusandae"
        }
      }
    }
  },
  transfers: [],
  owners: {
    "01249bfd-a046-48b5-bf77-b144a15e0ed8": {
      id: "01249bfd-a046-48b5-bf77-b144a15e0ed8",
      user_id: "f9ea1528-fa53-4714-bd2e-e3d6f9c1ef51",
      receipt_id: null,
      paid: true
    },
    "42993401-3b88-4762-8e20-948b5bd86fb7": {
      id: "42993401-3b88-4762-8e20-948b5bd86fb7",
      user_id: "9cc5d5d6-d747-4528-9c1d-56d603b1cb9f",
      receipt_id: null,
      paid: true
    },
    "da79a2d2-59f4-4ea9-9541-ebd53c078c15": {
      id: "da79a2d2-59f4-4ea9-9541-ebd53c078c15",
      user_id: "c18f26f5-4880-4053-9695-db0b02f40a84",
      receipt_id: null,
      paid: true
    },
    "fbb69b8c-2bed-4263-81a6-78cb05166253": {
      id: "fbb69b8c-2bed-4263-81a6-78cb05166253",
      user_id: "686144e9-de76-4e6c-9953-4f20596947d4",
      receipt_id: null,
      paid: true
    }
  },
  choices: {
    "14af96bc-a601-4140-a129-b8e5c8035975": {
      id: "14af96bc-a601-4140-a129-b8e5c8035975",
      name: "Non earum nisi",
      pivot: {
        order_item_id: "773486ad-1da3-4d21-81b8-921f134476fa",
        choice_id: "14af96bc-a601-4140-a129-b8e5c8035975"
      },
      difference: {
        amount: "-2.79",
        currency: "KWD"
      },
      translations: {
        en: {
          locale: "en",
          name: "Non earum nisi"
        }
      }
    }
  }
},
{
  id: "1800b5e8-9d1a-4fc9-b231-92b192860e55",
  initiator: "4597aad7-be29-46dc-a4f1-d489075d4def",
  status: "PROCESSING",
  meta: {
    eta: 1020,
    previous: "PROCESSING",
    status_updated: "2017-11-24 08:44:18"
  },
  subtotal: {
    amount: "111.700",
    currency: "KWD"
  },
  locked: true,
  paid: true,
  menu_item: {
    id: "4bd4c434-bf24-4bb3-9398-9c943bfea1cf",
    menu_category_id: "08b76e42-93b0-43c8-b554-35cbfd0e142b",
    published: true,
    calories: {
      fats: 1145,
      carbs: 6412,
      total: 3998,
      proteins: 6804
    },
    precedence: 0,
    display: null,
    promotion: null,
    cooking_time: null,
    favorite: false,
    favorite_count: 0,
    price: {
      amount: "104.10",
      currency: "KWD"
    },
    name: "Quibusdam ullam",
    description: "Et enim cumque quae deserunt suscipit amet maiores. Eos nihil veniam consequatur consequatur. Facere sit temporibus quo quasi.",
    images: {
      "ccb72380-1b91-4414-882b-36711be1a9b2": {
        id: "ccb72380-1b91-4414-882b-36711be1a9b2",
        url: "https://images.unsplash.com/photo-1418479631014-8cbf89db3431?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1600&h=900&fit=crop&ixid=eyJhcHBfaWQiOjF9&s=a9891a2f88b68350de704dc3416191b7",
        precedence: 0,
        published: true
      }
    },
    translations: {
      en: {
        locale: "en",
        name: "Quibusdam ullam",
        description: "Et enim cumque quae deserunt suscipit amet maiores. Eos nihil veniam consequatur consequatur. Facere sit temporibus quo quasi."
      }
    }
  },
  addons: {
    "258bbc75-2648-49d4-8971-db0b949c9e30": {
      id: "258bbc75-2648-49d4-8971-db0b949c9e30",
      maximum: 24,
      name: "Consectetur",
      pivot: {
        amount: 1
      },
      price: {
        amount: "1.60",
        currency: "KWD"
      },
      translations: {
        en: {
          locale: "en",
          name: "Consectetur"
        }
      }
    }
  },
  excludes: {
    "a59b3761-b83d-4e2f-ba73-ce40c8dbdb2e": {
      id: "a59b3761-b83d-4e2f-ba73-ce40c8dbdb2e",
      excludable: true,
      name: "Est recusandae",
      pivot: {
        order_item_id: "1800b5e8-9d1a-4fc9-b231-92b192860e55",
        ingredient_id: "a59b3761-b83d-4e2f-ba73-ce40c8dbdb2e"
      },
      translations: {
        en: {
          locale: "en",
          name: "Est recusandae"
        }
      }
    }
  },
  transfers: [],
  owners: {
    "9fc6a57a-40b0-48fc-9b37-679b5cd50460": {
      id: "9fc6a57a-40b0-48fc-9b37-679b5cd50460",
      user_id: "d5cb9e07-43a4-4a0d-bc3f-d8f1eed15ef3",
      receipt_id: null,
      paid: true
    },
    "f7c22a9d-fa2f-41f9-bf44-c8446022995a": {
      id: "f7c22a9d-fa2f-41f9-bf44-c8446022995a",
      user_id: "c5ebf96c-6a25-4e08-9543-3cde7a70d0ea",
      receipt_id: null,
      paid: true
    }
  },
  choices: {
    "cab0906d-268e-4eae-afd5-5c4bd0b913ea": {
      id: "cab0906d-268e-4eae-afd5-5c4bd0b913ea",
      name: "Animi similique",
      pivot: {
        order_item_id: "1800b5e8-9d1a-4fc9-b231-92b192860e55",
        choice_id: "cab0906d-268e-4eae-afd5-5c4bd0b913ea"
      },
      difference: {
        amount: "1.13",
        currency: "KWD"
      },
      translations: {
        en: {
          locale: "en",
          name: "Animi similique"
        }
      }
    },
    "a4091411-794d-4713-b10e-d6fe252008b9": {
      id: "a4091411-794d-4713-b10e-d6fe252008b9",
      name: "Et voluptatem",
      pivot: {
        order_item_id: "1800b5e8-9d1a-4fc9-b231-92b192860e55",
        choice_id: "a4091411-794d-4713-b10e-d6fe252008b9"
      },
      difference: {
        amount: "0.09",
        currency: "KWD"
      },
      translations: {
        en: {
          locale: "en",
          name: "Et voluptatem"
        }
      }
    },
    "8b75fa95-1663-4ebd-af90-42f311bd95ec": {
      id: "8b75fa95-1663-4ebd-af90-42f311bd95ec",
      name: "Excepturi",
      pivot: {
        order_item_id: "1800b5e8-9d1a-4fc9-b231-92b192860e55",
        choice_id: "8b75fa95-1663-4ebd-af90-42f311bd95ec"
      },
      difference: {
        amount: "4.78",
        currency: "KWD"
      },
      translations: {
        en: {
          locale: "en",
          name: "Excepturi"
        }
      }
    }
  }
}
];
