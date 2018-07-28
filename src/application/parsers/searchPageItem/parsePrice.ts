export type Price = number | null;
export type ParsePrice = (input: string) => Price;

export const parsePrice: ParsePrice = input => {
  const priceWithoutSpaces = input.replace(/ /g, "");
  if (priceWithoutSpaces === "Обмен") {
    return null;
  }
  const regExp = /^([\d]+)грн.$/;
  const match = priceWithoutSpaces.match(regExp);
  if (match === null) {
    throw new Error("price format is incorrect");
  }
  return parseInt(match[1], 10);
};
