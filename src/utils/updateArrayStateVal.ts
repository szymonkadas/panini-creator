export default function updateArrayStateVal(prevVals: any[], indexToChange: number, val: any) {
  prevVals[indexToChange] = val;
  const copy = [...prevVals];
  return copy;
}
