import { Get, Post, Put } from './Network'


export function Login({ email, password }) {
  return Post({
    path: 'user/login', noToken: true, v3: true
  }, {
    email, password
  })
}

export function Notify({ sendTo, type, payload }) {
  return Post({
    url: 'https://downstream.tabb.global/notify'
  }, {
    sendTo, type, payload
  })
}

export function GetLoggedRestaurant() {
  return Get({ path: `restaurant/my/all?with=images,services.image,waiterboards.tables,categories.items.images,categories.items.addons,categories.items.ingredients,categories.items.options,addons.price,ingredients,options.choices`, v3: true })
}

export function GetTables({ waiterboardId }) {
  return Get({ v3: true, path: `waiterboard/${waiterboardId}/tables` })
}

export function ChangeTable(payload) {
  const { id } = payload
  delete payload.id
  return Post({ v3: true, path: `table/${id}` }, payload)
}

export function GetSeats({ waiterboardId }) {
  return Get({ v3: true, path: `waiterboard/${waiterboardId}/seats/all` })
}

export function CheckOut({ tableId }) {
  return Post({ v3: true, path: `table/${tableId}/checkout` })
}

export function CheckOutUser({ userId }) {
  return Post({ v3: true, path: `checkout/user/${userId}` })
}

export function GetBookings() {
  return Get({ v3: true, path: `restaurant/my/bookings` })
}

export function ConfirmBooking({ id }) {
  return Post({ v3: true, path: `booking/${id}/confirm` })
}

export function CancelBooking({ id }) {
  return Post({ v3: true, path: `booking/${id}/cancel` }, { reason: 'No seats at given time' })
}

export function GetGuests({ waiterboardId }) {
  return Get({ v3: true, path: `waiterboard/${waiterboardId}/guests` })
}

export function GetCalls({ waiterboardId }) {
  return Get({ v3: true, path: `waiterboard/${waiterboardId}/calls?with=service.image` })
}

export function ConfirmCall({ callId }) {
  return Post({ v3: true, path: `service/call/${callId}/confirm` })
}

export function GetOrders({ waiterboardId }) {
  return Get({ v3: true, path: `waiterboard/${waiterboardId}/orders/today?with=items.choices,items.addons,items.excludes` })
}

export function ConfirmOrder({ orderId }) {
  return Post({ v3: true, path: `order/${orderId}/confirm` })
}

export function GetBills({ waiterboardId }) {
  return Get({ v3: true, path: `waiterboard/${waiterboardId}/transactions?with=orders` })
}

export function GetTodaybills({ waiterboardId }) {
  return Get({ v3: true, path: `waiterboard/${waiterboardId}/transactions/all?limit=100` })
}

export function ConfirmBill({ billId, approvalNumber }) {
  return Post({ v3: true, path: `transaction/${billId}/process`}, { approvalNumber })
}
