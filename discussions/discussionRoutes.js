const express = require('express');
const {
  createDiscussion,
  updateDiscussion,
  deleteDiscussion,
  getDiscussionsByTag,
  getDiscussionsByText,
} = require('./discussionController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/', protect, createDiscussion);
router.put('/:id', protect, updateDiscussion);
router.delete('/:id', protect, deleteDiscussion);
router.get('/tags', getDiscussionsByTag);
router.get('/search', getDiscussionsByText);

module.exports = router;
