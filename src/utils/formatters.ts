const SPRITE_URL = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon";

export function formatPokemonSpriteUrl(id: string): string {
  return `${SPRITE_URL}/${id}.png`;
}
