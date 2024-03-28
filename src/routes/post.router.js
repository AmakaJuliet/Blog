const {
  createPost,
  deletePost,
  fetchPost,
  fetchPosts,
  updatePost,
} = require("../controllers/posts.controller");
const verifyAuth = require("../middlewares/auth.middleware");

const postRouter = require("express").Router();

postRouter.post("/", verifyAuth, createPost);
postRouter.get("/:id",verifyAuth, fetchPost);
postRouter.get("/",verifyAuth, fetchPosts);
postRouter.delete("/:id", verifyAuth, deletePost);
postRouter.put("/:id", verifyAuth, updatePost)
module.exports = postRouter;
