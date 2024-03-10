export function isSuperset(set: Set<any>, subset: Iterable<any>): boolean {
  for (const elem of subset) {
    if (!set.has(elem)) {
      return false;
    }
  }
  return true;
}

export function* combinations(array: string[], index: number): Generator<string[]> {
  if (index === 1) {
    for (const str of array) {
      yield [str];
    }
    return;
  }

  for (let i = 0; i <= array.length - index; i += 1) {
    for (const part of combinations(array.slice(i + 1), index - 1)) {
      yield [array[i], ...part];
    }
  }
}
