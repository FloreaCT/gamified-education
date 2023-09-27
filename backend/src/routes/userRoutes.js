const express = require("express");
const router = express.Router();

// Import controller
const userController = require("../controllers/userController");
const courseController = require("../controllers/courseController");
const feedController = require("../controllers/feedController");

// User routes
router.post("/api/userRegister", userController.userRegister);
router.get("/api/user", userController.getAllUsers);
router.get("/api/currentUser", userController.getUser);
router.get("/api/UserCourseHistories/", userController.getUserHistory);
router.get("/api/leaderboard", userController.getLeaderboard);
router.get("/api/achievements", userController.getAchievements);

router.post("/api/updatePath", userController.updatePath);
router.post("/api/setAvatar", userController.setAvatar);
router.post("/api/login", userController.loginUser);
router.post("/api/updateUser", userController.updateUser);
router.post("/api/browserClose", userController.browserClose);
router.post("/api/user/updateExperience", userController.updateExperience);

// Course routes
router.get("/api/courses/:courseName", courseController.getCourseMaterial);
router.get(
  "/api/courses/:courseName/:user_id",
  courseController.getCourseProgress
);
router.get("/api/courses", courseController.getAllCourses);

router.post("/api/courses/updateStatus", courseController.updateStatus);
router.post("/api/courses/updateHistory", courseController.updateHistory);
router.post("/api/courses/updateFinish", courseController.updateFinish);
router.post("/api/courses/restartCourse", courseController.restartCourse);

// Feed routes
router.get("/api/feed", feedController.getFeedItems);
router.get("/api/feed/comments/:feedItemId", feedController.getComments);
router.get("/api/feed/achievements", feedController.getAchievements);

router.post(
  "/api/feed/like/:feedItemId/:userId/:likerId",
  feedController.likeFeedItem
);

router.post("/api/feed/create", feedController.createFeedItem);
router.post(
  "/api/feed/comment/:feedItemId/:content/:userId",
  feedController.createComment
);

module.exports = router;
