const Comment = require('./interactionModel');

const likePost = async (req, res) => {
  try {
    const discussion = await Discussion.findById(req.params.id);
    if (discussion) {
      if (discussion.likes.includes(req.user._id)) {
        discussion.likes.pull(req.user._id);
      } else {
        discussion.likes.push(req.user._id);
      }
      await discussion.save();
      res.json({ message: 'Post liked/unliked successfully' });
    } else {
      res.status(404).json({ message: 'Discussion not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const commentOnPost = async (req, res) => {
  const { discussionId, text } = req.body;
  try {
    const comment = new Comment({
      discussionId,
      userId: req.user._id,
      text,
    });
    await comment.save();
    res.status(201).json({ message: 'Comment added successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const likeComment = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);
    if (comment) {
      if (comment.likes.includes(req.user._id)) {
        comment.likes.pull(req.user._id);
      } else {
        comment.likes.push(req.user._id);
      }
      await comment.save();
      res.json({ message: 'Comment liked/unliked successfully' });
    } else {
      res.status(404).json({ message: 'Comment not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const replyToComment = async (req, res) => {
  const { text } = req.body;
  try {
    const comment = await Comment.findById(req.params.id);
    if (comment) {
      comment.replies.push({
        userId: req.user._id,
        text,
      });
      await comment.save();
      res.status(201).json({ message: 'Reply added successfully' });
    } else {
      res.status(404).json({ message: 'Comment not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateComment = async (req, res) => {
  const { text } = req.body;
  try {
    const comment = await Comment.findById(req.params.id);
    if (comment) {
      if (comment.userId.toString() !== req.user._id.toString()) {
        return res.status(401).json({ message: 'Not authorized' });
      }
      comment.text = text || comment.text;
      await comment.save();
      res.json({ message: 'Comment updated successfully' });
    } else {
      res.status(404).json({ message: 'Comment not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteComment = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);
    if (comment) {
      if (comment.userId.toString() !== req.user._id.toString()) {
        return res.status(401).json({ message: 'Not authorized' });
      }
      await comment.remove();
      res.json({ message: 'Comment removed' });
    } else {
      res.status(404).json({ message: 'Comment not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  likePost,
  commentOnPost,
  likeComment,
  replyToComment,
  updateComment,
  deleteComment,
};
