import { Random, MersenneTwister19937 } from 'random-js';

const random = new Random(MersenneTwister19937.autoSeed());

export class BaseSet<T extends object> {
  private hashCache: WeakMap<T, number> = new WeakMap();

  getHash(node: T): number {
    if (!this.hashCache.has(node)) {
      this.hashCache.set(node, random.uint53Full());
    }
    return this.hashCache.get(node) as number;
  }

  getSet(nodes: T[]): number {
    return nodes.reduce((v, node) => v ^ this.getHash(node), 0);
  }
}
