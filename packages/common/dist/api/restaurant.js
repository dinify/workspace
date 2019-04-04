"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GetRestaurants = GetRestaurants;
exports.GetRestaurant = GetRestaurant;
exports.GetMenucategories = GetMenucategories;
exports.GetMenuitems = GetMenuitems;
exports.GetMenuitem = GetMenuitem;
exports.Checkin = Checkin;
exports.GetStatus = GetStatus;
exports.FavRestaurant = FavRestaurant;
exports.FavMenuitem = FavMenuitem;
exports.GetCart = GetCart;
exports.AddToCart = AddToCart;
exports.RemoveOrderitem = RemoveOrderitem;
exports.Order = Order;
exports.GetBill = GetBill;
exports.GetReceipt = GetReceipt;
exports.GetSeats = GetSeats;
exports.SplitMultiple = SplitMultiple;
exports.TransferBill = TransferBill;
exports.InitiateTransaction = InitiateTransaction;
exports.CallService = CallService;
exports.GetServiceimages = GetServiceimages;
exports.ChangeCategory = ChangeCategory;
exports.ChangeName = ChangeName;
exports.ChangeContact = ChangeContact;
exports.ChangeBank = ChangeBank;
exports.ChangeAddress = ChangeAddress;
exports.ChangeSocial = ChangeSocial;
exports.ChangeLocation = ChangeLocation;
exports.ChangeHours = ChangeHours;
exports.CreateWaiterboard = CreateWaiterboard;
exports.RemoveWaiterboard = RemoveWaiterboard;
exports.CreateTable = CreateTable;
exports.ChangeTable = ChangeTable;
exports.RemoveTable = RemoveTable;
exports.GetCategories = GetCategories;
exports.CreateMenucategory = CreateMenucategory;
exports.ChangeMenucategory = ChangeMenucategory;
exports.RemoveMenucategory = RemoveMenucategory;
exports.CreateMenuitem = CreateMenuitem;
exports.ChangeMenuitem = ChangeMenuitem;
exports.RemoveMenuitem = RemoveMenuitem;
exports.CreateService = CreateService;
exports.RemoveService = RemoveService;
exports.ChangeNutrition = ChangeNutrition;
exports.ToggleCategory = ToggleCategory;
exports.ToggleFood = ToggleFood;
exports.GetAddons = GetAddons;
exports.CreateAddon = CreateAddon;
exports.RemoveAddon = RemoveAddon;
exports.CreateIngredient = CreateIngredient;
exports.ChangeIngredient = ChangeIngredient;
exports.RemoveIngredient = RemoveIngredient;
exports.CreateOption = CreateOption;
exports.RemoveOption = RemoveOption;
exports.CreateChoice = CreateChoice;
exports.RemoveChoice = RemoveChoice;
exports.ChangeItemimage = ChangeItemimage;
exports.ChangeImage = ChangeImage;
exports.EditImage = EditImage;
exports.ChangeFoodingredient = ChangeFoodingredient;
exports.GetTranslations = GetTranslations;
exports.AddTranslation = AddTranslation;
exports.RmTranslation = RmTranslation;
exports.Notify = Notify;
exports.GetLoggedrestaurant = GetLoggedrestaurant;
exports.GetTables = GetTables;
exports.GetSeatsOfWB = GetSeatsOfWB;
exports.CheckOut = CheckOut;
exports.CheckOutUser = CheckOutUser;
exports.GetBookings = GetBookings;
exports.ConfirmBooking = ConfirmBooking;
exports.CancelBooking = CancelBooking;
exports.GetGuests = GetGuests;
exports.GetCalls = GetCalls;
exports.ConfirmCall = ConfirmCall;
exports.GetOrders = GetOrders;
exports.ConfirmOrder = ConfirmOrder;
exports.GetBills = GetBills;
exports.GetTodaybills = GetTodaybills;
exports.ConfirmBill = ConfirmBill;
exports.GetManagedrestaurants = GetManagedrestaurants;

