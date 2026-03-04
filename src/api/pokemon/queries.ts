import http from "@/lib/http";
import { Pokemon } from "@/types/pokemon";
import { useQuery } from "@tanstack/react-query";

interface PokemonQueryResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Pokemon[];
}

export function usePokemons(limit: number = 20, offset: number = 0) {
  return useQuery({
    queryKey: ["pokemon", limit, offset],
    queryFn: async () => {
      const response = await http.get<PokemonQueryResponse>(
        "https://pokeapi.co/api/v2/pokemon",
        {
          limit,
          offset,
        },
      );

      return response.data;
    },
  });
}
