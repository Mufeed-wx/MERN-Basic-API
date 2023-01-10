const express = require('express')
const router = express.Router();
const adminController = require('../controller/admin/admin')

router.get('/get-all-users',adminController.getAllUsers) 

module.exports = router