export function generateRandomName() {
  const names = [
    "Handy",
    "Quick",
    "Veggie",
    "Random",
    "Fanatic",
    "Grinded",
    "Massive",
    "Horrible",
    "Tasty",
    "Delicious",
    "Freckle",
    "Mocky",
    "Welles",
    "Ascended",
    "Frankly",
    "Mossy",
    "Uranus",
    "Milky",
    "Sweet",
    "Sour",
  ];
  return `${randomElementArray(names)} Panini`;
}

export function randomElementArray(array: readonly string[]): string {
  return array[Math.floor(Math.random() * array.length)];
}

export function randomArrayValues(array: readonly string[], maxLength: number): string[] {
  const randomLength = Math.floor(Math.random() * maxLength);
  const result = [];
  for (let i = 0; i < randomLength; i++) {
    result.push(randomElementArray(array));
  }
  return result;
}

export function randomSetValues(array: readonly string[], maxLength: number): readonly string[] {
  const unusedValuesSet = new Set(array);
  const randomLength = Math.floor(Math.random() * maxLength);
  const result = [];
  for (let i = 0; i < randomLength; i++) {
    const val = randomElementArray(Array.from(unusedValuesSet));
    unusedValuesSet.delete(val);
    result.push(val);
  }
  return result;
}
