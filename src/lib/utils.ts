export function isSuperset(set: Set<any>, subset: Iterable<any>): boolean {
  for (const elem of subset) {
    if (!set.has(elem)) {
      return false;
    }
  }
  return true;
}

export function difference<T>(setA: Set<T>, setB: Set<T>): Set<T> {
  const result = new Set(setA);
  for (const elem of setB) {
    result.delete(elem);
  }
  return result;
}

/**
 * Return a random integer between two values
 * @param min inclusive
 * @param max exclusive
 */
export function randomInt(min: number, max: number): number {
  const minCeil = Math.ceil(min);
  const maxFloor = Math.floor(max);
  return Math.floor(Math.random() * (maxFloor - minCeil) + minCeil);
}

export function randomChoice<T>(it: Iterable<T>): T {
  const array = Array.from(it);
  return array[randomInt(0, array.length)];
}

export function shuffle<T>(array: Array<T>): Array<T> {
  for (let i = array.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}
