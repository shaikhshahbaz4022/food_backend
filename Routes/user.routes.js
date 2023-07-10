const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { userModel } = require('../Models/user.model');
require("dotenv").config()
const userRouter = express.Router()

userRouter.post("/register", async (req, res) => {
    try {
        const { name, email, password, address } = req.body

        const isuserAlready = await userModel.findOne({ email })
        if (isuserAlready) {
            return res.status(404).send({ msg: "User Is Alreaqdy Present" })
        }
        bcrypt.hash(password, 5, async function (err, hash) {

            const data = new userModel({ name, email, password: hash, address })
            await data.save()
        });
        res.status(200).send({ msg: "Registration Succesfull" })
    } catch (error) {
        res.status(404).send({ msg: error.message })
    }
})
userRouter.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body

        const IsUserPresent = await userModel.findOne({ email })
        if (!IsUserPresent) {
            return res.status(404).send({ msg: "user Is Not Present , register first" })
        }
        bcrypt.compare(password, IsUserPresent.password, function (err, result) {
            if (result) {
                const generateToken = jwt.sign({ userID: IsUserPresent._id }, "secret", { expiresIn: "7hr" });
                res.status(200).send({ msg: "Login Succesfull", token: generateToken, user: IsUserPresent })
            } else {
                return res.status(404).send({ msg: "wrong Input" })
            }
        });

    } catch (error) {
        res.status(404).send({ msg: error.message })

    }
})

userRouter.patch("/user/:id/reset", async (req, res) => {
    try {
        const { id } = req.params
        const { latestpass, newpass } = req.body
        const user = await userModel.findOne({ _id: id })
        bcrypt.compare(latestpass, user.password, async function (err, result) {
            if (result) {
                const hash = bcrypt.hashSync(newpass, 5);
                const updatepass = await userModel.findByIdAndUpdate({ _id: id }, { password: hash })
                res.status(202).send({ msg: "password Reset Successfully" })

            } else {
                return res.status(404).send({ msg: "wrong Input" })

            }
        });


    } catch (error) {
        res.status(404).send({ msg: error.message })

    }
})

module.exports = { userRouter }