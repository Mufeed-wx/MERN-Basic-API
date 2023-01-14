const express = require('express')
const router = express.Router();
const userController = require('../controller/user/user')
const verifyTokenMiddleware = require('../middlewares/verifyTokenMiddleware')

router.post('/register',userController.userRegistration)
router.post('/login', userController.login)
router.post('/getNewTokenUsingRefresh',userController.refreshToken)

router.post('/get-user-info-by-id',verifyTokenMiddleware, userController.getAllUsersInfoById)

module.exports = router