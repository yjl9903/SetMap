import { BaseSet } from './base';

export class SetMap<T extends object, U> extends BaseSet<T> {
  private readonly map: Map<number, U> = new Map();
  private readonly mem: T[][] = [];

  constructor(...args: Array<[T[], U]>) {
    super();
    for (const [key, val] of args) {
      this.add(key, val);
    }
  }

  /**
   * check wheter the set exist.
   *
   * @param {T[]} set
   * @returns {boolean}
   * @memberof SetMap
   */
  has(set: T[]): boolean {
    return this.map.has(this.getSet(set));
  }

  /**
   * insert a new (set, value) pair into SetMap,
   * return whether the set exists.
   *
   * @param {T[]} set
   * @param {U} value
   * @returns {boolean}
   * @memberof SetMap
   */
  add(set: T[], value: U): boolean {
    const hsh = this.getSet(set);
    if (this.map.has(hsh)) {
      return false;
    }
    this.map.set(hsh, value);
    this.mem.push(set);
    return true;
  }

  /**
   * set a new (set, value) pair into SetMap,
   * insert a new pair when set does not exist.
   *
   * @param {T[]} set
   * @param {U} value
   * @returns {SetMap<T extends object, U>} this
   * @memberof SetMap
   */
  set(set: T[], value: U): SetMap<T, U> {
    const hsh = this.getSet(set);
    this.map.set(hsh, value);
    if (!this.map.has(hsh)) {
      this.mem.push(set);
    }
    return this;
  }

  /**
   * get the value of a set.
   *
   * @param {T[]} set
   * @returns {U}
   * @memberof SetMap
   */
  get(set: T[]): U {
    const hsh = this.getSet(set);
    if (!this.map.has(hsh)) {
      throw new Error(`SetMap does not have nodes`);
    }
    return this.map.get(hsh) as U;
  }

  *[Symbol.iterator](): Generator<[T[], U]> {
    for (const nodes of this.mem) {
      yield [nodes, this.get(nodes)];
    }
  }

  /**
   * get the size of this SetMap.
   *
   * @returns {number}
   * @memberof SetMap
   */
  size(): number {
    return this.mem.length;
  }
}
