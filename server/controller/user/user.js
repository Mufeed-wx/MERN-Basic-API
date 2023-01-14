const bcrypt = require('bcryptjs')
const userModel = require('../../models/user-model')
const jwt = require('jsonwebtoken')
const userServices = require('../../services/user')
const userService = new userServices();
const tokenModel = require('../../models/token-model')

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
            !user && res.status(200).send({ message: 'User does not exist', success: false })

            const isMatch = await userService.comparePassword(req.body.password, user.password);
            !isMatch && res.status(200).send({ message: 'Password is incorrect', success: false })

            const accessToken = await userService.generateAccessToken(user._id)
            const refreshToken = await userService.generateRefreshToken(user._id)
            console.log(refreshToken);
            const storeToken = await userService.storeRefreshToken(refreshToken,user._id)

            return res.status(200).send({ message: 'Login Successful', success: true, accessToken: accessToken, refreshToken: refreshToken })

        } catch (error) {
            console.log(error);
            return res.status(500).send({ message: 'error Logg In', success: false, error })
        }
    },
    getAllUsersInfoById: async (req, res, next) => {
        try {
            const user = await userModel.findOne({ _id: req.body.userId })
           
            if (!user) {
                return res.status(200).send({ message: "User does not exist", success: false })
            } else {
                user.password = ''
                return res.status(200).send({
                    success: true, data: user
                })
            }
        } catch (error) {
            console.log(error);
            return res.status(500).send({ message: "Error getting user info", success: false, error })
        }
    },
    refreshToken: async (req, res) => {
        const refresh_token = req.body.token;
        if (refresh_token == null) res.send(401).json('token null')
        
        const decode = await jwt.verify(refresh_token, process.env.REFRESH_TOKEN_SECRET)
        !decode && res.status(403).json('invalid token')

        const user_id = decode.userId
        const find_token = await tokenModel.findOne({ token: refresh_token })
        !find_token && res.status(403).json("invalid token")

        const accessToken =await userService.generateAccessToken(user_id)
        const refreshToken =await userService.generateAccessToken(user_id)
        const storeToken = userService.storeRefreshToken(refreshToken, user_id)
        
        return res.status(200).send({ message: 'token created successfully', success: true, accessToken: accessToken, refreshToken: refreshToken })
    }
}   