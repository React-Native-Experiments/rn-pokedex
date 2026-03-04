import http from "@/lib/http";
import { PokemonDetails, PokemonPage } from "@/types/pokemon";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";

export function useInfinitePokemons() {
  return useInfiniteQuery({
    queryKey: ["pokemon"],
    queryFn: async ({ pageParam }) => {
      const response = await http.get<PokemonPage>(pageParam);
      return response.data;
    },

    initialPageParam: "https://pokeapi.co/api/v2/pokemon?offset=0&limit=20",
    getNextPageParam: ({ next }) => next,
    getPreviousPageParam: ({ previous }) => previous,
  });
}

export function usePokemon(id: string) {
  return useQuery({
    queryKey: ["pokemon", "details", id],
    queryFn: async () => {
      const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
      const response = await http.get<PokemonDetails>(url);
      return response.data;
    },
  });
}
