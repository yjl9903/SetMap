import { SetSet, SetMap } from '../src/index';

type Value<T> = { value: T };

type None = { none: true };

type Option<T> = Value<T> | None;

test('SetSet', () => {
  const v1 = { value: 1 };
  const v2 = { value: 2 };
  const v3 = { value: 3 };
  const n1: None = { none: true };
  const n2: None = { none: true };

  const set = new SetSet<Option<number>>([v1, v2], [v1, n1]);

  expect(set.has([v1, v2])).toBeTruthy();
  expect(set.has([v1, n1])).toBeTruthy();
  expect(set.has([v1, n2])).toBeFalsy();
  expect(set.has([v1])).toBeFalsy();
  expect(set.has([n1])).toBeFalsy();
  expect(set.add([v1, v2])).toBeFalsy();
  expect(set.add([v1, n1])).toBeFalsy();
  expect(set.add([n1])).toBeTruthy();
  expect(set.has([n2])).toBeFalsy();
  expect(set.add([v1, v2, v3, n1, n2])).toBeTruthy();
  expect(set.add([v1, v2, v3])).toBeTruthy();
  expect(set.has([v2, v3, n2, v1, n1])).toBeTruthy();
  expect(set.has([v2, v3, v1])).toBeTruthy();
  expect(set.has([v2, v1, v3])).toBeTruthy();
  expect(set.has([v3, v2, v1])).toBeTruthy();
  expect(set.has([v3, v1, v2])).toBeTruthy();

  expect(set.size()).toBe(5);

  const allSet = [...set];

  expect(allSet).toStrictEqual([
    [v1, v2],
    [v1, n1],
    [n1],
    [v1, v2, v3, n1, n2],
    [v1, v2, v3]
  ]);
});

test('SetMap', () => {
  const v1 = { value: 1 };
  const v2 = { value: 2 };
  const v3 = { value: 3 };
  const n1: None = { none: true };
  const n2: None = { none: true };

  const set = new SetMap<Option<number>, number>([[v1, v2], 0], [[v1, n1], 1]);

  expect(set.has([v1, v2])).toBeTruthy();
  expect(set.has([v1, n1])).toBeTruthy();
  expect(set.has([v1, n2])).toBeFalsy();
  expect(set.has([v1])).toBeFalsy();
  expect(set.has([n1])).toBeFalsy();
  expect(set.add([v1, v2], 2)).toBeFalsy();
  expect(set.set([v1, v2], 2)).toStrictEqual(set);
  expect(set.add([v1, n1], 3)).toBeFalsy();
  expect(set.add([n1], 3)).toBeTruthy();
  expect(set.has([n2])).toBeFalsy();
  expect(set.add([v1, v2, v3, n1, n2], 4)).toBeTruthy();
  expect(set.add([v1, v2, v3], 5)).toBeTruthy();

  expect(set.size()).toBe(5);

  const allSet = [...set];

  expect(allSet).toStrictEqual([
    [[v1, v2], 2],
    [[v1, n1], 1],
    [[n1], 3],
    [[v1, v2, v3, n1, n2], 4],
    [[v1, v2, v3], 5]
  ]);
});
