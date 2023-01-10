const userModel = require('../models/user-model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')


module.exports = class userServices{
    async createUser(data) {
        const newUser = new userModel(data);
        return await newUser.save();
    }
    async findUserByEmail(email) {
        return await userModel.findOne({email:email})
    }
    async bcryptPassword(password) {
        const salt =await bcrypt.genSalt(10);
        return await bcrypt.hash(password,salt)
    }
    async comparePassword(password1, password2) {
      return await bcrypt.compare(password1,password2)
    }
    async createJWTTocken(id) {
        return await jwt.sign({ id }, process.env.JWT_SECRET, {
            expiresIn:"1d"
        })
    }
} 