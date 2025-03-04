import { Hono } from "hono";
import { z } from "zod";

// Define Post schema
const PostSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(1, "Title is required"),
  content: z.string().min(1, "Content is required"),
  userId: z.string(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

type Post = z.infer<typeof PostSchema>;

// Mock database
const posts: Post[] = [
  {
    id: "1",
    title: "First Post",
    content: "This is the first post content",
    userId: "1",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "2",
    title: "Second Post",
    content: "This is the second post content",
    userId: "2",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

const postsRouter = new Hono();

// GET all posts
postsRouter.get("/", (c) => {
  return c.json({
    success: true,
    data: posts,
  });
});

// GET post by ID
postsRouter.get("/:id", (c) => {
  const id = c.req.param("id");
  const post = posts.find((post) => post.id === id);

  if (!post) {
    return c.json(
      {
        success: false,
        message: "Post not found",
      },
      404
    );
  }

  return c.json({
    success: true,
    data: post,
  });
});

// GET posts by user ID
postsRouter.get("/user/:userId", (c) => {
  const userId = c.req.param("userId");
  const userPosts = posts.filter((post) => post.userId === userId);

  return c.json({
    success: true,
    data: userPosts,
  });
});

// CREATE a new post
postsRouter.post("/", async (c) => {
  try {
    const body = await c.req.json();

    // Validate request body
    const validatedData = PostSchema.parse({
      ...body,
      id: String(posts.length + 1),
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    posts.push(validatedData);

    return c.json(
      {
        success: true,
        data: validatedData,
      },
      201
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return c.json(
        {
          success: false,
          message: "Validation error",
          errors: (error as z.ZodError).errors,
        },
        400
      );
    }

    return c.json(
      {
        success: false,
        message: "Failed to create post",
      },
      500
    );
  }
});

// UPDATE a post
postsRouter.put("/:id", async (c) => {
  try {
    const id = c.req.param("id");
    const body = await c.req.json();

    const postIndex = posts.findIndex((post) => post.id === id);

    if (postIndex === -1) {
      return c.json(
        {
          success: false,
          message: "Post not found",
        },
        404
      );
    }

    // Validate request body
    const validatedData = PostSchema.parse({
      ...posts[postIndex],
      ...body,
      updatedAt: new Date(),
    });

    posts[postIndex] = validatedData;

    return c.json({
      success: true,
      data: validatedData,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return c.json(
        {
          success: false,
          message: "Validation error",
          errors: (error as z.ZodError).errors,
        },
        400
      );
    }

    return c.json(
      {
        success: false,
        message: "Failed to update post",
      },
      500
    );
  }
});

// DELETE a post
postsRouter.delete("/:id", (c) => {
  const id = c.req.param("id");
  const postIndex = posts.findIndex((post) => post.id === id);

  if (postIndex === -1) {
    return c.json(
      {
        success: false,
        message: "Post not found",
      },
      404
    );
  }

  const deletedPost = posts.splice(postIndex, 1)[0];

  return c.json({
    success: true,
    data: deletedPost,
  });
});

export default postsRouter;
