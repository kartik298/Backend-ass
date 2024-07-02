const express = require('express');
const {
  likePost,
  commentOnPost,
  likeComment,
  replyToComment,
  updateComment,
  deleteComment,
} = require('./interactionController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/like/:id', protect, likePost);
router.post('/comment', protect, commentOnPost);
router.post('/like-comment/:id', protect, likeComment);
router.post('/reply/:id', protect, replyToComment);
router.put('/comment/:id', protect, updateComment);
router.delete('/comment/:id', protect, deleteComment);

module.exports = router;
