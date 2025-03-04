import { Hono } from "hono";

const docsRouter = new Hono();

const DocsView = () => {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>API Documentation</title>
        <script src="https://cdn.tailwindcss.com"></script>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/themes/prism.min.css"
        />
        <script
          src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/prism.min.js"
          defer
        ></script>
        <script
          src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/components/prism-json.min.js"
          defer
        ></script>
      </head>
      <body className="bg-gray-100 min-h-screen">
        <div className="container mx-auto px-4 py-8">
          <nav className="bg-white shadow-md mb-8">
            <div className="container mx-auto px-4 py-3 flex justify-between items-center">
              <h1 className="text-xl font-bold text-blue-600">ORM API</h1>
              <div className="flex space-x-4">
                <a href="/" className="text-gray-700 hover:text-blue-600">
                  Home
                </a>
                <a
                  href="/docs"
                  className="text-gray-700 hover:text-blue-600 font-semibold"
                >
                  Documentation
                </a>
              </div>
            </div>
          </nav>

          <div className="bg-white p-8 rounded-lg shadow-md">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">
              API Documentation
            </h1>

            <section className="mb-12">
              <h2 className="text-2xl font-semibold text-gray-700 mb-4">
                Introduction
              </h2>
              <p className="text-gray-600 mb-4">
                This documentation provides information about the ORM API
                endpoints, request/response formats, and examples.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-semibold text-gray-700 mb-4">
                Authentication
              </h2>
              <div className="bg-gray-50 p-4 rounded-md mb-4">
                <h3 className="text-lg font-medium text-gray-700 mb-2">
                  POST /api/auth/login
                </h3>
                <p className="text-gray-600 mb-2">
                  Authenticate a user and receive a token.
                </p>
                <div className="mb-4">
                  <h4 className="text-md font-medium text-gray-700">
                    Request Body:
                  </h4>
                  <pre className="language-json rounded-md mt-2">
                    <code>{`{
  "email": "user@example.com",
  "password": "password123"
}`}</code>
                  </pre>
                </div>
                <div>
                  <h4 className="text-md font-medium text-gray-700">
                    Response:
                  </h4>
                  <pre className="language-json rounded-md mt-2">
                    <code>{`{
  "success": true,
  "data": {
    "token": "jwt-token-here",
    "user": {
      "id": "1",
      "email": "user@example.com"
    }
  }
}`}</code>
                  </pre>
                </div>
              </div>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-semibold text-gray-700 mb-4">
                Users
              </h2>
              <div className="bg-gray-50 p-4 rounded-md mb-4">
                <h3 className="text-lg font-medium text-gray-700 mb-2">
                  GET /api/users
                </h3>
                <p className="text-gray-600 mb-2">Get a list of all users.</p>
                <div>
                  <h4 className="text-md font-medium text-gray-700">
                    Response:
                  </h4>
                  <pre className="language-json rounded-md mt-2">
                    <code>{`{
  "success": true,
  "data": [
    {
      "id": "1",
      "name": "John Doe",
      "email": "john@example.com"
    },
    {
      "id": "2",
      "name": "Jane Smith",
      "email": "jane@example.com"
    }
  ]
}`}</code>
                  </pre>
                </div>
              </div>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-semibold text-gray-700 mb-4">
                Posts
              </h2>
              <div className="bg-gray-50 p-4 rounded-md mb-4">
                <h3 className="text-lg font-medium text-gray-700 mb-2">
                  GET /api/posts
                </h3>
                <p className="text-gray-600 mb-2">Get a list of all posts.</p>
                <div>
                  <h4 className="text-md font-medium text-gray-700">
                    Response:
                  </h4>
                  <pre className="language-json rounded-md mt-2">
                    <code>{`{
  "success": true,
  "data": [
    {
      "id": "1",
      "title": "First Post",
      "content": "This is the first post content",
      "userId": "1",
      "createdAt": "2023-01-01T00:00:00.000Z",
      "updatedAt": "2023-01-01T00:00:00.000Z"
    },
    {
      "id": "2",
      "title": "Second Post",
      "content": "This is the second post content",
      "userId": "2",
      "createdAt": "2023-01-02T00:00:00.000Z",
      "updatedAt": "2023-01-02T00:00:00.000Z"
    }
  ]
}`}</code>
                  </pre>
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-md mb-4">
                <h3 className="text-lg font-medium text-gray-700 mb-2">
                  POST /api/posts
                </h3>
                <p className="text-gray-600 mb-2">Create a new post.</p>
                <div className="mb-4">
                  <h4 className="text-md font-medium text-gray-700">
                    Request Body:
                  </h4>
                  <pre className="language-json rounded-md mt-2">
                    <code>{`{
  "title": "New Post Title",
  "content": "Content of the new post",
  "userId": "1"
}`}</code>
                  </pre>
                </div>
                <div>
                  <h4 className="text-md font-medium text-gray-700">
                    Response:
                  </h4>
                  <pre className="language-json rounded-md mt-2">
                    <code>{`{
  "success": true,
  "data": {
    "id": "3",
    "title": "New Post Title",
    "content": "Content of the new post",
    "userId": "1",
    "createdAt": "2023-01-03T00:00:00.000Z",
    "updatedAt": "2023-01-03T00:00:00.000Z"
  }
}`}</code>
                  </pre>
                </div>
              </div>
            </section>
          </div>

          <footer className="mt-12 py-6 border-t">
            <div className="container mx-auto px-4 text-center text-gray-500">
              <p>© {new Date().getFullYear()} ORM API. All rights reserved.</p>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
};

docsRouter.get("/", (c) => {
  return c.html(<DocsView />);
});

export default docsRouter;
