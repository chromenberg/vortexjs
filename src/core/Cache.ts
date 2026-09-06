import type { VortexJS } from "../index.js";
import { Collection } from "./Collection.js";

type TimedItem<T> = {
  last_updated: Date;
  item: T;
};
type Seconds = number;
export class Cache<T> {
  protected _data: Collection<string, TimedItem<T>> = new Collection();
  private _limit: Seconds;
  constructor(limit: Seconds) {
    this._limit = limit;
  }

  public get _internal() {
    return this._data
  }
  
  public get(key: string): T | undefined {
    const item = this._data.get(key);
    return item?.item;
  }



  public set(key: string, value: T) {
    this._data.set(key, { last_updated: new Date(), item: value });
  }

  public remove(key: string) {
    this._data.delete(key);
  }

  public clear() {
    this._data.clear();
  }

  public has(key: string): boolean {
    return this._data.has(key);
  }

  public isExpired(key: string): boolean {
    const check = this._data.get(key);
    // if the item is not there then we say the item is expired
    // which means it will get overwritten
    if (check === undefined) return true;
    console.log("The item expiry is currently: ", check)
    // if the last updated time + limit is less than the current date then the item is expired
    return this.addLimit(check) < new Date().getSeconds();
  }

  private addLimit(item: TimedItem<T>) {
    return item.last_updated.getSeconds() + this._limit;
  }
}; 


export class AbstractStore<T> {
  protected _cache: Cache<T> = new Cache<T>(60);
  protected _parent: VortexJS;
  constructor(parent: VortexJS) {
    this._parent = parent;
  }
  
  protected async getData(id: string): Promise<T | null> {
    return null;
  }
  
  public async fetch(id: string) {
    const isExpired = this._cache.isExpired(id);
    // If the user is not expired then the user is already present in the cache
    if (!isExpired) return this._cache.get(id) as T;

    const data = await this.getData(id)

    if (data !== null) this._cache.set(id, data);
    return data;
  }

}
