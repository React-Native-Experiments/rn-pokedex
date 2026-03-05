export function capitalize(text: string) {
  const initialLetter = text.at(0)!;
  const rest = text.slice(1);

  return initialLetter.toUpperCase() + rest;
}
