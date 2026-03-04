import { Pokemon } from "@/types/pokemon";
import { useQuery } from "@tanstack/react-query";

export function usePokemons() {
  return useQuery({
    queryKey: ["pokemon"],
    queryFn: async () => {
      const response = await fetch("https://pokeapi.co/api/v2/pokemon");

      if (!response.ok) {
        throw new Error(response.status.toString());
      }

      return response.json() as Promise<{
        count: number;
        next: string | null;
        previous: string | null;
        results: Pokemon[];
      }>;
    },
  });
}
