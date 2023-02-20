const express = require("express")
const { UserModel } = require("../Models/User.model")
const userRouter = express.Router()
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
userRouter.use(express.json())


userRouter.post("/register", async (req, res) => {
    const { name, email, password, gender, age, city } = req.body
    try {
        const flag = await UserModel.find({ email })
        // console.log(flag)
        if (flag.length>0) {
            res.send({ "msg": "User has already exist , Please Login" })
        } else {
            bcrypt.hash(password, 4, async (err, hash) => {
                if (err) {
                    res.send({ "msg": "error", "error": err.message })
                } else {
                    const user = new UserModel({ name, password: hash, email, gender, age, city })
                    await user.save()
                    res.send({ "msg": "User has been added", "user": user })
                }
            });
        }
    } catch (err) {
        res.send({ "msg": "error", "error": err.message })
    }
})

userRouter.post("/login", async (req, res) => {
    const { email, password } = req.body
    try {
        const user = await UserModel.find({ email })
        if (user.length > 0) {
            bcrypt.compare(password, user[0].password, async (err, result) => {
                if (err) {
                    res.send({ "msg": "error", "error": err.message })
                } else {
                    const token = jwt.sign({ userId: user[0]._id }, 'ujjwal');
                    res.send({ "msg": "User has been logined", "token": token })
                }
            });
        }
    } catch (err) {
        res.send({ "msg": "error", "error": err.message })
    }
})

module.exports = {
    userRouter
}