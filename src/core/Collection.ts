export class Collection<K, V> extends Map<K, V> {
  constructor(data?: [K, V][]) {
    if (data) {
      super(data);
    } else {
      super();
    }
  }

  /**
   * Functions identical to {@link Map.set()}. Returns inputted data instead
   * @param key
   * @param value
   * @returns
   */
  public setReturn(key: K, value: V): [K, V] {
    this.set(key, value);
    return [key, value];
  }

  /**
   * Finds the first key of a specified value from the first item that matches {@link value}
   * @param value Value of item to search for
   * @returns
   */
  public findKey(
    predicate: (filter: [K, V], index: number) => boolean,
  ): K | undefined {
    return this.entries().find(predicate)?.[0];
  }

  /**
   * Returns all items that have the same data as value
   * @param value Value to match for
   */
  public filter(
    predicate: (filter: [K, V], index: number) => boolean,
  ): [K, V][] {
    return this.entries().filter(predicate).toArray();
  }

  /**
   * Returns all keys that have the same data as value
   * @param value Value to match for
   */
  public filterKeys(
    predicate: (filter: [K, V], index: number) => boolean,
  ): K[] {
    return this.filter(predicate).map((item) => item[0]);
  }

  /**
   * Returns true if all items in the map match the predicate
   * @param predicate
   * @returns
   */
  public all(predicate: (filter: V, index: number) => boolean): boolean {
    return this.values().every(predicate);
  }

  /**
   * Returns true if any items in the map match the predicate
   * @param predicate
   * @returns
   */
  public some(predicate: (filter: V, index: number) => boolean): boolean {
    return this.values().some(predicate);
  }

  public slice(startPos?: number, endPos?: number): [K, V][] {
    return this.entries().toArray().slice(startPos, endPos);
  }

  public toCollection(arr: [K, V][]): Collection<K, V> {
    return new Collection<K, V>(arr);
  }
  public keysArr(): K[] {
    return this.keys().toArray();
  }
  public toArray(): [K, V][] {
    return this.entries().toArray();
  }
}
