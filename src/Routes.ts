import type { APIUser } from "./builders/User.js";

const url = "https://playvortex.io";
const root = url + "/api";
const userRoute = "/users/$1";
const friendsRoute = "/friends/$1";

export const routes = {
  user: userRoute,
  friends: friendsRoute,
};

type Stringable = string | number;
export type ResData<T> = { data: T; status: number; statusText: string };

export function formatter(
  route: keyof typeof routes,
  ...replacers: string[]
): any {
  return root + routes[route].replace(/\$(\d+)/g, (_, i) => replacers[i - 1]);
}

export const get = <ResType>(
  route: string,
): Promise<{ data: ResType; status: number; statusText: string }> => {
  return new Promise((resolve, reject) => {
    fetch(route, {
      method: "GET",
    })
      .then(async (res) => {
        if (!res.ok) reject(new Error(res.statusText));

        resolve({
          data: await res.json(),
          status: res.status,
          statusText: res.statusText,
        });
      })
      .catch((e) => {
        reject(e);
      });
  });
};

