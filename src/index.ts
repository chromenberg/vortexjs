import { FriendsStore } from "./builders/Friends.js";
import { UserStore } from "./builders/User.js";

export class VortexJS {
  private _friends: FriendsStore = new FriendsStore(this);
  private _users: UserStore = new UserStore(this);
  constructor() { }

  public get users(): UserStore {
    return this._users;
  }

  public get friends(): FriendsStore {
    return this._friends;
  }
}
