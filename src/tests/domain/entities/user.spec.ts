import { User } from "../../../domain/entities/user";

describe("User Entity", () => {
  it("should create a valid user", () => {
    const user: User = {
      id: "1",
      name: "John Doe",
      email: "john@example.com",
      createdAt: new Date(),
    };

    expect(user).toHaveProperty("id");
    expect(user).toHaveProperty("name");
    expect(user).toHaveProperty("email");
    expect(user).toHaveProperty("createdAt");
  });
});
