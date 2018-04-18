import { Get, Post, Put } from './Network'


export function Login({ email, password }) {
  return Post({
    path: 'user/login', noToken: true, v3: true
  }, {
    email, password
  })
}

export function GetLoggedRestaurant() {
  return Get({ path: `restaurant/my/all`, v3: true })
}

export function GetTables({waiterboardId}) {
  return Get({ v3: true, path: `waiterboard/${waiterboardId}/tables` })
}

export function CheckOut({ tableId }) {
  return Post({ v3: true, path: `table/${tableId}/checkout` })
}

export function CheckOutUser({ userId }) {
  return Post({ v3: true, path: `guest/${userId}/checkout` })
}

export function GetBookings() {
  return Get({ v3: true, path: `restaurant/my/bookings` })
}

export function GetBookingsAccepted() {
  return Get({ path: `api/v2/waiterboard/bookings_accepted` })
}

export function GetGuests({ waiterboardId }) {
  return Get({ v3: true, path: `waiterboard/${waiterboardId}/guests` })
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

export function GetOrders({waiterboardId}) {
  return Get({ v3: true, path: `waiterboard/${waiterboardId}/orders?processed=false` })
}

export function ConfirmOrder({ orderId }) {
  return Post({ v3: true, path: `/order/${orderId}/confirm` })
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
