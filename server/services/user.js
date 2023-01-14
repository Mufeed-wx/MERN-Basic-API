const userModel = require('../models/user-model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const refreshTokenModel = require('../models/token-model')

module.exports = class userServices {
    async createUser(data) {
        const newUser = new userModel(data);
        return await newUser.save();
    }
    async findUserByEmail(email) {
        return await userModel.findOne({ email: email })
    }
    async bcryptPassword(password) {
        const salt = await bcrypt.genSalt(10);
        return await bcrypt.hash(password, salt)
    }
    async comparePassword(password1, password2) {
        return await bcrypt.compare(password1, password2)
    }
    async generateAccessToken(id) {
        return await jwt.sign({ userId: id }, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: "1d"
        })
    }
    async generateRefreshToken(id) {
        return await jwt.sign({ userId: id }, process.env.REFRESH_TOKEN_SECRET)
    }
    async storeRefreshToken(refreshToken, id) {
        const find_token = await refreshTokenModel.findOne({ user: id });
        if (!find_token) {
            const tokenModel = new refreshTokenModel({
                token: refreshToken,
                user: id
            })
            await tokenModel.save();
            return true
        } else {
            let new_token = await refreshTokenModel.findOneAndUpdate({ user: id }, { token: refreshToken }, { new: true })
            return true;
        }

    }
} 