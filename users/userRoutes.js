const express = require('express');
const { registerUser, loginUser, getUsers, getUserByName, updateUser, deleteUser, followUser } = require('./userController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/', getUsers);
router.get('/search', getUserByName);
router.put('/:id', protect, updateUser);
router.delete('/:id', protect, deleteUser);
router.post('/follow/:id', protect, followUser);

module.exports = router;
