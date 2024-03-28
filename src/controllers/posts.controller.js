const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();


async function createPost(req, res, next) {
  const { title, content } = req.body;
  const user = req.user;

  try {
    // Check if user has access to write
    if (!hasWriteAccess(user.user_type)) {
      return res.json({
        message:
          "Access denied. You need to be either an author or a guest author to be able to write an article",
        success: false,
      });
    }

    if (title.length < 5 || content.length < 20) {
      return res.json({
        message:
          "Title must be at least 5 characters long, while content must be at least 20 characters long",
        success: false,
      });
    }

    const newPost = await prisma.post.create({
      data: {
        title: title,
        content: content,
        authorId: user.id,
      },
    });

    return res.json({
      message: "Post created",
      success: true,
      post: newPost,
    });
  } catch (error) {
    return res.json({
      success: false,
      message: `An error occurred while creating a post: ${error.message}`,
      error: error,
    });
  }
}

async function fetchPosts(req, res, next) {
  try {
    const posts = await prisma.post.findMany({
      select: {
        id: true,
        title: true,
        content: true,
        author: {
          select: {
            username: true,
          },
        },
      },
    });

    return res.json({
      message: "Posts",
      count: posts.length,
      success: true,
      posts: posts,
    });
  } catch (error) {
    return res.json({
      success: false,
      message: `An error occurred while fetching all posts: ${error.message}`,
      error: error,
    });
  }
}

async function fetchPost(req, res, next) {
  const { id } = req.params;
  try {
    const post = await prisma.post.findUnique({
      where: {
        id: id,
      },
      select: {
        id: true,
        title: true,
        content: true,
        author: {
          select: {
            username: true,
          },
        },
      },
    });

    if (!post) {
      return res.json({
        success: false,
        message: "Post not found",
      });
    }

    return res
     .status(200)
     .json({
      message: "Post",
      success: true,
      post: post,
    });
  } catch (error) {
    return res
     .status(500)
     .json({
      success: false,
      message: `An error occurred while fetching post with id ${id}: ${error.message}`,
      error: error,
    });
  }
}

async function updatePost(req, res, next) {
  const { id } = req.params;
  const { title, content } = req.body;
  const userId = req.user.id;

  try {
    // Fetch the post by its ID
    const post = await prisma.post.findUnique({
      where: {
        id: id,
      },
    });

    // Check if the post exists
    if (!post) {
      return res
        .status(404)
        .json({ success: false, message: "Post not found" });
    }

    // Check if the current user is the author of the post
    if (post.authorId !== userId) {
      return res
        .status(403)
        .json({ success: false, message: "You can update only your post" });
    }

    // Update the post with the provided fields
    const updatedPost = await prisma.post.update({
      where: {
        id: id,
      },
      data: {
        title: title,
        content: content,
      },
    });

    return res
      .status(200)
      .json({
        success: true,
        message: "The post has been updated",
        post: updatedPost,
      });
  } catch (error) {
    return res
      .status(500)
      .json({
        success: false,
        message: "There was an error",
        error: error.message,
      });
  }
}

async function deletePost(req, res, next) {
  const { id } = req.params;
  const user = req.user;

  try {
    // Fetch the post by its ID
    const post = await prisma.post.findUnique({
      where: {
        id: id,
      },
    });

    // Check if the post exists
    if (!post) {
      return res.json({ success: false, message: "Post not found" });
    }

    // Check if the current user is the author of the post or has write access
    const isAuthor = user.id === post.authorId;
    const hasAccess = hasWriteAccess(user.user_type) || isAuthor;

    if (!hasAccess) {
      return res.json({
        message: "Access denied. Cannot delete someone else's post",
        success: false,
      });
    }

    // Delete the post
    await prisma.post.delete({
      where: {
        id: id,
      },
    });

    return res
      .status(200)
      .json({ message: "Post deleted", success: true, deleted: true });
  } catch (error) {
    return res
     .status(500)
     .json({
      success: false,
      message: `An error occurred while deleting post with id ${id}: ${error.message}`,
      error: error,
    });
  }
}

function hasWriteAccess(user_type) {
  return ["Author", "Guest_Author"].includes(user_type);
}

//function

module.exports = {
  createPost,
  fetchPost,
  fetchPosts,
  updatePost,
  deletePost,
};
