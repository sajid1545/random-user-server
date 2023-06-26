const express = require('express');
const userController = require('../../controllers/user.controllers');
const router = express.Router();

router.get('/all', userController.getAllUsers);
router.get('/random', userController.getRandomUser);
router.post('/save', userController.addUser);
router.patch('/update/:id', userController.updateSingleUser);
router.delete('/delete/:id', userController.deleteUser);

module.exports = router;
