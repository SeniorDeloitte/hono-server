// Import the Database class from the bun:sqlite package
import { Database } from "bun:sqlite";
// Import the User type from the types file
//import { User } from "./types";

// Create a new SQLite database connection
const db = new Database("database.db");

// Execute a SQL statement to create the users table if it doesn't exist
db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    password TEXT NOT NULL
  )
`);

// // Prepare an SQL statement for inserting a new user into the users table
// const insertUser = db.prepare(
//   "INSERT INTO users (name, email, password) VALUES (?, ?, ?)"
// );

// // Define an array of users without the id property
// const users: Omit<User, "id">[] = [
//   {
//     name: "Alice Johnson",
//     email: "alice.johnson@example.com",
//     password: "$2b$10$XmtWVxjCVxx6Z5GKtscWOOuOJDIfM.y4N9GS9XEglWEop1yO4Bnj6",
//   },
//   {
//     name: "Bob Smith",
//     email: "bob.smith@example.com",
//     password: "$2b$10$XmtWVxjCVxx6Z5GKtscWOOuOJDIfM.y4N9GS9XEglWEop1yO4Bnj6",
//   },
//   {
//     name: "Charlie Brown",
//     email: "charlie.brown@example.com",
//     password: "$2b$10$XmtWVxjCVxx6Z5GKtscWOOuOJDIfM.y4N9GS9XEglWEop1yO4Bnj6",
//   },
//   {
//     name: "David Wilson",
//     email: "david.wilson@example.com",
//     password: "$2b$10$XmtWVxjCVxx6Z5GKtscWOOuOJDIfM.y4N9GS9XEglWEop1yO4Bnj6",
//   },
//   {
//     name: "Eva Davis",
//     email: "eva.davis@example.com",
//     password: "$2b$10$XmtWVxjCVxx6Z5GKtscWOOuOJDIfM.y4N9GS9XEglWEop1yO4Bnj6",
//   },
//   {
//     name: "Frank Miller",
//     email: "frank.miller@example.com",
//     password: "$2b$10$XmtWVxjCVxx6Z5GKtscWOOuOJDIfM.y4N9GS9XEglWEop1yO4Bnj6",
//   },
//   {
//     name: "Grace Lee",
//     email: "grace.lee@example.com",
//     password: "$2b$10$XmtWVxjCVxx6Z5GKtscWOOuOJDIfM.y4N9GS9XEglWEop1yO4Bnj6",
//   },
//   {
//     name: "Hannah White",
//     email: "hannah.white@example.com",
//     password: "$2b$10$XmtWVxjCVxx6Z5GKtscWOOuOJDIfM.y4N9GS9XEglWEop1yO4Bnj6",
//   },
//   {
//     name: "Ian Clark",
//     email: "ian.clark@example.com",
//     password: "$2b$10$XmtWVxjCVxx6Z5GKtscWOOuOJDIfM.y4N9GS9XEglWEop1yO4Bnj6",
//   },
//   {
//     name: "Jane Lewis",
//     email: "jane.lewis@example.com",
//     password: "$2b$10$XmtWVxjCVxx6Z5GKtscWOOuOJDIfM.y4N9GS9XEglWEop1yO4Bnj6",
//   },
// ];

// // Insert each user into the database
// users.forEach((user) => {
//   insertUser.run(user.name, user.email, user.password);
// });

// Export the database connection for use in other parts of the application
export default db;
