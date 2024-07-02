const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  discussionId: { type: mongoose.Schema.Types.ObjectId, ref: 'Discussion', required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  text: { type: String, required: true },
  createdOn: { type: Date, default: Date.now },
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  replies: [
    {
      userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      text: { type: String },
      createdOn: { type: Date, default: Date.now },
      likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    },
  ],
});

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;
