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
exports.SplitBill = SplitBill;
exports.TransferBill = TransferBill;
exports.InitiateTransaction = InitiateTransaction;
exports.CallService = CallService;

var _Network = require("./Network");

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
    path: "restaurant/".concat(subdomain, "/categories?with=").concat(populateCategoriesWith)
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
    path: "status?with=table,restaurant"
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

function SplitBill(_ref11) {
  var itemId = _ref11.itemId,
      userIds = _ref11.userIds;
  return (0, _Network.Post)({
    path: "order/item/".concat(itemId, "/split")
  }, {
    with: userIds
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