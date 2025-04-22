import { Context } from "hono";

export async function errorMiddleware(err: Error, c: Context) {
  console.error("Error:", err.message); // Log the error for debugging

  // Default error response
  const statusCode = 500;
  const response = {
    success: false,
    message: "Internal Server Error",
  };

  // You can customize the response based on error type if needed
  // Example: if (err instanceof SpecificError) { ... }

  return c.json(response, statusCode);
}
