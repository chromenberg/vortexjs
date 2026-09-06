import { User } from "./builders/User.js";
import { getUser } from "./Routes.js";

export class VortexJS {
  constructor() { }

  public async getUser(id: string): Promise<User> {
    const user = await getUser(id);
    return new User(user.data);
  }
}
