import { FriendsStore } from "./builders/Friends.js";
import { UserStore } from "./builders/User.js";

export class VortexJS {
  private _friends: FriendsStore = new FriendsStore(this);
  private _users: UserStore = new UserStore(this);
  constructor() {}

  public get users(): UserStore {
    return this._users;
  }

  public get friends(): FriendsStore {
    return this._friends;
  }
}

(async () => {
  // Initialize library
  const vortex = new VortexJS();
  {
    // Get a user
    const user = await vortex.users.fetch("1");
    console.log("Bio:", user?.bio);
    console.log("Username:", user?.username);
    console.log("Friend Count:", user?.friendCount);
    console.log("Presence:", user?.presence);

    if (!user || !user.id) return
    // get a users friends list (if available)
    const friends = await vortex.friends.fetch(user.id);

    console.log("Friends Length:", friends?.friends.length);
    console.log("User from Friends:", await friends?.getUser("11111"));
  }
  // FIXME: the get by username stuff doesnt work, returns undefined
  {
    const user = await vortex.users.fetchByUsername("army");

    console.log("Bio:", user?.bio);
    console.log("Username:", user?.username);
    console.log("Friend Count:", user?.friendCount);
    console.log("Presence:", user?.presence);

    if (!user || !user.id) return
    // get a users friends list (if available)
    const friends = await vortex.friends.fetch(user.id);

    console.log("Friends Length:", friends?.friends.length);
    console.log("User from Friends:", await friends?.getUserByUsername("TheHaloDeveloper"));
  }
})()!;
