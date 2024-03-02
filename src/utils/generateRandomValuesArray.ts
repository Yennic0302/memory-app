export function generateRandomArray(length: number): number[] {
  const numbers = Array.from({ length }, (_, i) => [i + 1, i + 1]).flat();

  for (let i = numbers.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [numbers[i], numbers[j]] = [numbers[j], numbers[i]];
  }

  return numbers;
}
