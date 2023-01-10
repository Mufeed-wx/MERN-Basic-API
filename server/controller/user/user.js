const bcrypt = require('bcryptjs')
const userModel = require('../../models/user-model')
const jwt = require('jsonwebtoken')
const authMiddleware = require('../../middlewares/authMiddleware')
const userController = require('../../controller/user/user')
const userServices = require('../../services/user')
const userService = new userServices();


module.exports = {
    userRegistration: async (req, res, next) => {
        try {
            const userExist = await userService.findUserByEmail(req.body.email)
            if (userExist) {
                return res.status(200).send({ message: 'User already exist', success: false })
            }
            req.body.password = await userService.bcryptPassword(req.body.password)
            const result = await userService.createUser(req.body)
            res.status(200).send({ message: 'User created successfully', success: true })
        } catch (error) {
            console.log(error);
            res.status(500).send({ message: 'User creating user', success: false })
        }
    },
    login: async (req, res, next) => {
        try {
            const user = await userService.findUserByEmail(req.body.email);
            if (!user) {
                return res.status(200).send({ message: 'User does not exist', success: false })
            }
            const isMatch = await userService.comparePassword(req.body.password, user.password);
            if (!isMatch) {
                return res.status(200).send({ message: 'Password is incorrect', success: false })
            } else {
                const token = await userService.createJWTTocken(user._id)
                return res.status(200).send({ message: 'Login Successful', success: true, data: token })
            }
        } catch (error) {
            console.log(error);
            return res.status(500).send({ message: 'error Logg In', success: false, error })
        }
    },
    getAllUsersInfoById: async (req, res, next) => {
        try {
            const user = await userModel.findOne({ _id: req.body.userId })
            user.password = ''
            if (!user) {
                return res.status(200).send({ message: "User does not exist", success: false })
            } else {
                return res.status(200).send({
                    success: true, data: user
                })
            }
        } catch (error) {
            console.log(error);
            return res.status(500).send({ message: "Error getting user info", success: false, error })
        }
    }
}   