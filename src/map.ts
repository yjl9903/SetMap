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

  has(nodes: T[]): boolean {
    return this.map.has(this.getSet(nodes));
  }

  add(nodes: T[], x: U): boolean {
    const val = this.getSet(nodes);
    if (this.map.has(val)) {
      return false;
    }
    this.map.set(val, x);
    this.mem.push(nodes);
    return true;
  }

  set(nodes: T[], x: U) {
    const val = this.getSet(nodes);
    this.map.set(val, x);
    if (!this.map.has(val)) {
      this.mem.push(nodes);
    }
    return this;
  }

  get(nodes: T[]): U {
    const val = this.getSet(nodes);
    if (!this.map.has(val)) {
      throw new Error(`SetMap does not have nodes`);
    }
    return this.map.get(val) as U;
  }

  *[Symbol.iterator]() {
    for (const nodes of this.mem) {
      yield [nodes, this.get(nodes)];
    }
  }

  size() {
    return this.mem.length;
  }
}
