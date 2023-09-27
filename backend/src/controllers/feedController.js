const { FeedItem, User, Comment, Achievement } = require("../../models"); // Import Sequelize models

async function createFeedItem(req, res) {
  try {
    const { userId, content, type } = req.body;

    const oldFeedItem = await FeedItem.findOne({
      where: {
        userId,
        content,
      },
    });

    if (oldFeedItem) {
      return res.status(409).json({ message: "Feed item already exists." });
    }

    const newFeedItem = await FeedItem.create({
      userId,
      content,
      type,
      timestamp: new Date(),
    });

    res.status(201).json(newFeedItem);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "An error occurred while creating the feed item." });
  }
}

async function getFeedItems(req, res) {
  const limit = parseInt(req.query.limit) || 10;
  const offset = parseInt(req.query.offset) || 0;

  try {
    const feedItems = await FeedItem.findAll({
      limit,
      offset,
      include: [
        {
          model: User,
          as: "user",
          attributes: ["username", "avatar"], // Only get username and avatar from the User model
        },
      ],
      order: [["timestamp", "DESC"]], // Order by timestamp in descending order
      limit: 10, // Limit to 10 items for now
    });

    res.status(200).json(feedItems);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "An error occurred while fetching the feed items." });
  }
}

async function createComment(req, res) {
  try {
    const { feedItemId, content, userId } = req.params;

    const newComment = await Comment.create({
      feedItemId,
      userId,
      content,
      timestamp: new Date(),
    });

    res.status(200).json(newComment);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "An error occurred while posting the comment." });
  }
}

async function getComments(req, res) {
  try {
    const { feedItemId } = req.params;

    const comments = await Comment.findAll({
      where: { feedItemId },
      include: [
        {
          model: User,
          as: "user",
          attributes: ["username", "avatar"], // Only fetch the username and avatar
        },
      ],
      order: [["timestamp", "DESC"]], // Newest comments first
    });

    res.status(200).json(comments);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "An error occurred while fetching the comments." });
  }
}

async function likeFeedItem(req, res) {
  try {
    const { feedItemId, userId, likerId } = req.params;

    const feedItem = await FeedItem.findOne({
      where: { id: feedItemId, userId: userId },
    });

    if (!feedItem) {
      return res.status(404).json({ message: "Feed item not found." });
    }

    // Initialize likedBy if it's null or undefined
    if (!feedItem.likedBy) {
      feedItem.likedBy = [];
    }

    // Check if the user has already liked this item
    if (!feedItem.likedBy.includes(likerId)) {
      await feedItem.update({
        likes: feedItem.likes + 1,
        likedBy: [...feedItem.likedBy, likerId],
      });

      return res.status(200).json(feedItem.likes);
    } else {
      return res
        .status(200)
        .json({ error: "User has already liked this item." });
    }
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "An error occurred while liking the feed item." });
  }
}

async function getAchievements(req, res) {
  try {
    const achievements = await Achievement.findAll({
      limit: 3, // Limit to the last 3 items
      order: [["createdAt", "DESC"]], // Order by createdAt in descending order (latest first)
    });

    if (!achievements) {
      return res.status(404).json({ message: "No achievement found." });
    }

    return res.status(200).json(achievements);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "An error occurred while getting the feed items." });
  }
}
module.exports = {
  createFeedItem,
  getFeedItems,
  createComment,
  getComments,
  likeFeedItem,
  getAchievements,
};
