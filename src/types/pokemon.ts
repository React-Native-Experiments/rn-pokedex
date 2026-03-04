import { GenericResource } from "./resource";

export interface PokemonPage {
  count: number;
  next: string | null;
  previous: string | null;
  results: GenericResource[];
}

export interface PokemonType {
  slot: number;
  type: GenericResource;
}

export interface PokemonStat {
  base_stat: number;
  effort: number;
  stat: GenericResource;
}

export interface PokemonAbility {
  is_hidden: boolean;
  slot: number;
  ability: GenericResource;
}

interface PokemonSprites {
  front_default: string | null;
  front_shiny: string | null;
  back_default: string | null;
  back_shiny: string | null;
  other?: Record<string, unknown>;
  versions?: Record<string, unknown>;
}

export interface PokemonDetails {
  id: number;
  name: string;
  height: number;
  weight: number;
  types: PokemonType[];
  stats: PokemonStat[];
  abilities: PokemonAbility[];
  sprites: PokemonSprites;
}
