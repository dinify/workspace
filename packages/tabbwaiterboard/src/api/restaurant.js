import { Get, Post, Put, Delete } from './Network'


export function Login({ email, password }) {
  return Post({ path: 'api/v1/oauth2/authentication', noToken: true }, {
    username: email,
    password,
    grant_type: "password",
    client_id: "1",
    client_secret: "secretKey",
    scope: "shop"
  })
}
//
//export function Logout() {
//  return Delete({ path: 'restaurant/auth/restauration' })
//}
//
//export function Signup({ email, password, restaurantName, nameInCharge, mobile }) {
//  return Post({ path: 'restaurant/register', noToken: true }, {
//    email,
//    password,
//    name: restaurantName,
//    nameChargue: nameInCharge,
//    number: mobile,
//  })
//}
//
//export function GetRestaurant({ restaurantId }) {
//  return Get({ path: `restaurant/${restaurantId}` })
//}
//
export function GetLoggedWaiterboard() {
  return Get({ path: `api/v2/waiterboard/logged` })
}

export function GetTables() {
  return Get({ path: `api/v2/waiterboard/tables` })
}

export function CheckOut({ tableId }) {
  return Delete({ path: `api/v2/waiterboard/checkout/${tableId}` })
}

export function CheckOutUser({ userId }) {
  return Delete({ path: `api/v2/waiterboard/checkout_user/${userId}` })
}

export function GetBookings() {
  return Get({ path: `api/v2/waiterboard/bookings` })
}

export function GetBookingsAccepted() {
  return Get({ path: `api/v2/waiterboard/bookings_accepted` })
}

export function GetGuests() {
  return Get({ path: `api/v2/waiterboard/guests` })
}

export function ConfirmBooking({ bookingId }) {
  return Post({ path: `api/v2/waiterboard/booking/${bookingId}/confirm` })
}

export function GetServices() {
  return Get({ path: `api/v2/waiterboard/service_calls` })
}

export function ConfirmService({ serviceId }) {
  return Post({ path: `api/v2/waiterboard/service_call/${serviceId}/confirm` })
}

export function GetOrders() {
  return Get({ path: `api/v2/waiterboard/orders` })
}

export function ConfirmOrder({ orderId }) {
  return Post({ path: `api/v2/waiterboard/order/${orderId}/confirm` })
}
export function ConfirmOrderahead({ orderId }) {
  return Post({ path: `api/v2/waiterboard/orderahead/${orderId}/confirm` })
}

//export function GetOrdersAhead({ shopId }) {
//  return Get({ path: `shop/${shopId}/orders_ahead/active` })
//}
//
//export function ConfirmOrderahead({ restaurantId, orderId }) {
//  return Post({ path: `shop/${restaurantId}/order_ahead/${orderId}/finish` })
//}

export function GetBills() {
  return Get({ path: `api/v2/waiterboard/bills` })
}

export function ConfirmBill({ billId, approvalNumber }) {
  return Post({ path: `api/v2/waiterboard/bill/${billId}/confirm`}, { approvalNumber })
}

export function GetSales() {
  return Get({ path: `api/v2/waiterboard/sales` })
}

export function GetTodayBillsOfTable({ tableId }) {
  return Get({ path: `api/v2/waiterboard/bills/table/${tableId}` })
}

export function GetBillsOfUserInRestaurant({ userId }) {
  return Get({ path: `api/v2/waiterboard/bills/user/${userId}` })
}

export function GetOrdersOfUserInRestaurant({ userId }) {
  return Get({ path: `api/v2/waiterboard/orders/user/${userId}` })
}

export function SetOrderAheadEnabled({ restaurantId, enabled }) {
  return Put({ path: `api/v2/restaurant/${restaurantId}/order_ahead_enabled`}, { enabled })
}

export function GetOrderAheadEnabled({ restaurantId }) {
  return Get({ path: `api/v2/restaurant/${restaurantId}/order_ahead_enabled`})
}
