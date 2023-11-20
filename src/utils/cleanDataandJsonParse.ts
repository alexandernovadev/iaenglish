export const dataJsonClean = (_data: string) => {
  // Remove all text that GPT could say me
  if (String(_data).includes("\n\n")) {
    let index = _data.indexOf("\n\n");
    _data = _data.slice(index + 2);
  }

  return JSON.parse(_data)
};
