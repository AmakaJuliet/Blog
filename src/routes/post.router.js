const {
  createPost,
  deletePost,
  fetchPost,
  fetchPosts,
  updatePost,
} = require("../controllers/posts.controller");
const verifyAuth = require("../middlewares/auth.middleware");

const postRouter = require("express").Router();

postRouter.post("/create", verifyAuth, createPost);
postRouter.get("/post/:id", fetchPost);
postRouter.get("/all", fetchPosts);
postRouter.delete("/delete/:id", verifyAuth, deletePost);
postRouter.put("/update/:id", verifyAuth, updatePost)
module.exports = postRouter;