var _Network = require("./Network");

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function GetRestaurants() {
  return (0, _Network.Get)({
    path: "restaurant/list?with=images,tags,services.image"
  });
}

function GetRestaurant(_ref) {
  var subdomain = _ref.subdomain;
  return (0, _Network.Get)({
    path: "restaurant/".concat(subdomain, "?with=images,tags,services.image")
  });
}

var populateCategoriesWith = ['categories.items.images', 'categories.items.addons.price', 'categories.items.ingredients', 'categories.items.options.choices'].join(',');

function GetMenucategories(_ref2) {
  var subdomain = _ref2.subdomain;
  return (0, _Network.Get)({
    path: "restaurant/".concat(subdomain, "/categories?with=").concat(populateCategoriesWith, "&limit=100")
  });
}

function GetMenuitems(_ref3) {
  var categoryId = _ref3.categoryId;
  return (0, _Network.Get)({
    path: "menu/category/".concat(categoryId, "/items")
  });
}

function GetMenuitem(_ref4) {
  var id = _ref4.id;
  return (0, _Network.Get)({
    path: "menu/item/".concat(id, "?with=images,addons.price,ingredients,options.choices")
  });
}

function Checkin(_ref5) {
  var qr = _ref5.qr,
      code = _ref5.code;
  var payload = {};
  if (qr) payload.qr = qr;
  if (code) payload.code = code;
  return (0, _Network.Post)({
    path: "checkin?with=table"
  }, payload);
}

function GetStatus() {
  return (0, _Network.Get)({
    path: "table/status"
  });
}

function FavRestaurant(_ref6) {
  var id = _ref6.id,
      fav = _ref6.fav;
  return (0, _Network.Post)({
    path: "restaurant/".concat(id, "/favorite")
  }, {
    favorite: fav
  });
}

function FavMenuitem(_ref7) {
  var id = _ref7.id,
      fav = _ref7.fav;
  return (0, _Network.Post)({
    path: "menu/item/".concat(id, "/favorite")
  }, {
    favorite: fav
  });
}

function GetCart() {
  return (0, _Network.Get)({
    path: "cart?with=addons.price,excludes,choices.difference,menu_item.images"
  });
}

function AddToCart(_ref8) {
  var menuItemId = _ref8.menuItemId,
      choices = _ref8.choices,
      excludes = _ref8.excludes,
      addons = _ref8.addons;
  return (0, _Network.Post)({
    path: "menu/item/".concat(menuItemId, "/cart/add")
  }, {
    choices: choices,
    excludes: excludes,
    addons: addons
  });
}

function RemoveOrderitem(_ref9) {
  var orderItemId = _ref9.orderItemId;
  return (0, _Network.Post)({
    path: "order/item/".concat(orderItemId, "/delete")
  });
}

function Order(_ref10) {
  var _ref10$orderType = _ref10.orderType,
      orderType = _ref10$orderType === void 0 ? 'DINE_IN' : _ref10$orderType;
  return (0, _Network.Post)({
    path: 'order'
  }, {
    type: orderType
  });
}

function GetBill() {
  return (0, _Network.Get)({
    path: 'bill?with=addons,choices,excludes,menu_item.images'
  });
}

function GetReceipt() {
  return (0, _Network.Get)({
    path: 'receipt/latest?with=seat.bill.items.order_item.menu_item.images'
  });
}

function GetSeats() {
  return (0, _Network.Get)({
    path: 'seat/list?with=addons,choices,excludes,menu_item.images'
  });
}

function SplitMultiple(_ref11) {
  var orderItems = _ref11.orderItems,
      withIds = _ref11.withIds;
  return (0, _Network.Post)({
    path: "bill/split"
  }, {
    order_items: orderItems,
    with: withIds
  });
}

function TransferBill(_ref12) {
  var itemId = _ref12.itemId,
      userId = _ref12.userId;
  return (0, _Network.Post)({
    path: "order/item/".concat(itemId, "/split")
  }, {
    to: userId
  });
}

