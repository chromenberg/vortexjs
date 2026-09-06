import { AbstractStore } from "../core/Cache";
import type { VortexJS } from "../index";
import { formatter, get, type ResData } from "../Routes";
import type { APIResponse } from "./APIData";
import { convertPresence, getUser, Presence, User } from "./User";

export type APIFriendsData = APIResponse<{
  username: string;
  online_status: string;
}>;

type FriendsData = APIResponse<{
  username: string;
  online_status: Presence;
}>;

async function getFriends(id: string): Promise<ResData<APIFriendsData[]>> {
  return get<APIFriendsData[]>(formatter("friends", id));
}
function mknull<T>(inp: T): T | null {
  return inp ?? null;
}

export class FriendsList {
  private data: FriendsData[] | null = null;
  private _parent: VortexJS;
  constructor(parent: VortexJS, friends: APIFriendsData[]) {
    this._parent = parent;
    this.data = friends.map((friend) => {
      return {
        id: friend.id,
        username: friend.username,
        online_status: convertPresence(
          // convert to string as that is what is sent by the API
          friend.online_status,
        ),
      };
    });
  }
  public friends() {
    return this.data ?? [];
  }
  public async getUser(id: string): Promise<User | null> {
    // find the friend by id
    const friend = this.data?.find((friend) => friend.id === id);
    if (!friend) return null;

    const res = await getUser(id);

    return new User(this._parent, res.data);
  }
}

export class FriendsStore extends AbstractStore<FriendsList> {
  protected async getData(id: string): Promise<FriendsList | null> {
    return await getFriends(id)
      .then((data) => new FriendsList(this._parent, data.data))
      .catch(() => null);
  }
}
