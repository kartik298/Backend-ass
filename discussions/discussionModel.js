const mongoose = require('mongoose');

const discussionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  text: { type: String, required: true },
  image: { type: String },
  hashtags: [{ type: String }],
  createdOn: { type: Date, default: Date.now },
  viewCount: { type: Number, default: 0 },
});

const Discussion = mongoose.model('Discussion', discussionSchema);

module.exports = Discussion;
