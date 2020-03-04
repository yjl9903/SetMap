import { BaseSet } from './base';

export class SetSet<T extends object> extends BaseSet<T> {
  private readonly set: Set<number> = new Set();
  private readonly mem: T[][] = [];

  constructor(...args: T[][]) {
    super();
    for (const nodes of args) {
      this.add(nodes);
    }
  }

  has(nodes: T[]): boolean {
    return this.set.has(this.getSet(nodes));
  }

  add(nodes: T[]): boolean {
    const val = this.getSet(nodes);
    if (this.set.has(val)) {
      return false;
    }
    this.set.add(val);
    this.mem.push(nodes);
    return true;
  }

  *[Symbol.iterator]() {
    yield* this.mem;
  }

  size() {
    return this.mem.length;
  }
}
