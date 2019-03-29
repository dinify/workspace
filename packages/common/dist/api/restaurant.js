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
  var category = _ref15.category;
  return (0, _Network.Post)({
    path: "restaurant/my"
  }, {
    type: category
  });
}

function ChangeName(_ref16) {
  var name = _ref16.name;
  return (0, _Network.Post)({
    path: "restaurant/my"
  }, {
    name: name
  });
}

function ChangeContact(_ref17) {
  var phone = _ref17.phone,
      email = _ref17.email,
      website = _ref17.website;
  return (0, _Network.Post)({
    path: "restaurant/my"
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
      bic = _ref18.bic;
  return (0, _Network.Post)({
    path: "restaurant/my/payout"
  }, {
    bank_name: bank_name,
    beneficiary_name: beneficiary_name,
    iban: iban,
    bic: bic
  });
}

function ChangeAddress(payload) {
  delete payload.restaurantId;
  return (0, _Network.Post)({
    path: "restaurant/my"
  }, {
    address: {
      business: _objectSpread({}, payload)
    }
  });
}

function ChangeSocial(_ref19) {
  var facebook = _ref19.facebook,
      instagram = _ref19.instagram;
  return (0, _Network.Post)({
    path: "restaurant/my"
  }, {
    social: {
      facebook: facebook,
      instagram: instagram
    }
  });
}

function ChangeLocation(_ref20) {
  var longitude = _ref20.longitude,
      latitude = _ref20.latitude;
  return (0, _Network.Post)({
    path: "restaurant/my"
  }, {
    longitude: longitude,
    latitude: latitude
  });
}

function ChangeHours(payload) {
  delete payload['restaurantId'];
  var openHours = payload;
  return (0, _Network.Post)({
    path: "restaurant/my"
  }, {
    open_hours: openHours
  });
} //export function AddTablet({ restaurantId, login_id, pass_enc, name }) {
//  return Post({ path: `restaurant/${restaurantId}/shop` }, { login_id, pass_enc, name })
//}


function CreateWaiterboard(_ref21) {
  var name = _ref21.name;
  return (0, _Network.Post)({
    path: "waiterboard/create"
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


function GetCategories() {
  return (0, _Network.Get)({
    path: "restaurant/my/categories"
  });
}

function CreateMenucategory(_ref26) {
  var name = _ref26.name,
      precedence = _ref26.precedence;
  return (0, _Network.Post)({
    path: "menu/category/create"
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

function RemoveMenucategory(_ref27) {
  var id = _ref27.id;
  return (0, _Network.Post)({
    path: "menu/category/".concat(id, "/delete")
  });
}

function CreateMenuitem(_ref28) {
  var name = _ref28.name,
      precedence = _ref28.precedence,
      categoryId = _ref28.categoryId;
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

function RemoveMenuitem(_ref29) {
  var id = _ref29.id;
  return (0, _Network.Post)({
    path: "menu/item/".concat(id, "/delete")
  });
}

function CreateService(_ref30) {
  var name = _ref30.name,
      imageId = _ref30.imageId,
      type = _ref30.type;
  return (0, _Network.Post)({
    path: "service/create"
  }, {
    name: name,
    image_id: imageId,
    type: type
  });
}

function RemoveService(_ref31) {
  var id = _ref31.id;
  return (0, _Network.Post)({
    path: "service/".concat(id, "/delete")
  });
}

function ChangeNutrition(_ref32) {
  var foodId = _ref32.foodId,
      total = _ref32.total,
      proteins = _ref32.proteins,
      fats = _ref32.fats,
      carbs = _ref32.carbs;
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

function ToggleCategory(_ref33) {
  var categoryId = _ref33.categoryId,
      enabled = _ref33.enabled;
  return (0, _Network.Post)({
    path: "menu/category/".concat(categoryId)
  }, {
    published: enabled
  });
}

function ToggleFood(_ref34) {
  var foodId = _ref34.foodId,
      enabled = _ref34.enabled;
  return (0, _Network.Post)({
    path: "menu/item/".concat(foodId)
  }, {
    published: enabled
  });
}

function GetAddons() {
  return (0, _Network.Get)({
    path: "restaurant/my/addons"
  });
}

function CreateAddon(_ref35) {
  var name = _ref35.name,
      price = _ref35.price;
  return (0, _Network.Post)({
    path: "menu/addon/create"
  }, {
    name: name,
    price: {
      amount: price,
      currency: 'KWD'
    }
  });
}

function RemoveAddon(_ref36) {
  var id = _ref36.id;
  return (0, _Network.Post)({
    path: "menu/addon/".concat(id, "/delete")
  });
}

function CreateIngredient(_ref37) {
  var name = _ref37.name;
  return (0, _Network.Post)({
    path: "menu/ingredient/create"
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

function RemoveIngredient(_ref38) {
  var id = _ref38.id;
  return (0, _Network.Post)({
    path: "menu/ingredient/".concat(id, "/delete")
  });
}

function CreateOption(_ref39) {
  var name = _ref39.name;
  return (0, _Network.Post)({
    path: "menu/option/create"
  }, {
    name: name
  });
}

function RemoveOption(_ref40) {
  var id = _ref40.id;
  return (0, _Network.Post)({
    path: "menu/option/".concat(id, "/delete")
  });
}

function CreateChoice(_ref41) {
  var name = _ref41.name,
      price = _ref41.price,
      optionId = _ref41.optionId;
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

function RemoveChoice(_ref42) {
  var id = _ref42.id;
  return (0, _Network.Post)({
    path: "menu/choice/".concat(id, "/delete")
  });
}

function ChangeItemimage(_ref43) {
  var file = _ref43.file,
      id = _ref43.id;
  return PostMultipart({
    path: "menu/item/".concat(id, "/image/upload")
  }, {
    image: file
  });
}

function ChangeImage(_ref44) {
  var file = _ref44.file;
  return PostMultipart({
    path: "restaurant/my/image/upload"
  }, {
    image: file
  });
}

function EditImage(_ref45) {
  var id = _ref45.id,
      precedence = _ref45.precedence,
      published = _ref45.published;
  return (0, _Network.Post)({
    path: "image/".concat(id)
  }, {
    precedence: precedence,
    published: published
  });
}

function ChangeFoodingredient(_ref46) {
  var foodId = _ref46.foodId,
      ingredients = _ref46.ingredients;
  return (0, _Network.Post)({
    path: "menu/item/".concat(foodId)
  }, {
    ingredients: ingredients
  });
}

function GetTranslations() {
  var _ref47 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      locale = _ref47.locale;

  if (locale) return (0, _Network.Get)({
    path: "translation/list/".concat(locale)
  });
  return (0, _Network.Get)({
    path: 'translation/list'
  });
}

function AddTranslation(_ref48) {
  var type = _ref48.type,
      id = _ref48.id,
      locale = _ref48.locale,
      name = _ref48.name,
      description = _ref48.description;
  var body = {
    type: type,
    id: id,
    locale: locale,
    name: name
  };
  if (description) body.description = description;
  return (0, _Network.Post)({
    path: 'translation/add'
  }, body);
}

function RmTranslation(_ref49) {
  var type = _ref49.type,
      id = _ref49.id,
      locale = _ref49.locale;
  return (0, _Network.Post)({
    path: 'translation/remove'
  }, {
    type: type,
    id: id,
    locale: locale
  });
}