import { getUser } from "../Routes.js";
import {
  type APIResponse,
  type Created,
  type LastSeen,
  type Null,
} from "./APIData.js";
import type { ShirtID } from "./Catalog.js";

export enum FriendStatus {
  Self,
  None,
  Friends,
}

export enum FollowStatus {
  NotFollowing,
  Following,
}

export enum Presence {
  Undefined = -1,
  Offline,
  Online,
  InStudio
}

export const PresenceMap: Record<Presence, string> = {
  [Presence.Undefined]: "undefined",
  [Presence.Offline]: "offline",
  [Presence.Online]: "online",
  [Presence.InStudio]: "in_studio",
};

export type APIUser = Created<
  APIResponse<{
    username: string;
    bio: Null<string>;
    friend_count: number;
    follower_count: number;
    following_count: number;
    visits: number;
    friendship_status: FriendStatus;
    follow_status: FollowStatus;
    presence: Presence;
    is_deleted: boolean;
    is_staff: boolean;
    is_content_creator: boolean;
    is_booster: boolean;
    shirt_id: ShirtID;
    last_seen: LastSeen;
  }>
>;
export type RawAPIUser =
  | {
      follow_status: string;
      friendship_status: string;
      presence: string;
    }
  | APIUser;
export interface APIClient extends APIUser {}
function convertFollow(data: RawAPIUser) {
  let followStatus = FollowStatus.NotFollowing;
  switch (data.follow_status) {
    case "not_following":
      followStatus = FollowStatus.NotFollowing;
    case "following":
      followStatus = FollowStatus.Following;
    default:
      followStatus = FollowStatus.NotFollowing;
  }
  return followStatus;
}

function convertFriend(data: RawAPIUser) {
  let friendStatus = FriendStatus.None;
  switch (data.friendship_status) {
    case "self":
      friendStatus = FriendStatus.Self;
    case "friends":
      friendStatus = FriendStatus.Friends;
    default:
      friendStatus = FriendStatus.None;
  }
  return friendStatus;
}

function convertPresence(data: RawAPIUser) {
  let presence = Presence.Offline;
  switch (data.presence) {
    case "online":
      presence = Presence.Online;
    case "offline":
      presence = Presence.Offline;
    case "in_studio":
      presence = Presence.InStudio;
    default:
      presence = Presence.Offline;
  }
  return presence;
}

function mknull<T>(inp: T): T | null {
  return inp ?? null;
}

export class User {
  private userInfo: APIUser | null = null;
  constructor(data: APIUser) {
    data.follow_status = convertFollow(data);
    data.friendship_status = convertFriend(data);
    data.presence = convertPresence(data);
    this.userInfo = data;
  }

  public get username() {
    return mknull(this.userInfo?.username);
  }

  public get bio() {
    return mknull(this.userInfo?.bio);
  }

  public get friendCount() {
    return mknull(this.userInfo?.friend_count);
  }

  public get followerCount() {
    return mknull(this.userInfo?.follower_count);
  }

  public get followingCount() {
    return mknull(this.userInfo?.following_count);
  }

  public get visits() {
    return mknull(this.userInfo?.visits);
  }

  public get friendshipStatus() {
    return mknull(this.userInfo?.friendship_status);
  }

  public get followStatus() {
    return mknull(this.userInfo?.follow_status);
  }

  public get presence() {
    return mknull(PresenceMap[this.userInfo?.presence ?? -1]);
  }

  public get isDeleted() {
    return mknull(this.userInfo?.is_deleted);
  }

  public get isStaff() {
    return mknull(this.userInfo?.is_staff);
  }

  public get isContentCreator() {
    return mknull(this.userInfo?.is_content_creator);
  }

  public get isBooster() {
    return mknull(this.userInfo?.is_booster);
  }

  public get shirtId() {
    return mknull(this.userInfo?.shirt_id);
  }

  public get lastSeen() {
    return mknull(this.userInfo?.last_seen);
  }
}
