import app from './app';

const PORT = process.env.PORT || 3000;

Bun.serve({
  fetch: app.fetch,
  port: PORT,
});

console.log(`Server running on http://localhost:${PORT}`);