function InitiateTransaction(_ref13) {
  var type = _ref13.type,
      gratuity = _ref13.gratuity;
  return (0, _Network.Post)({
    path: "transaction/initiate"
  }, {
    type: type,
    gratuity: gratuity
  });
}

function CallService(_ref14) {
  var serviceId = _ref14.serviceId;
  return (0, _Network.Post)({
    path: "service/".concat(serviceId, "/call")
  });
}

function GetServiceimages() {
  return (0, _Network.Get)({
    path: "service/images?limit=100"
  });
}

function ChangeCategory(_ref15) {
  var restaurantId = _ref15.restaurantId,
      category = _ref15.category;
  return (0, _Network.Post)({
    path: "restaurant/".concat(restaurantId)
  }, {
    type: category
  });
}

function ChangeName(_ref16) {
  var name = _ref16.name,
      restaurantId = _ref16.restaurantId;
  return (0, _Network.Post)({
    path: "restaurant/".concat(restaurantId)
  }, {
    name: name
  });
}

function ChangeContact(_ref17) {
  var phone = _ref17.phone,
      email = _ref17.email,
      website = _ref17.website,
      restaurantId = _ref17.restaurantId;
  return (0, _Network.Post)({
    path: "restaurant/".concat(restaurantId)
  }, {
    contact: {
      phone: phone,
      email: email,
      website: website
    }
  });
}

function ChangeBank(_ref18) {
  var bank_name = _ref18.bank_name,
      beneficiary_name = _ref18.beneficiary_name,
      iban = _ref18.iban,
      bic = _ref18.bic,
      restaurantId = _ref18.restaurantId;
  return (0, _Network.Post)({
    path: "restaurant/".concat(restaurantId, "/payout")
  }, {
    bank_name: bank_name,
    beneficiary_name: beneficiary_name,
    iban: iban,
    bic: bic
  });
}

function ChangeAddress(payload) {
  var restaurantId = payload.restaurantId;
  delete payload.restaurantId;
  return (0, _Network.Post)({
    path: "restaurant/".concat(restaurantId)
  }, {
    address: {
      business: _objectSpread({}, payload)
    }
  });
}

function ChangeSocial(_ref19) {
  var facebook = _ref19.facebook,
      instagram = _ref19.instagram,
      restaurantId = _ref19.restaurantId;
  return (0, _Network.Post)({
    path: "restaurant/".concat(restaurantId)
  }, {
    social: {
      facebook: facebook,
      instagram: instagram
    }
  });
}

function ChangeLocation(_ref20) {
  var longitude = _ref20.longitude,
      latitude = _ref20.latitude,
      restaurantId = _ref20.restaurantId;
  return (0, _Network.Post)({
    path: "restaurant/".concat(restaurantId)
  }, {
    longitude: longitude,
    latitude: latitude
  });
}

function ChangeHours(payload) {
  var restaurantId = payload.restaurantId;
  delete payload['restaurantId'];
  var openHours = payload;
  return (0, _Network.Post)({
    path: "restaurant/".concat(restaurantId)
  }, {
    open_hours: openHours
  });
} //export function AddTablet({ restaurantId, login_id, pass_enc, name }) {
//  return Post({ path: `restaurant/${restaurantId}/shop` }, { login_id, pass_enc, name })
//}


function CreateWaiterboard(_ref21) {
  var restaurantId = _ref21.restaurantId,
      name = _ref21.name;
  return (0, _Network.Post)({
    path: "restaurant/".concat(restaurantId, "/waiterboard/add")
  }, {
    name: name
  });
}

function RemoveWaiterboard(_ref22) {
  var id = _ref22.id;
  return (0, _Network.Post)({
    path: "waiterboard/".concat(id, "/delete")
  }, {
    id: id
  });
}

function CreateTable(_ref23) {
  var number = _ref23.number,
      capacity = _ref23.capacity,
      waiterboardId = _ref23.waiterboardId,
      x = _ref23.x,
      y = _ref23.y;
  return (0, _Network.Post)({
    path: "waiterboard/".concat(waiterboardId, "/table/add")
  }, {
    number: number,
    capacity: capacity,
    x: x,
    y: y
  });
}

