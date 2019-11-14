export type KeyedSchemas = {
  [namespace: string]: {
    schema: string[];
  };
};
const schemas: KeyedSchemas = {
  landing: {
    schema: [
      "features",
      "footer.contact",
      "footer.copyright",
      "footer.language",
      "footer.links.home",
      "footer.links.privacy",
      "footer.links.restaurants",
      "footer.links.support",
      "footer.links.terms",
      "footer.links.title",
      "footer.withlove",
      "hero.cta",
      "hero.header",
      "hero.restaurants",
      "hero.subtitle",
      "restaurantsPage.hero.caption",
      "restaurantsPage.hero.continueWith",
      "restaurantsPage.hero.cta",
      "restaurantsPage.hero.subtitle",
      "restaurantsPage.hero.title",
      "restaurantsPage.sections.faq.business.content",
      "restaurantsPage.sections.faq.business.title",
      "restaurantsPage.sections.faq.correct.content",
      "restaurantsPage.sections.faq.correct.title",
      "restaurantsPage.sections.faq.devices.content",
      "restaurantsPage.sections.faq.devices.title",
      "restaurantsPage.sections.faq.modify.content",
      "restaurantsPage.sections.faq.modify.title",
      "restaurantsPage.sections.faq.title",
      "restaurantsPage.sections.faq.training.content",
      "restaurantsPage.sections.faq.training.title",
      "restaurantsPage.sections.faq.translation.content",
      "restaurantsPage.sections.faq.translation.title",
      "restaurantsPage.sections.faq.trial.content",
      "restaurantsPage.sections.faq.trial.title",
      "restaurantsPage.sections.pricing.cta",
      "restaurantsPage.sections.pricing.price.monthly.amount",
      "restaurantsPage.sections.pricing.price.monthly.caption",
      "restaurantsPage.sections.pricing.title",
      "restaurantsPage.sections.statement.title",
      "restaurantsPage.sections.steps.step1",
      "restaurantsPage.sections.steps.step2",
      "restaurantsPage.sections.steps.step3",
      "restaurantsPage.sections.steps.step4",
      "restaurantsPage.sections.waiterboard.order.alt",
      "restaurantsPage.sections.waiterboard.order.description",
      "restaurantsPage.sections.waiterboard.order.title",
      "restaurantsPage.sections.waiterboard.pay.alt",
      "restaurantsPage.sections.waiterboard.pay.description",
      "restaurantsPage.sections.waiterboard.pay.title",
      "restaurantsPage.sections.waiterboard.service.alt",
      "restaurantsPage.sections.waiterboard.service.description",
      "restaurantsPage.sections.waiterboard.service.title",
      "restaurantsPage.sections.waiterboard.subtitle",
      "restaurantsPage.sections.waiterboard.title",
      "sectionFAQ.download.content",
      "sectionFAQ.download.title",
      "sectionFAQ.free.content",
      "sectionFAQ.free.title",
      "sectionFAQ.internet.content",
      "sectionFAQ.internet.title",
      "sectionFAQ.scan.content",
      "sectionFAQ.scan.title",
      "sectionFAQ.started.content",
      "sectionFAQ.started.title",
      "sectionFAQ.title",
      "sectionFAQ.useful.content",
      "sectionFAQ.useful.title",
      "sectionMultilingual.header",
      "sectionMultilingual.subtitle",
      "sectionProduct.header",
      "sectionProduct.step1.description",
      "sectionProduct.step1.title",
      "sectionProduct.step2.description",
      "sectionProduct.step2.title",
      "sectionProduct.step3.description",
      "sectionProduct.step3.title",
      "sectionProduct.subtitle"
    ]
  },
  "core.app": {
    schema: [
      "add",
      "addons",
      "address",
      "appBar.back",
      "appBar.cancel",
      "appBar.done",
      "appBar.edit",
      "auth.appFormSubtitle",
      "auth.continueWithEmail",
      "auth.continueWithFacebook",
      "auth.continueWithGoogle",
      "auth.createAccount",
      "auth.dashboardFormSubtitle",
      "auth.email-already-in-use",
      "auth.firstName",
      "auth.forgotPassword",
      "auth.forgotPwdFormSubtitle",
      "auth.invalid-email",
      "auth.lastName",
      "auth.newAccount",
      "auth.or",
      "auth.password",
      "auth.sendEmail",
      "auth.signInWithPassword",
      "auth.user-disabled",
      "auth.user-not-found",
      "auth.weak-password",
      "auth.wrong-password",
      "back",
      "bill.itemCountSelected",
      "bill.itemCountSelected_none",
      "bill.itemCountSelected_plural",
      "bill.section.confirmed",
      "bill.section.empty",
      "bill.section.waiting",
      "bill.selecting",
      "bill.split",
      "bill.splittingCount",
      "bill.splittingCount_plural",
      "bill.splittingWith",
      "bill.splittingWith_zero",
      "bill.title",
      "browse.caption",
      "browse.title",
      "camera.header",
      "camera.notAvailable.subtitle",
      "camera.notAvailable.title",
      "camera.takePhoto",
      "cancel",
      "cart.add",
      "cart.itemCount",
      "cart.title",
      "checkedIn",
      "checkedOut",
      "checkIn",
      "clear",
      "currency.original",
      "currency.other",
      "currency.set",
      "currency.title",
      "delete",
      "dinein.actions",
      "dinein.callService",
      "dinein.checkedin",
      "dinein.seeMenu",
      "done",
      "edit",
      "editing",
      "email.long",
      "email.short",
      "errorMessages.addon-more-then-max-amount",
      "errorMessages.cart-already-exists",
      "errorMessages.cart-empty",
      "errorMessages.cart-item-incorrect-initiator",
      "errorMessages.cart-item-not-found",
      "errorMessages.ingredient-not-excludable",
      "errorMessages.ingredient-not-found",
      "errorMessages.menu-item-incorrect-addon",
      "errorMessages.menu-item-incorrect-choice",
      "errorMessages.menu-item-incorrect-ingredient",
      "errorMessages.menu-item-no-addons",
      "errorMessages.menu-item-no-ingredients",
      "errorMessages.menu-item-no-options",
      "errorMessages.menu-item-not-found",
      "errorMessages.no-users-for-checkout",
      "errorMessages.order-already-confirmed",
      "errorMessages.order-not-found",
      "errorMessages.restaurant-not-found",
      "errorMessages.seat-table-not-found",
      "errorMessages.table-fully-occupied",
      "errorMessages.table-not-found",
      "errorMessages.table-offline",
      "errorMessages.transaction-not-found",
      "errorMessages.transaction-processed-already",
      "errorMessages.transaction-unprocessed-exists",
      "errorMessages.user-already-checked-in",
      "errorMessages.user-not-checked-in",
      "errorMessages.user-not-paid-bill",
      "errorMessages.waiterboard-not-found",
      "gratuity",
      "guestJoinedTable",
      "guestLeftTable",
      "hours.closed",
      "hours.closes_at",
      "hours.open",
      "hours.opens_at",
      "ingredients",
      "language.addOther",
      "language.default",
      "language.other",
      "language.setPrimary",
      "loadingEllipsis",
      "menu.caption",
      "menu.title",
      "meParentheses",
      "nav.account",
      "nav.browse",
      "nav.dineIn",
      "nav.explore",
      "nav.menu",
      "nav.settings",
      "newBillSplitItems",
      "next",
      "nutrition.calories",
      "nutrition.carbs",
      "nutrition.facts",
      "nutrition.fats",
      "nutrition.proteins",
      "order.cancelled",
      "order.confirmed",
      "order.instruction",
      "order.title",
      "other",
      "pay.cancelled",
      "pay.confirmed",
      "pay.pending",
      "pay.title",
      "phone.long",
      "phone.short",
      "profile",
      "roles.at",
      "roles.proofreader",
      "roles.restaurant.cook",
      "roles.restaurant.manager",
      "roles.restaurant.owner",
      "roles.restaurant.waiter",
      "roles.title",
      "save",
      "saved",
      "saveFailed",
      "search",
      "select",
      "selectCountry",
      "selectCurrency",
      "selectLanguage",
      "service.header",
      "service.instruction",
      "service.subtitle",
      "service.title",
      "service.types.condiments",
      "service.types.tableware",
      "serviceCallCancelled",
      "serviceCallConfirmed",
      "serviceFee",
      "subtotal",
      "successMessages.added-to-cart",
      "successMessages.check-in-for-menu",
      "successMessages.order-has-been-placed",
      "successMessages.payment-request-sent",
      "successMessages.removed-from-cart",
      "successMessages.service-called",
      "successMessages.you-are-now-checked-in",
      "suggested",
      "theme.nightModeOff",
      "theme.nightModeOn",
      "theme.title",
      "toggle.off",
      "toggle.on",
      "total",
      "totalConverted",
      "user.logOut",
      "user.signIn",
      "website"
    ]
  },
  "core.dashboard": {
    schema: [
      "add",
      "addLanguage",
      "address.businessAddress",
      "address.city",
      "address.postalCode",
      "address.street",
      "addTable",
      "addTables",
      "auth.appFormSubtitle",
      "auth.continueWithEmail",
      "auth.continueWithFacebook",
      "auth.continueWithGoogle",
      "auth.createAccount",
      "auth.dashboardFormSubtitle",
      "auth.email-already-in-use",
      "auth.firstName",
      "auth.forgotPassword",
      "auth.forgotPwdFormSubtitle",
      "auth.invalid-email",
      "auth.lastName",
      "auth.newAccount",
      "auth.or",
      "auth.password",
      "auth.sendEmail",
      "auth.signInWithPassword",
      "auth.user-disabled",
      "auth.user-not-found",
      "auth.weak-password",
      "auth.wrong-password",
      "back",
      "cancel",
      "changeRestaurant",
      "clear",
      "completePrevious",
      "condiments",
      "contactsIn",
      "createAddonFail",
      "createIngredientFail",
      "createMenu",
      "createOptionFail",
      "defaultLanguageLabel",
      "defaultLanguageRecom",
      "delete",
      "done",
      "edit",
      "email.long",
      "email.short",
      "errorMessages.addon-more-then-max-amount",
      "errorMessages.cart-already-exists",
      "errorMessages.cart-empty",
      "errorMessages.cart-item-incorrect-initiator",
      "errorMessages.cart-item-not-found",
      "errorMessages.ingredient-not-excludable",
      "errorMessages.ingredient-not-found",
      "errorMessages.menu-item-incorrect-addon",
      "errorMessages.menu-item-incorrect-choice",
      "errorMessages.menu-item-incorrect-ingredient",
      "errorMessages.menu-item-no-addons",
      "errorMessages.menu-item-no-ingredients",
      "errorMessages.menu-item-no-options",
      "errorMessages.menu-item-not-found",
      "errorMessages.no-users-for-checkout",
      "errorMessages.order-already-confirmed",
      "errorMessages.order-not-found",
      "errorMessages.restaurant-not-found",
      "errorMessages.seat-table-not-found",
      "errorMessages.table-fully-occupied",
      "errorMessages.table-not-found",
      "errorMessages.table-offline",
      "errorMessages.transaction-not-found",
      "errorMessages.transaction-processed-already",
      "errorMessages.transaction-unprocessed-exists",
      "errorMessages.user-already-checked-in",
      "errorMessages.user-not-checked-in",
      "errorMessages.user-not-paid-bill",
      "errorMessages.waiterboard-not-found",
      "fillFieldAbove",
      "goToWaiterboard",
      "loadingEllipsis",
      "location",
      "manageTheseRestaurants",
      "menu.addAddon",
      "menu.addCategory",
      "menu.addChoice",
      "menu.addDish",
      "menu.addIngredient",
      "menu.addons",
      "menu.addOption",
      "menu.categories",
      "menu.categoryEmpty",
      "menu.choices",
      "menu.description",
      "menu.dishDetail",
      "menu.dishes",
      "menu.dishName",
      "menu.dishOf",
      "menu.ingredients",
      "menu.newAddon",
      "menu.newAddonPlaceholder",
      "menu.newCategoryName",
      "menu.newCategoryPlaceholder",
      "menu.newChoice",
      "menu.newChoicePlaceholder",
      "menu.newDishPlaceholder",
      "menu.newIngredient",
      "menu.newIngredientPlaceholder",
      "menu.newOption",
      "menu.newOptionPlaceholder",
      "menu.noAddons",
      "menu.noIngredients",
      "menu.noOptionGroups",
      "menu.optionGroups",
      "menu.price",
      "menu.selectAddons",
      "menu.selectIngredients",
      "menu.selectOptionGroups",
      "menu.startWithCategory",
      "nameOfRestaurant",
      "nav.customizations",
      "nav.mainInfo",
      "nav.menu",
      "nav.menuEditor",
      "nav.services",
      "nav.settings",
      "nav.tableCodes",
      "nav.tables",
      "nav.translations",
      "nav.waiterboards",
      "next",
      "nutrition.calories",
      "nutrition.carbs",
      "nutrition.facts",
      "nutrition.fats",
      "nutrition.proteins",
      "other",
      "phone.long",
      "phone.short",
      "publish",
      "published",
      "publishRequestPending",
      "register",
      "registerNewRestaurant",
      "restaurantImage",
      "restaurantPublished",
      "restaurantURL",
      "save",
      "saved",
      "saveFailed",
      "search",
      "searchPlaces",
      "select",
      "selectCountry",
      "selectCurrency",
      "selectLanguage",
      "selectLanguagePlaceholder",
      "selectServiceIcon",
      "serviceName",
      "services.noCondiments",
      "services.noTableware",
      "services.step1",
      "services.step2",
      "services.step3",
      "socialMedia",
      "suggested",
      "tableCapacity",
      "tableNumber",
      "tableware",
      "unpublished",
      "uploadImageFormats",
      "uploadImageGuide",
      "uploadImageGuideDish",
      "user.logOut",
      "user.signIn",
      "wifiCredentials"
    ]
  }
};
export default schemas;
