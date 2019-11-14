export const schema: MessageKey[] = [
  'user.signIn',
  'user.logOut',
  'phone.short',
  'phone.long',
  'email.short',
  'email.long',
  'auth.appFormSubtitle',
  'auth.dashboardFormSubtitle',
  'auth.forgotPwdFormSubtitle',
  'auth.signInWithPassword',
  'auth.createAccount',
  'auth.forgotPassword',
  'auth.sendEmail',
  'auth.newAccount',
  'auth.continueWithEmail',
  'auth.firstName',
  'auth.lastName',
  'auth.password',
  'auth.or',
  'auth.continueWithFacebook',
  'auth.continueWithGoogle',
  'auth.invalid-email',
  'auth.email-already-in-use',
  'auth.weak-password',
  'auth.user-disabled',
  'auth.user-not-found',
  'auth.wrong-password',
  'suggested',
  'selectLanguage',
  'selectCountry',
  'selectCurrency',
  'back',
  'next',
  'select',
  'clear',
  'search',
  'cancel',
  'edit',
  'done',
  'other',
  'loadingEllipsis',
  'saved',
  'saveFailed',
  'errorMessages.ingredient-not-found',
  'errorMessages.restaurant-not-found',
  'errorMessages.seat-table-not-found',
  'errorMessages.transaction-not-found',
  'errorMessages.waiterboard-not-found',
  'errorMessages.menu-item-not-found',
  'errorMessages.cart-item-not-found',
  'errorMessages.order-not-found',
  'errorMessages.table-not-found',
  'errorMessages.ingredient-not-excludable',
  'errorMessages.addon-more-then-max-amount',
  'errorMessages.menu-item-incorrect-ingredient',
  'errorMessages.menu-item-no-ingredients',
  'errorMessages.menu-item-no-addons',
  'errorMessages.menu-item-no-options',
  'errorMessages.menu-item-incorrect-choice',
  'errorMessages.menu-item-incorrect-addon',
  'errorMessages.cart-item-incorrect-initiator',
  'errorMessages.table-offline',
  'errorMessages.table-fully-occupied',
  'errorMessages.user-not-checked-in',
  'errorMessages.user-not-paid-bill',
  'errorMessages.user-already-checked-in',
  'errorMessages.no-users-for-checkout',
  'errorMessages.order-already-confirmed',
  'errorMessages.transaction-unprocessed-exists',
  'errorMessages.cart-already-exists',
  'errorMessages.cart-empty',
  'errorMessages.transaction-processed-already',
  'menu.title',
  'menu.caption',
  'address',
  'appBar.back',
  'appBar.cancel',
  'appBar.edit',
  'appBar.done',
  'hours.open',
  'hours.closed',
  'hours.opens_at',
  'hours.closes_at',
  'website',
  'nav.explore',
  'nav.browse',
  'nav.dineIn',
  'nav.account',
  'nav.menu',
  'nav.settings',
  'dinein.checkedin',
  'dinein.actions',
  'dinein.seeMenu',
  'dinein.callService',
  'checkIn',
  'checkedIn',
  'ingredients',
  'addons',
  'subtotal',
  'total',
  'totalConverted',
  'serviceFee',
  'order.title',
  'order.confirmed',
  'order.cancelled',
  'order.instruction',
  'camera.header',
  'camera.notAvailable.title',
  'camera.notAvailable.subtitle',
  'camera.takePhoto',
  'browse.title',
  'browse.caption',
  'service.header',
  'service.title',
  'service.subtitle',
  'service.instruction',
  'service.types.tableware',
  'service.types.condiments',
  'bill.section.waiting',
  'bill.section.confirmed',
  'bill.section.empty',
  'bill.title',
  'bill.split',
  'bill.selecting',
  'bill.splittingWith',
  'bill.splittingWith_zero',
  'bill.splittingCount',
  'bill.splittingCount_plural',
  'bill.itemCountSelected',
  'bill.itemCountSelected_plural',
  'bill.itemCountSelected_none',
  'meParentheses',
  'gratuity',
  'pay',
  'paymentPending',
  'paymentConfirmed',
  'paymentCancelled',
  'editing',
  'profile',
  'currency.title',
  'currency.set',
  'currency.original',
  'currency.other',
  'roles.title',
  'roles.at',
  'roles.restaurant.owner',
  'roles.restaurant.manager',
  'roles.restaurant.waiter',
  'roles.restaurant.cook',
  'roles.proofreader',
  'language.setPrimary',
  'language.default',
  'language.other',
  'language.addOther',
  'toggle.on',
  'toggle.off',
  'theme.title',
  'theme.nightModeOn',
  'theme.nightModeOff',
  'cart.title',
  'cart.itemCount',
  'cart.add',
  'nutrition.facts',
  'nutrition.fats',
  'nutrition.carbs',
  'nutrition.proteins',
  'nutrition.calories',
  'successMessages.check-in-for-menu',
  'successMessages.added-to-cart',
  'successMessages.removed-from-cart',
  'successMessages.order-has-been-placed',
  'successMessages.you-are-now-checked-in',
  'successMessages.service-called',
  'successMessages.payment-request-sent',
  'guestJoinedTable',
  'guestLeftTable',
  'newBillSplitItems',
  'checkedOut',
  'serviceCallConfirmed',
  'serviceCallCancelled',
];
export type MessageKey =
  | 'user.signIn'
  | 'user.logOut'
  | 'phone.short'
  | 'phone.long'
  | 'email.short'
  | 'email.long'
  | 'auth.appFormSubtitle'
  | 'auth.dashboardFormSubtitle'
  | 'auth.forgotPwdFormSubtitle'
  | 'auth.signInWithPassword'
  | 'auth.createAccount'
  | 'auth.forgotPassword'
  | 'auth.sendEmail'
  | 'auth.newAccount'
  | 'auth.continueWithEmail'
  | 'auth.firstName'
  | 'auth.lastName'
  | 'auth.password'
  | 'auth.or'
  | 'auth.continueWithFacebook'
  | 'auth.continueWithGoogle'
  | 'auth.invalid-email'
  | 'auth.email-already-in-use'
  | 'auth.weak-password'
  | 'auth.user-disabled'
  | 'auth.user-not-found'
  | 'auth.wrong-password'
  | 'suggested'
  | 'selectLanguage'
  | 'selectCountry'
  | 'selectCurrency'
  | 'back'
  | 'next'
  | 'select'
  | 'clear'
  | 'search'
  | 'cancel'
  | 'edit'
  | 'done'
  | 'other'
  | 'loadingEllipsis'
  | 'saved'
  | 'saveFailed'
  | 'errorMessages.ingredient-not-found'
  | 'errorMessages.restaurant-not-found'
  | 'errorMessages.seat-table-not-found'
  | 'errorMessages.transaction-not-found'
  | 'errorMessages.waiterboard-not-found'
  | 'errorMessages.menu-item-not-found'
  | 'errorMessages.cart-item-not-found'
  | 'errorMessages.order-not-found'
  | 'errorMessages.table-not-found'
  | 'errorMessages.ingredient-not-excludable'
  | 'errorMessages.addon-more-then-max-amount'
  | 'errorMessages.menu-item-incorrect-ingredient'
  | 'errorMessages.menu-item-no-ingredients'
  | 'errorMessages.menu-item-no-addons'
  | 'errorMessages.menu-item-no-options'
  | 'errorMessages.menu-item-incorrect-choice'
  | 'errorMessages.menu-item-incorrect-addon'
  | 'errorMessages.cart-item-incorrect-initiator'
  | 'errorMessages.table-offline'
  | 'errorMessages.table-fully-occupied'
  | 'errorMessages.user-not-checked-in'
  | 'errorMessages.user-not-paid-bill'
  | 'errorMessages.user-already-checked-in'
  | 'errorMessages.no-users-for-checkout'
  | 'errorMessages.order-already-confirmed'
  | 'errorMessages.transaction-unprocessed-exists'
  | 'errorMessages.cart-already-exists'
  | 'errorMessages.cart-empty'
  | 'errorMessages.transaction-processed-already'
  | 'menu.title'
  | 'menu.caption'
  | 'address'
  | 'appBar.back'
  | 'appBar.cancel'
  | 'appBar.edit'
  | 'appBar.done'
  | 'hours.open'
  | 'hours.closed'
  | 'hours.opens_at'
  | 'hours.closes_at'
  | 'website'
  | 'nav.explore'
  | 'nav.browse'
  | 'nav.dineIn'
  | 'nav.account'
  | 'nav.menu'
  | 'nav.settings'
  | 'dinein.checkedin'
  | 'dinein.actions'
  | 'dinein.seeMenu'
  | 'dinein.callService'
  | 'checkIn'
  | 'checkedIn'
  | 'ingredients'
  | 'addons'
  | 'subtotal'
  | 'total'
  | 'totalConverted'
  | 'serviceFee'
  | 'order.title'
  | 'order.confirmed'
  | 'order.cancelled'
  | 'order.instruction'
  | 'camera.header'
  | 'camera.notAvailable.title'
  | 'camera.notAvailable.subtitle'
  | 'camera.takePhoto'
  | 'browse.title'
  | 'browse.caption'
  | 'service.header'
  | 'service.title'
  | 'service.subtitle'
  | 'service.instruction'
  | 'service.types.tableware'
  | 'service.types.condiments'
  | 'bill.section.waiting'
  | 'bill.section.confirmed'
  | 'bill.section.empty'
  | 'bill.title'
  | 'bill.split'
  | 'bill.selecting'
  | 'bill.splittingWith'
  | 'bill.splittingWith_zero'
  | 'bill.splittingCount'
  | 'bill.splittingCount_plural'
  | 'bill.itemCountSelected'
  | 'bill.itemCountSelected_plural'
  | 'bill.itemCountSelected_none'
  | 'meParentheses'
  | 'gratuity'
  | 'pay'
  | 'paymentPending'
  | 'paymentConfirmed'
  | 'paymentCancelled'
  | 'editing'
  | 'profile'
  | 'currency.title'
  | 'currency.set'
  | 'currency.original'
  | 'currency.other'
  | 'roles.title'
  | 'roles.at'
  | 'roles.restaurant.owner'
  | 'roles.restaurant.manager'
  | 'roles.restaurant.waiter'
  | 'roles.restaurant.cook'
  | 'roles.proofreader'
  | 'language.setPrimary'
  | 'language.default'
  | 'language.other'
  | 'language.addOther'
  | 'toggle.on'
  | 'toggle.off'
  | 'theme.title'
  | 'theme.nightModeOn'
  | 'theme.nightModeOff'
  | 'cart.title'
  | 'cart.itemCount'
  | 'cart.add'
  | 'nutrition.facts'
  | 'nutrition.fats'
  | 'nutrition.carbs'
  | 'nutrition.proteins'
  | 'nutrition.calories'
  | 'successMessages.check-in-for-menu'
  | 'successMessages.added-to-cart'
  | 'successMessages.removed-from-cart'
  | 'successMessages.order-has-been-placed'
  | 'successMessages.you-are-now-checked-in'
  | 'successMessages.service-called'
  | 'successMessages.payment-request-sent'
  | 'guestJoinedTable'
  | 'guestLeftTable'
  | 'newBillSplitItems'
  | 'checkedOut'
  | 'serviceCallConfirmed'
  | 'serviceCallCancelled';
