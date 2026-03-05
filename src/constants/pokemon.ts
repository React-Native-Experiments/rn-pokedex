export const STAT_LABELS: Record<string, string> = {
  hp: "HP",
  attack: "ATK",
  defense: "DEF",
  "special-attack": "Sp. Atk",
  "special-defense": "Sp. Def",
  speed: "SPD",
};

export const STAT_COLORS: Record<string, string> = {
  hp: "#FF5959",
  attack: "#F5AC78",
  defense: "#FAE078",
  "special-attack": "#9DB7F5",
  "special-defense": "#A7DB8D",
  speed: "#FA92B2",
};

export const TYPE_COLORS = {
  fire: "#F08030",
  normal: "#A8A878",
  water: "#6890F0",
  electric: "#F8D030",
  grass: "#78C850",
  ice: "#98D8D8",
  fighting: "#C03028",
  poison: "#A040A0",
  ground: "#E0C068",
  flying: "#A890F0",
  psychic: "#F85888",
  bug: "#A8B820",
  rock: "#B8A038",
  ghost: "#705898",
  dragon: "#7038F8",
  dark: "#705848",
  steel: "#B8B8D0",
  fairy: "#EE99AC",
};

export function getTypeColor(type: string): string {
  return TYPE_COLORS[type as keyof typeof TYPE_COLORS] ?? TYPE_COLORS.normal;
}
