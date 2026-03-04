import http from "@/lib/http";
import { PokemonPage } from "@/types/pokemon";
import { useInfiniteQuery } from "@tanstack/react-query";

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
