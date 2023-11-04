export default function updateArrayStateVal(prevVals: string[], indexToChange: number, val: string) {
  prevVals[indexToChange] = val;
  const copy = [...prevVals];
  return copy;
}
