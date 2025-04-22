type User = {
  id: string;
  username: string;
  password: string;
};

const users: User[] = [];

export const UserModel = {
  async findByUsername(username: string): Promise<User | undefined> {
    return users.find((u) => u.username === username);
  },

  async create({ username, password }: { username: string; password: string }): Promise<User> {
    const user: User = {
      id: (users.length + 1).toString(),
      username,
      password,
    };
    users.push(user);
    return user;
  },
};