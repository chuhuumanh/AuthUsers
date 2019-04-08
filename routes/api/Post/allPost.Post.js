const express = require("express");
const router = express.Router();
const passport = require("passport");
const controller = require("../../../controllers/post.controller");
// Write one POST
router.post(
  "/add",
  passport.authenticate("jwt", { session: false }),
  controller.addPost
);
// GET POST ALL
router.get("/all", controller.showAllPost);
// get post one user
router.get("/:id", controller.getPostbyId);
// delete one post of users
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  controller.deletePostbyId
);
// LIKE post
// :id : Id of post
router.post(
  "/like/:id",
  passport.authenticate("jwt", { session: false }),
  controller.likePost
);
// Unlike
router.post(
  "/unlike/:id",
  passport.authenticate("jwt", { session: false }),
  controller.unLike
);
// COmment to post
router.post(
  "/comment/:id",
  passport.authenticate("jwt", { session: false }),
  controller.onComment
);

router.delete(
  "/:id/:comment_id",
  passport.authenticate("jwt", { session: false }),
  controller.unComment
);
module.exports = router;