function ChangeTable(_ref24) {
  var id = _ref24.id,
      x = _ref24.x,
      y = _ref24.y;
  return (0, _Network.Post)({
    path: "table/".concat(id)
  }, {
    x: x,
    y: y
  });
}

function RemoveTable(_ref25) {
  var id = _ref25.id;
  return (0, _Network.Post)({
    path: "table/".concat(id, "/delete")
  });
} // export function GetBills({ from, to }) {
//   return Post({ path: `api/v2/restaurant/billing`, v2: true }, { from, to });
// }


function GetCategories(_ref26) {
  var restaurantId = _ref26.restaurantId;
  return (0, _Network.Get)({
    path: "restaurant/".concat(restaurantId, "/categories")
  });
}

function CreateMenucategory(_ref27) {
  var restaurantId = _ref27.restaurantId,
      name = _ref27.name,
      precedence = _ref27.precedence;
  return (0, _Network.Post)({
    path: "restaurant/".concat(restaurantId, "/menu/category/add")
  }, {
    name: name,
    precedence: precedence
  });
}

function ChangeMenucategory(payload) {
  var id = payload.id;
  delete payload.restaurantId;
  delete payload.id;
  return (0, _Network.Post)({
    path: "menu/category/".concat(id)
  }, payload);
}

function RemoveMenucategory(_ref28) {
  var id = _ref28.id;
  return (0, _Network.Post)({
    path: "menu/category/".concat(id, "/delete")
  });
}

function CreateMenuitem(_ref29) {
  var name = _ref29.name,
      precedence = _ref29.precedence,
      categoryId = _ref29.categoryId;
  return (0, _Network.Post)({
    path: "menu/category/".concat(categoryId, "/item/add")
  }, {
    name: name,
    precedence: precedence,
    price: {
      amount: 2,
      currency: 'KWD'
    }
  });
}

function ChangeMenuitem(payload) {
  var id = payload.id;
  var updObj = payload;
  delete updObj.id; //updObj = R.filter(R.identity)(updObj);

  return (0, _Network.Post)({
    path: "menu/item/".concat(id)
  }, updObj);
}

function RemoveMenuitem(_ref30) {
  var id = _ref30.id;
  return (0, _Network.Post)({
    path: "menu/item/".concat(id, "/delete")
  });
}

function CreateService(_ref31) {
  var restaurantId = _ref31.restaurantId,
      name = _ref31.name,
      imageId = _ref31.imageId,
      type = _ref31.type;
  return (0, _Network.Post)({
    path: "restaurant/".concat(restaurantId, "/service/add")
  }, {
    name: name,
    image_id: imageId,
    type: type
  });
}

function RemoveService(_ref32) {
  var id = _ref32.id;
  return (0, _Network.Post)({
    path: "service/".concat(id, "/delete")
  });
}

function ChangeNutrition(_ref33) {
  var foodId = _ref33.foodId,
      total = _ref33.total,
      proteins = _ref33.proteins,
      fats = _ref33.fats,
      carbs = _ref33.carbs;
  return (0, _Network.Post)({
    path: "menu/item/".concat(foodId)
  }, {
    calories: {
      total: total,
      proteins: proteins,
      fats: fats,
      carbs: carbs
    }
  });
}

function ToggleCategory(_ref34) {
  var categoryId = _ref34.categoryId,
      enabled = _ref34.enabled;
  return (0, _Network.Post)({
    path: "menu/category/".concat(categoryId)
  }, {
    published: enabled
  });
}

function ToggleFood(_ref35) {
  var foodId = _ref35.foodId,
      enabled = _ref35.enabled;
  return (0, _Network.Post)({
    path: "menu/item/".concat(foodId)
  }, {
    published: enabled
  });
}

function GetAddons(_ref36) {
  var restaurantId = _ref36.restaurantId;
  return (0, _Network.Get)({
    path: "restaurant/".concat(restaurantId, "/addons")
  });
}

