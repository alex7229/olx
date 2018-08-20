export type IsValidJson = (json: unknown) => boolean;

export const isValidJson: IsValidJson = json => {
  if (typeof json !== "string") {
    return false;
  }
  try {
    JSON.parse(json);
  } catch (e) {
    return false;
  }
  return true;
};
