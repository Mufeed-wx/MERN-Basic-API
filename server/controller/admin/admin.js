const userModel = require('../../models/user-model')

module.exports = {
    getAllUsers:async (req, res, next) => {
        try {
            try {
                const user = await userModel.find({})
                res.status(200).send({
                    message: "Users fetched successfully",
                    success: true,
                    data: user,
                })
            } catch (error) {
                console.log(error);
                res.status(500).send({ message: 'Error occured getting userlist', success: false })
            }
        } catch (error) {
    
        }
    }
}