import { BaseSet } from './base';

export class SetSet<T extends object> extends BaseSet<T> {
  private readonly set: Set<number> = new Set();
  private readonly mem: T[][] = [];

  constructor(...args: T[][]) {
    super();
    for (const set of args) {
      this.add(set);
    }
  }

  /**
   * check wheter the set exist.
   *
   * @param {T[]} set
   * @returns {boolean}
   * @memberof SetSet
   */
  has(set: T[]): boolean {
    return this.set.has(this.getSet(set));
  }

  /**
   * insert a new set into SetSet,
   * return whether the set exists.
   *
   * @param {T[]} set
   * @returns {boolean}
   * @memberof SetSet
   */
  add(set: T[]): boolean {
    const val = this.getSet(set);
    if (this.set.has(val)) {
      return false;
    }
    this.set.add(val);
    this.mem.push(set);
    return true;
  }

  *[Symbol.iterator](): Generator<T[]> {
    for (const set of this.mem) {
      yield set;
    }
  }

  /**
   * get the size of this SetSet.
   *
   * @returns {number}
   * @memberof SetSet
   */
  size(): number {
    return this.mem.length;
  }
}
