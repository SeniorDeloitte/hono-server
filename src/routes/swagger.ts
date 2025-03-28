import { Hono } from "hono";

const swaggerRouter = new Hono();

// Define your OpenAPI specification
const openApiSpec = {
  openapi: "3.0.0",
  info: {
    title: "ORM API",
    version: "1.0.0",
    description: "API for managing users, posts, and authentication",
  },
  servers: [
    {
      url: "http://localhost:5000",
      description: "Development server",
    },
  ],
  paths: {
    "/api/auth/login": {
      post: {
        summary: "User login",
        description: "Authenticate a user and receive a token",
        tags: ["Authentication"],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["email", "password"],
                properties: {
                  email: { type: "string", format: "email" },
                  password: { type: "string", format: "password" },
                },
              },
            },
          },
        },
        responses: {
          "200": {
            description: "Login successful",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    success: { type: "boolean" },
                    data: {
                      type: "object",
                      properties: {
                        token: { type: "string" },
                        user: { $ref: "#/components/schemas/User" },
                      },
                    },
                  },
                },
              },
            },
          },
          "401": {
            description: "Invalid credentials",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    success: { type: "boolean", example: false },
                    message: { type: "string", example: "Invalid credentials" },
                  },
                },
              },
            },
          },
        },
      },
    },
    "/api/auth/register": {
      post: {
        summary: "User registration",
        description: "Register a new user account",
        tags: ["Authentication"],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["name", "email", "password"],
                properties: {
                  name: { type: "string" },
                  email: { type: "string", format: "email" },
                  password: { type: "string", format: "password" },
                },
              },
            },
          },
        },
        responses: {
          "201": {
            description: "User registered successfully",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    success: { type: "boolean" },
                    data: { $ref: "#/components/schemas/User" },
                  },
                },
              },
            },
          },
          "400": {
            description: "Validation error or email already exists",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    success: { type: "boolean", example: false },
                    message: {
                      type: "string",
                      example: "Email already in use",
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
    "/api/users": {
      get: {
        summary: "Get all users",
        description: "Retrieve a list of all users",
        tags: ["Users"],
        responses: {
          "200": {
            description: "A list of users",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    success: { type: "boolean" },
                    data: {
                      type: "array",
                      items: { $ref: "#/components/schemas/User" },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
    "/api/users/{id}": {
      get: {
        summary: "Get user by ID",
        description: "Retrieve a specific user by their ID",
        tags: ["Users"],
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: {
              type: "string",
            },
            description: "User ID",
          },
        ],
        responses: {
          "200": {
            description: "User found",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    success: { type: "boolean" },
                    data: { $ref: "#/components/schemas/User" },
                  },
                },
              },
            },
          },
          "404": {
            description: "User not found",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    success: { type: "boolean", example: false },
                    message: { type: "string", example: "User not found" },
                  },
                },
              },
            },
          },
        },
      },
    },
    "/api/posts": {
      get: {
        summary: "Get all posts",
        description: "Retrieve a list of all posts",
        tags: ["Posts"],
        responses: {
          "200": {
            description: "A list of posts",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    success: { type: "boolean" },
                    data: {
                      type: "array",
                      items: { $ref: "#/components/schemas/Post" },
                    },
                  },
                },
              },
            },
          },
        },
      },
      post: {
        summary: "Create a new post",
        description: "Create a new post with the provided data",
        tags: ["Posts"],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["title", "content", "userId"],
                properties: {
                  title: { type: "string" },
                  content: { type: "string" },
                  userId: { type: "string" },
                },
              },
            },
          },
        },
        responses: {
          "201": {
            description: "Post created successfully",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    success: { type: "boolean" },
                    data: { $ref: "#/components/schemas/Post" },
                  },
                },
              },
            },
          },
          "400": {
            description: "Validation error",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    success: { type: "boolean", example: false },
                    message: { type: "string", example: "Validation error" },
                    errors: {
                      type: "array",
                      items: {
                        type: "object",
                        properties: {
                          path: { type: "string" },
                          message: { type: "string" },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
    "/api/posts/{id}": {
      get: {
        summary: "Get post by ID",
        description: "Retrieve a specific post by its ID",
        tags: ["Posts"],
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: {
              type: "string",
            },
            description: "Post ID",
          },
        ],
        responses: {
          "200": {
            description: "Post found",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    success: { type: "boolean" },
                    data: { $ref: "#/components/schemas/Post" },
                  },
                },
              },
            },
          },
          "404": {
            description: "Post not found",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    success: { type: "boolean", example: false },
                    message: { type: "string", example: "Post not found" },
                  },
                },
              },
            },
          },
        },
      },
      put: {
        summary: "Update post",
        description: "Update an existing post",
        tags: ["Posts"],
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: {
              type: "string",
            },
            description: "Post ID",
          },
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  title: { type: "string" },
                  content: { type: "string" },
                },
              },
            },
          },
        },
        responses: {
          "200": {
            description: "Post updated successfully",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    success: { type: "boolean" },
                    data: { $ref: "#/components/schemas/Post" },
                  },
                },
              },
            },
          },
          "404": {
            description: "Post not found",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    success: { type: "boolean", example: false },
                    message: { type: "string", example: "Post not found" },
                  },
                },
              },
            },
          },
        },
      },
      delete: {
        summary: "Delete post",
        description: "Delete an existing post",
        tags: ["Posts"],
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: {
              type: "string",
            },
            description: "Post ID",
          },
        ],
        responses: {
          "200": {
            description: "Post deleted successfully",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    success: { type: "boolean" },
                    data: { $ref: "#/components/schemas/Post" },
                  },
                },
              },
            },
          },
          "404": {
            description: "Post not found",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    success: { type: "boolean", example: false },
                    message: { type: "string", example: "Post not found" },
                  },
                },
              },
            },
          },
        },
      },
    },
    "/api/posts/user/{userId}": {
      get: {
        summary: "Get posts by user ID",
        description: "Retrieve all posts created by a specific user",
        tags: ["Posts"],
        parameters: [
          {
            name: "userId",
            in: "path",
            required: true,
            schema: {
              type: "string",
            },
            description: "User ID",
          },
        ],
        responses: {
          "200": {
            description: "List of user's posts",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    success: { type: "boolean" },
                    data: {
                      type: "array",
                      items: { $ref: "#/components/schemas/Post" },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  },
  components: {
    schemas: {
      User: {
        type: "object",
        properties: {
          id: { type: "string" },
          name: { type: "string" },
          email: { type: "string", format: "email" },
        },
      },
      Post: {
        type: "object",
        properties: {
          id: { type: "string" },
          title: { type: "string" },
          content: { type: "string" },
          userId: { type: "string" },
          createdAt: { type: "string", format: "date-time" },
          updatedAt: { type: "string", format: "date-time" },
        },
      },
    },
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    },
  },
  security: [
    {
      bearerAuth: [],
    },
  ],
  tags: [
    {
      name: "Authentication",
      description: "API endpoints for user authentication",
    },
    {
      name: "Users",
      description: "API endpoints for user management",
    },
    {
      name: "Posts",
      description: "API endpoints for post management",
    },
  ],
};

// Serve the OpenAPI spec as JSON
swaggerRouter.get("/spec", (c) => {
  return c.json(openApiSpec);
});

// Serve Swagger UI
swaggerRouter.get("/", (c) => {
  const html = `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>API Documentation</title>
        <link rel="stylesheet" href="https://unpkg.com/swagger-ui-dist@4.5.0/swagger-ui.css">
      </head>
      <body>
        <div id="swagger-ui"></div>
        <script src="https://unpkg.com/swagger-ui-dist@4.5.0/swagger-ui-bundle.js"></script>
        <script>
          window.onload = () => {
            const ui = SwaggerUIBundle({
              url: '/swagger/spec',
              dom_id: '#swagger-ui',
              presets: [
                SwaggerUIBundle.presets.apis,
                SwaggerUIBundle.SwaggerUIStandalonePreset
              ],
              layout: "BaseLayout",
              deepLinking: true,
              displayOperationId: false,
              displayRequestDuration: true,
              defaultModelsExpandDepth: 1,
              defaultModelExpandDepth: 1,
              defaultModelRendering: 'example',
              docExpansion: 'list',
              showExtensions: true,
              showCommonExtensions: true
            });
          };
        </script>
      </body>
    </html>
  `;

  return c.html(html);
});

export default swaggerRouter;