function CreateAddon(_ref37) {
  var restaurantId = _ref37.restaurantId,
      name = _ref37.name,
      price = _ref37.price;
  return (0, _Network.Post)({
    path: "restaurant/".concat(restaurantId, "/menu/addon/add")
  }, {
    name: name,
    price: {
      amount: price,
      currency: 'KWD'
    }
  });
}

function RemoveAddon(_ref38) {
  var id = _ref38.id;
  return (0, _Network.Post)({
    path: "menu/addon/".concat(id, "/delete")
  });
}

function CreateIngredient(_ref39) {
  var restaurantId = _ref39.restaurantId,
      name = _ref39.name;
  return (0, _Network.Post)({
    path: "restaurant/".concat(restaurantId, "/menu/ingredient/add")
  }, {
    name: name
  });
}

function ChangeIngredient(payload) {
  var id = payload.id;
  delete payload.id;
  return (0, _Network.Post)({
    path: "menu/ingredient/".concat(id)
  }, payload);
}

function RemoveIngredient(_ref40) {
  var id = _ref40.id;
  return (0, _Network.Post)({
    path: "menu/ingredient/".concat(id, "/delete")
  });
}

function CreateOption(_ref41) {
  var restaurantId = _ref41.restaurantId,
      name = _ref41.name;
  return (0, _Network.Post)({
    path: "restaurant/".concat(restaurantId, "/menu/option/add")
  }, {
    name: name
  });
}

function RemoveOption(_ref42) {
  var id = _ref42.id;
  return (0, _Network.Post)({
    path: "menu/option/".concat(id, "/delete")
  });
}

function CreateChoice(_ref43) {
  var name = _ref43.name,
      price = _ref43.price,
      optionId = _ref43.optionId;
  return (0, _Network.Post)({
    path: "menu/option/".concat(optionId, "/choice/add")
  }, {
    name: name,
    difference: {
      amount: price,
      currency: "KWD"
    }
  });
}

function RemoveChoice(_ref44) {
  var id = _ref44.id;
  return (0, _Network.Post)({
    path: "menu/choice/".concat(id, "/delete")
  });
}

function ChangeItemimage(_ref45) {
  var file = _ref45.file,
      id = _ref45.id;
  return PostMultipart({
    path: "menu/item/".concat(id, "/image/upload")
  }, {
    image: file
  });
}

function ChangeImage(_ref46) {
  var file = _ref46.file,
      restaurantId = _ref46.restaurantId;
  return PostMultipart({
    path: "restaurant/".concat(restaurantId, "/image/upload")
  }, {
    image: file
  });
}

function EditImage(_ref47) {
  var id = _ref47.id,
      precedence = _ref47.precedence,
      published = _ref47.published;
  return (0, _Network.Post)({
    path: "image/".concat(id)
  }, {
    precedence: precedence,
    published: published
  });
}

function ChangeFoodingredient(_ref48) {
  var foodId = _ref48.foodId,
      ingredients = _ref48.ingredients;
  return (0, _Network.Post)({
    path: "menu/item/".concat(foodId)
  }, {
    ingredients: ingredients
  });
}

function GetTranslations() {
  var _ref49 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      locale = _ref49.locale,
      restaurantId = _ref49.restaurantId;

  if (locale) return (0, _Network.Get)({
    path: "restaurant/".concat(restaurantId, "/translation/list/").concat(locale)
  });
  return (0, _Network.Get)({
    path: "restaurant/".concat(restaurantId, "/translation/list")
  });
}

function AddTranslation(_ref50) {
  var type = _ref50.type,
      id = _ref50.id,
      locale = _ref50.locale,
      name = _ref50.name,
      description = _ref50.description,
      restaurantId = _ref50.restaurantId;
  var body = {
    type: type,
    id: id,
    locale: locale,
    name: name
  };
  if (description) body.description = description;
  return (0, _Network.Post)({
    path: "restaurant/".concat(restaurantId, "/translation/add")
  }, body);
}

function RmTranslation(_ref51) {
  var type = _ref51.type,
      id = _ref51.id,
      locale = _ref51.locale,
      restaurantId = _ref51.restaurantId;
  return (0, _Network.Post)({
    path: "restaurant/".concat(restaurantId, "/translation/remove")
  }, {
    type: type,
    id: id,
    locale: locale
  });
}

