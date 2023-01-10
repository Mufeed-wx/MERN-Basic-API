const express = require('express')
const router = express.Router();
const userController = require('../controller/user/user')
const authMiddleware = require('../middlewares/authMiddleware')

router.post('/register',userController.userRegistration)
router.post('/login', userController.login)

router.post('/get-user-info-by-id',authMiddleware, userController.getAllUsersInfoById)

module.exports = router