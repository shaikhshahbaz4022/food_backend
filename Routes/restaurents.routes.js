const express = require('express');
const { restaurantModel } = require('../Models/Restaurant.model');
const restaurantRouter = express.Router()

restaurantRouter.get("/restaurant", async (req, res) => {
    try {
        const allrest = await restaurantModel.find()
        res.status(200).send(allrest)
    } catch (error) {
        res.status(404).send({ msg: error.message })

    }
})

restaurantRouter.get("/restaurant/:id", async (req, res) => {
    try {
        const { id } = req.params
        const data = await restaurantModel.findById({ _id: id })
        res.status(200).send(data)

    } catch (error) {
        res.status(404).send({ msg: error.message })

    }
})
restaurantRouter.post("/add", async (req, res) => {


    try {
        const payload = req.body
        const newrest = new restaurantModel(payload)
        await newrest.save()
        res.status(200).send({ msg: "Restaurant added Succesfully" })

    } catch (error) {
        res.status(404).send({ msg: error.message })

    }
})

//menu returns
restaurantRouter.get("/restaurant/:id/menu", async (req, res) => {
    try {
        const { id } = req.params
        const rest = await restaurantModel.findById({ _id: id })
        if (!rest) {
            return res.status(404).send({ msg: "Restaurant not Found" })
        }
        let menu = rest.menu
        res.status(200).send(menu)
    } catch (error) {
        res.status(404).send({ msg: error.message })

    }
})
restaurantRouter.patch("/restaurant/:id/menu", async (req, res) => {
    try {
        const payload = req.body
        const { id } = req.params
        const updatearray = await restaurantModel.findByIdAndUpdate({ _id: id }, { $push: { menu: payload.menu } }, { new: true })
        res.status(201).send({ msg: "menu Updated SuccesFully" })

    } catch (error) {
        res.status(404).send({ msg: error.message })

    }
})
restaurantRouter.delete("/restaurant/:id/menu/:menuid", async (req, res) => {
    try {
        const { id, menuid } = req.params
        const rest = await restaurantModel.findById({ _id: id })
        if (!rest) {
            return res.status(404).send({ msg: "Restaurant Is Not present" })
        }
        const ind = rest.menu.findIndex((ele) => ele._id = menuid)
        if (ind == -1) {
            return res.status(404).send({ msg: "menu Not Found" })
        }
        rest.menu.splice(ind, 1)
        await res.save()
        res.status(202).send({ msg: "Menu Item Deleted Succesfully" })
    } catch (error) {
        res.status(404).send({ msg: error.message })

    }
})

module.exports = { restaurantRouter }