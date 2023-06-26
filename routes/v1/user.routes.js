const express = require('express');
const userController = require('../../controllers/user.controllers');
const router = express.Router();

router.get('/all', userController.getAllUsers);
router.get('/random', userController.getRandomUser);

module.exports = router;
