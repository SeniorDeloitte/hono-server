# Hono Server with Bun

A modern web server built with Hono framework and Bun runtime, featuring authentication, user management, and SQLite database integration.

## 🚀 Features

- Authentication system with JWT
- User management (CRUD operations)
- SQLite database integration
- React server-side rendering
- TypeScript support
- Hot module reloading

## 🛠️ Tech Stack

- [Bun](https://bun.sh/) - JavaScript runtime & toolkit
- [Hono](https://hono.dev/) - Web framework
- [SQLite](https://www.sqlite.org/) - Database (via `bun:sqlite`)
- [React](https://reactjs.org/) - UI rendering
- [TypeScript](https://www.typescriptlang.org/) - Type safety

## 📦 Prerequisites

- Bun runtime installed on your machine
- Node.js 18+ (for some dependencies)
- Git for version control

## 🔧 Getting Started

1. Clone the repository:

```sh
git clone <repository-url>
cd hono-server
```

2. Install dependencies:

```sh
bun install
```

3. Create a `.env` file:

```env
SECRET_KEY=your_jwt_secret_key
PORT=3000
```

4. Start the development server:

```sh
bun run dev
```

Visit [http://localhost:3000](http://localhost:3000) to access the application.

## 📚 API Documentation

### Authentication Endpoints

| Method | Endpoint              | Description       | Auth Required |
| ------ | --------------------- | ----------------- | ------------- |
| POST   | `/api/auth/register`  | Register new user | No            |
| POST   | `/api/auth/login`     | Login user        | No            |
| GET    | `/api/auth/protected` | Protected route   | Yes           |

### User Management

| Method | Endpoint         | Description   | Auth Required |
| ------ | ---------------- | ------------- | ------------- |
| GET    | `/api/users`     | Get all users | Yes           |
| PUT    | `/api/users/:id` | Update user   | Yes           |
| DELETE | `/api/users/:id` | Delete user   | Yes           |

## 📁 Project Structure

```
hono-server/
├── src/
│   ├── database.ts    # Database configuration
│   ├── index.tsx      # Main application entry
│   ├── types.ts       # TypeScript interfaces
│   └── routes/
│       ├── auth.ts    # Authentication routes
│       └── users.ts   # User management routes
├── .env
├── package.json
└── tsconfig.json
```

## 🧪 Development Commands

```sh
# Start development server with hot reloading
bun run dev

# Build the application
bun run build

# Run tests
bun test

# Type checking
bun run typecheck
```

## 🔒 Security Features

- Password hashing via `Bun.password`
- JWT-based authentication
- Bearer token authorization
- Environment variable protection
- CORS configuration

## 💡 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
