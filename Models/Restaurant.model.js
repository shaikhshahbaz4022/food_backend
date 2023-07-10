const mongoose = require('mongoose');
const resObj = {


    name: String,
    address: {
        street: String,
        city: String,
        state: String,
        country: String,
        zip: String
    },
    menu: Array

}
const restautentSchema = mongoose.Schema(resObj)
const restaurantModel = mongoose.model("restaurant", restautentSchema)

module.exports = { restaurantModel }