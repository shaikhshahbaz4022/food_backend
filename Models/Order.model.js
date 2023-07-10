const mongoose = require('mongoose');
const orderObj = {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
    restaurant: { type: mongoose.Schema.Types.ObjectId, ref: 'restaurant' },
    items: Array,
    totalPrice: Number,
    deliveryAddress: {
        street: String,
        city: String,
        state: String,
        country: String,
        zip: String
    },
    status: String // e.g, "placed", "preparing", "on the way", "delivered"
}
const OrderSchema = mongoose.Schema(orderObj)
const OrderModel = mongoose.model("order", OrderSchema)

module.exports = { OrderModel }