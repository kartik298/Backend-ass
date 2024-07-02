const Discussion = require('./discussionModel');

const createDiscussion = async (req, res) => {
  const { text, image, hashtags } = req.body;
  try {
    const discussion = new Discussion({
      userId: req.user._id,
      text,
      image,
      hashtags,
    });
    await discussion.save();
    res.status(201).json({ message: 'Discussion created successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateDiscussion = async (req, res) => {
  const { text, image, hashtags } = req.body;
  try {
    const discussion = await Discussion.findById(req.params.id);
    if (discussion) {
      if (discussion.userId.toString() !== req.user._id.toString()) {
        return res.status(401).json({ message: 'Not authorized' });
      }
      discussion.text = text || discussion.text;
      discussion.image = image || discussion.image;
      discussion.hashtags = hashtags || discussion.hashtags;
      const updatedDiscussion = await discussion.save();
      res.json(updatedDiscussion);
    } else {
      res.status(404).json({ message: 'Discussion not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteDiscussion = async (req, res) => {
  try {
    const discussion = await Discussion.findById(req.params.id);
    if (discussion) {
      if (discussion.userId.toString() !== req.user._id.toString()) {
        return res.status(401).json({ message: 'Not authorized' });
      }
      await discussion.remove();
      res.json({ message: 'Discussion removed' });
    } else {
      res.status(404).json({ message: 'Discussion not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getDiscussionsByTag = async (req, res) => {
  try {
    const discussions = await Discussion.find({ hashtags: req.query.tag });
    res.json(discussions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getDiscussionsByText = async (req, res) => {
  try {
    const discussions = await Discussion.find({ text: new RegExp(req.query.text, 'i') });
    res.json(discussions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createDiscussion,
  updateDiscussion,
  deleteDiscussion,
  getDiscussionsByTag,
  getDiscussionsByText,
};
