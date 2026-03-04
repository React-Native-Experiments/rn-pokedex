import http from "@/lib/http";
import { Pokemon } from "@/types/pokemon";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";

interface PokemonQueryResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Pokemon[];
}

export function usePokemons() {
  return useQuery({
    queryKey: ["pokemon"],
    queryFn: async () => {
      const response = await http.get<PokemonQueryResponse>(
        "https://pokeapi.co/api/v2/pokemon",
      );

      return response.data;
    },
  });
}

export function useInfinitePokemons() {
  return useInfiniteQuery({
    queryKey: ["pokemon"],
    queryFn: async ({ pageParam }) => {
      const response = await http.get<PokemonQueryResponse>(pageParam);
      return response.data;
    },

    initialPageParam: "https://pokeapi.co/api/v2/pokemon?offset=0&limit=20",
    getNextPageParam: ({ next }) => next,
    getPreviousPageParam: ({ previous }) => previous,
  });
}
