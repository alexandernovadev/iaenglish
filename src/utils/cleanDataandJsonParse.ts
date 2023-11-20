export const dataJsonClean = (_data: string) => {
  // Remove all text that GPT could say me
  const regex = /{[\s\S]*}/;
  const jsonEncontrado = _data.match(regex);
  // @ts-ignore
  return JSON.parse(jsonEncontrado[0]);
};