function Notify(_ref52) {
  var sendTo = _ref52.sendTo,
      type = _ref52.type,
      payload = _ref52.payload;
  return (0, _Network.Post)({
    endpoint: 'https://ws.dinify.app/',
    path: "notify"
  }, {
    sendTo: sendTo,
    type: type,
    payload: payload
  });
}

function GetLoggedrestaurant(_ref53) {
  var restaurantId = _ref53.restaurantId;
  return (0, _Network.Get)({
    path: "restaurant/".concat(restaurantId, "/all?with=images,services.image,waiterboards.tables,categories.items.images,categories.items.addons,categories.items.ingredients,categories.items.options,addons.price,ingredients,options.choices")
  });
}

function GetTables(_ref54) {
  var waiterboardId = _ref54.waiterboardId;
  return (0, _Network.Get)({
    path: "waiterboard/".concat(waiterboardId, "/tables")
  });
}

function GetSeatsOfWB(_ref55) {
  var waiterboardId = _ref55.waiterboardId;
  return (0, _Network.Get)({
    path: "waiterboard/".concat(waiterboardId, "/seats/all")
  });
}

function CheckOut(_ref56) {
  var tableId = _ref56.tableId;
  return (0, _Network.Post)({
    path: "table/".concat(tableId, "/checkout")
  });
}

function CheckOutUser(_ref57) {
  var userId = _ref57.userId;
  return (0, _Network.Post)({
    path: "checkout/user/".concat(userId)
  });
}

function GetBookings() {
  return (0, _Network.Get)({
    path: "restaurant/my/bookings"
  });
}

function ConfirmBooking(_ref58) {
  var id = _ref58.id;
  return (0, _Network.Post)({
    path: "booking/".concat(id, "/confirm")
  });
}

function CancelBooking(_ref59) {
  var id = _ref59.id;
  return (0, _Network.Post)({
    path: "booking/".concat(id, "/cancel")
  }, {
    reason: 'No seats at given time'
  });
}

function GetGuests(_ref60) {
  var waiterboardId = _ref60.waiterboardId;
  return (0, _Network.Get)({
    path: "waiterboard/".concat(waiterboardId, "/guests")
  });
}

function GetCalls(_ref61) {
  var waiterboardId = _ref61.waiterboardId;
  return (0, _Network.Get)({
    path: "waiterboard/".concat(waiterboardId, "/calls?with=service.image")
  });
}

function ConfirmCall(_ref62) {
  var callId = _ref62.callId;
  return (0, _Network.Post)({
    path: "service/call/".concat(callId, "/confirm")
  });
}

function GetOrders(_ref63) {
  var waiterboardId = _ref63.waiterboardId;
  return (0, _Network.Get)({
    path: "waiterboard/".concat(waiterboardId, "/orders/today?with=items.choices,items.addons,items.excludes")
  });
}

function ConfirmOrder(_ref64) {
  var orderId = _ref64.orderId;
  return (0, _Network.Post)({
    path: "order/".concat(orderId, "/confirm")
  });
}

function GetBills(_ref65) {
  var waiterboardId = _ref65.waiterboardId;
  return (0, _Network.Get)({
    path: "waiterboard/".concat(waiterboardId, "/transactions?with=orders")
  });
}

function GetTodaybills(_ref66) {
  var waiterboardId = _ref66.waiterboardId;
  return (0, _Network.Get)({
    path: "waiterboard/".concat(waiterboardId, "/transactions/all?limit=100")
  });
}

function ConfirmBill(_ref67) {
  var billId = _ref67.billId,
      approvalNumber = _ref67.approvalNumber;
  return (0, _Network.Post)({
    path: "transaction/".concat(billId, "/process")
  }, {
    approvalNumber: approvalNumber
  });
}

function GetManagedrestaurants() {
  return (0, _Network.Get)({
    path: 'managed?with=images'
  });
}