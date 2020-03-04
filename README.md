# SetMap

![Node.js CI](https://github.com/yjl9903/SetMap/workflows/Node.js%20CI/badge.svg)

Use Hash to check whether two sets are equal.

## Install

```bash
yarn add @yjl9903/setmap
```

## Usage

```typescript
const a = { a: 1 };
const b = { b: 2 };
const c = { c: 3 };

const set = new SetSet<object>([a]);

set.has([a]); // true
set.has([b]); // false

set.add([a, b, c]); // true

set.has([a, c, b]); // true
set.has([b, a, c]); // true
set.has([b, c, a]); // true
set.has([c, a, b]); // true
set.has([c, b, a]); // true

set.has([a, b]); // false
set.has([a, c]); // false
set.has([b, c]); // false
```

## License

[MIT](https://github.com/yjl9903/XLex/blob/master/LICENSE)