export interface Messages {
  user: {
    signIn: string;
    logOut: string;
  };
  phone: {
    short: string;
    long: string;
  };
  email: {
    short: string;
    long: string;
  };
  auth: {
    appFormSubtitle: string;
    dashboardFormSubtitle: string;
    forgotPwdFormSubtitle: string;
    signInWithPassword: string;
    createAccount: string;
    forgotPassword: string;
    sendEmail: string;
    newAccount: string;
    continueWithEmail: string;
    firstName: string;
    lastName: string;
    password: string;
    or: string;
    continueWithFacebook: string;
    continueWithGoogle: string;
    'invalid-email': string;
    'email-already-in-use': string;
    'weak-password': string;
    'user-disabled': string;
    'user-not-found': string;
    'wrong-password': string;
  };
  suggested: string;
  selectLanguage: string;
  selectCountry: string;
  selectCurrency: string;
  back: string;
  next: string;
  select: string;
  clear: string;
  search: string;
  cancel: string;
  edit: string;
  done: string;
  other: string;
  loadingEllipsis: string;
  saved: string;
  saveFailed: string;
  errorMessages: {
    'ingredient-not-found': string;
    'restaurant-not-found': string;
    'seat-table-not-found': string;
    'transaction-not-found': string;
    'waiterboard-not-found': string;
    'menu-item-not-found': string;
    'cart-item-not-found': string;
    'order-not-found': string;
    'table-not-found': string;
    'ingredient-not-excludable': string;
    'addon-more-then-max-amount': string;
    'menu-item-incorrect-ingredient': string;
    'menu-item-no-ingredients': string;
    'menu-item-no-addons': string;
    'menu-item-no-options': string;
    'menu-item-incorrect-choice': string;
    'menu-item-incorrect-addon': string;
    'cart-item-incorrect-initiator': string;
    'table-offline': string;
    'table-fully-occupied': string;
    'user-not-checked-in': string;
    'user-not-paid-bill': string;
    'user-already-checked-in': string;
    'no-users-for-checkout': string;
    'order-already-confirmed': string;
    'transaction-unprocessed-exists': string;
    'cart-already-exists': string;
    'cart-empty': string;
    'transaction-processed-already': string;
  };
  menu: {
    title: string;
    caption: string;
  };
  address: string;
  appBar: {
    back: string;
    cancel: string;
    edit: string;
    done: string;
  };
  hours: {
    open: string;
    closed: string;
    opens_at: string;
    closes_at: string;
  };
  website: string;
  nav: {
    explore: string;
    browse: string;
    dineIn: string;
    account: string;
    menu: string;
    settings: string;
  };
  dinein: {
    checkedin: string;
    actions: string;
    seeMenu: string;
    callService: string;
  };
  checkIn: string;
  checkedIn: string;
  ingredients: string;
  addons: string;
  subtotal: string;
  total: string;
  totalConverted: string;
  serviceFee: string;
  order: {
    title: string;
    confirmed: string;
    cancelled: string;
    instruction: string;
  };
  camera: {
    header: string;
    notAvailable: {
      title: string;
      subtitle: string;
    };
    takePhoto: string;
  };
  browse: {
    title: string;
    caption: string;
  };
  service: {
    header: string;
    title: string;
    subtitle: string;
    instruction: string;
    types: {
      tableware: string;
      condiments: string;
    };
  };
  bill: {
    section: {
      waiting: string;
      confirmed: string;
      empty: string;
    };
    title: string;
    split: string;
    selecting: string;
    splittingWith: string;
    splittingWith_zero: string;
    splittingCount: string;
    splittingCount_plural: string;
    itemCountSelected: string;
    itemCountSelected_plural: string;
    itemCountSelected_none: string;
  };
  meParentheses: string;
  gratuity: string;
  pay: string;
  paymentPending: string;
  paymentConfirmed: string;
  paymentCancelled: string;
  editing: string;
  profile: string;
  currency: {
    title: string;
    set: string;
    original: string;
    other: string;
  };
  roles: {
    title: string;
    at: string;
    restaurant: {
      owner: string;
      manager: string;
      waiter: string;
      cook: string;
    };
    proofreader: string;
  };
  language: {
    setPrimary: string;
    default: string;
    other: string;
    addOther: string;
  };
  toggle: {
    on: string;
    off: string;
  };
  theme: {
    title: string;
    nightModeOn: string;
    nightModeOff: string;
  };
  cart: {
    title: string;
    itemCount: string;
    add: string;
  };
  nutrition: {
    facts: string;
    fats: string;
    carbs: string;
    proteins: string;
    calories: string;
  };
  successMessages: {
    'check-in-for-menu': string;
    'added-to-cart': string;
    'removed-from-cart': string;
    'order-has-been-placed': string;
    'you-are-now-checked-in': string;
    'service-called': string;
    'payment-request-sent': string;
  };
  guestJoinedTable: string;
  guestLeftTable: string;
  newBillSplitItems: string;
  checkedOut: string;
  serviceCallConfirmed: string;
  serviceCallCancelled: string;
}
