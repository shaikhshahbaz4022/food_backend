const express = require('express');
const { userModel } = require('../Models/user.model');
const { OrderModel } = require('../Models/Order.model');
const orderRouter = express.Router()

orderRouter.post("/orders", async (req, res) => {
    try {
        const neworder = new OrderModel(req.body)
        await neworder.save()
        res.status(201).send({ msg: "Order Placed Succesfully", order: neworder })
    } catch (error) {
        res.status(404).send({ msg: error.message })

    }
})
orderRouter.get("/orders/:id", async (req, res) => {
    try {
        const { id } = req.params
        const orderpresent = await OrderModel.findById({ _id: id }).populate("user").populate("restaurant")
        if (!orderpresent) {
            return res.status(404).send({ msg: "Order Is Not Present" })
        }

        res.status(201).send(orderpresent)
    } catch (error) {
        res.status(404).send({ msg: error.message })

    }
})
orderRouter.patch("/orders/:id", async (req, res) => {
    try {
        const { status } = req.body
        const { id } = req.params
        const orderpresent = await OrderModel.findByIdAndUpdate({ _id: id }, status)
        if (!orderpresent) {
            return res.status(404).send({ msg: "Order Is Not Present" })
        }

        res.status(201).send({ msg: "Order Updated Succesfully" })
    } catch (error) {
        res.status(404).send({ msg: error.message })

    }
})
module.exports = { orderRouter }