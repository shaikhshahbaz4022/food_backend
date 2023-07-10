const mongoose = require('mongoose');
const userobj = {
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    address: {
        street: String,
        city: String,
        state: String,
        country: String,
        zip: String
    }
}
const UserSchema = mongoose.Schema(userobj)
const userModel = mongoose.model("user", UserSchema)

module.exports = { userModel }