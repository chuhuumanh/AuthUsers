const Post = require("../models/Post.model");
module.exports.addPost = (req, res) => {
  const newPost = new Post({
    user: req.user.id,
    text: req.body.text
  });
  newPost.save().then(result => {
    res.json({ result });
  });
};
module.exports.showAllPost = (req, res) => {
  Post.find()
    .sort({ date: -1 })
    .then(posts => res.json(posts))
    .catch(err => res.json(err));
};
module.exports.getPostbyId = (req, res) => {
  Post.findOne({ user: req.params.id })
    .then(post => res.json(post))
    .catch(error => res.json(error));
};
module.exports.deletePostbyId = (req, res) => {
  Post.findById(req.params.id)
    .then(post => {
      if (post.user.toString() !== req.user.id) {
        return res.status(401).json({ error: "Account not remove  posts" });
      } else {
        post.remove().then(() => res.json({ success: "Remove success" }));
      }
    })
    .catch(err => res.json(err));
};

module.exports.likePost = (req, res) => {
  Post.findById(req.params.id)
    .then(post => {
      if (
        post.like.filter(like => like.user.toString() === req.user.id).length >
        0
      ) {
        // Da like roi
        return res.status(400).json({ error: "Ban da like roi" });
      }
      // Chua like
      post.like.unshift({ user: req.user.id });
      post.save().then(post => res.json(post));
    })
    .catch(err => res.json(err));
};
module.exports.unLike = (req, res) => {
  Post.findById(req.params.id).then(post => {
    if (
      post.like.filter(like => like.user.toString() === req.user.id).length ===
      0
    ) {
      // Da like roi
      return res.status(400).json({ error: "Ban chua like bai viet nay" });
    }
    const IndexUnlike = post.like
      .map(item => item.user.toString())
      .indexOf(req.user.id);
    post.like.splice(IndexUnlike, 1);
    post.save().then(post => res.json(post));
  });
};
module.exports.onComment = (req, res) => {
  Post.findById(req.params.id).then(post => {
    const comment = {
      user: req.user.id,
      text: req.body.text
    };
    post.comment.unshift(comment);
    post
      .save()
      .then(post => res.json(post))
      .catch(err => res.status(404).json(err));
  });
};
module.exports.unComment = (req, res) => {
  Post.findById(req.params.id).then(post => {
    //Lay id cua comment
    if (
      post.comment.filter(item => item._id.toString() === req.params.comment_id)
        .length === 0
    ) {
      return res.json({ error: "Ko hien ra gi ca" });
    }

    if (
      post.comment.filter(item => item.user.toString() === req.user.id)
        .length === 0
    ) {
      return res.json({ error: "Ban dont duoc xoa comment nay" });
    } else {
      const removeComment = post.comment
        .map(item => item._id.toString())
        .indexOf(req.params.comment_id);
      post.comment.splice(removeComment, 1);
      post.save().then(post => res.json(post));
    }
  });
};
