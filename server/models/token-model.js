const mongoose = require('mongoose')

const tokenSchema =new mongoose.Schema({
    token: String,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"user"
    }
}, {
    timestamps:true
})

module.exports = mongoose.model('refreshToken',tokenSchema)