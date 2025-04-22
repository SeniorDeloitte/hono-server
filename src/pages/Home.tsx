import { readFileSync } from "fs";
import { join } from "path";

const packageJson = JSON.parse(
  readFileSync(join(__dirname, "../../package.json"), "utf8")
); // Import package.json

const HomePage = () => {
  const appVersion = packageJson.version; // Get version from package.json

  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>ORM API Home</title> {/* Changed title */}
        <script src="https://cdn.tailwindcss.com"></script>
      </head>
      <body className="bg-gradient-to-br from-blue-50 via-white to-indigo-50 min-h-screen font-sans">
        {" "}
        {/* Added gradient and font */}
        <div className="container mx-auto px-4 py-8">
          <nav className="bg-white rounded-lg shadow-md mb-10">
            {" "}
            {/* Added rounded corners */}
            <div className="container mx-auto px-6 py-4 flex justify-between items-center">
              {" "}
              {/* Increased padding */}
              <div className="flex items-center space-x-3">
                {" "}
                {/* Container for title and version */}
                <h1 className="text-2xl font-bold text-blue-700">
                  ORM API
                </h1>{" "}
                {/* Increased size and changed color */}
                <span className="inline-block bg-blue-100 text-blue-800 text-xs font-bold px-3 py-1 rounded-full">
                  {" "}
                  {/* Version Pill */}v{appVersion}
                </span>
              </div>
              <div className="flex space-x-6">
                {" "}
                {/* Increased spacing */}
                <a
                  href="/"
                  className="text-gray-600 hover:text-blue-600 font-medium transition-colors" /* Added font-medium and transition */
                >
                  Home
                </a>
                <a
                  href="/docs"
                  className="text-gray-600 hover:text-blue-600 font-medium transition-colors" /* Added font-medium and transition */
                >
                  Documentation
                </a>
                <a
                  href="/swagger"
                  className="text-gray-600 hover:text-blue-600 font-medium transition-colors" /* Added font-medium and transition */
                >
                  Swagger UI
                </a>
              </div>
            </div>
          </nav>
          <header className="text-center mb-12">
            {" "}
            {/* Centered header */}
            <h1 className="text-4xl font-extrabold text-gray-800 mb-3">
              {" "}
              {/* Larger, bolder title */}
              Welcome to the ORM API!
            </h1>
            <p className="text-lg text-gray-600">
              {" "}
              {/* Added subtitle */}
              Explore resources and manage your data efficiently.
            </p>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {" "}
            {/* Increased gap */}
            <a
              href="/api/users"
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl hover:scale-105 transition-all duration-300 group" /* Added hover scale, transition, group */
            >
              <h2 className="text-xl font-semibold mb-2 text-blue-600 group-hover:text-blue-800 transition-colors">
                {" "}
                {/* Added group hover color */}
                Users
              </h2>
              <p className="text-gray-600">Manage user data and profiles.</p>
            </a>
            <a
              href="/api/auth"
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl hover:scale-105 transition-all duration-300 group" /* Added hover scale, transition, group */
            >
              <h2 className="text-xl font-semibold mb-2 text-green-600 group-hover:text-green-800 transition-colors">
                {" "}
                {/* Changed color, added group hover color */}
                Authentication
              </h2>
              <p className="text-gray-600">
                Handle user login and registration.
              </p>{" "}
              {/* Updated description */}
            </a>
            <a
              href="/api/posts"
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl hover:scale-105 transition-all duration-300 group" /* Added hover scale, transition, group */
            >
              <h2 className="text-xl font-semibold mb-2 text-purple-600 group-hover:text-purple-800 transition-colors">
                {" "}
                {/* Changed color, added group hover color */}
                Posts
              </h2>
              <p className="text-gray-600">Manage user posts and content.</p>
            </a>
          </div>

          <footer className="mt-16 py-6 border-t border-gray-200">
            {" "}
            {/* Increased top margin, lighter border */}
            <div className="container mx-auto px-4 text-center text-gray-500 text-sm">
              {" "}
              {/* Smaller text */}
              <p>© {new Date().getFullYear()} ORM API. All rights reserved.</p>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
};

export default HomePage;
