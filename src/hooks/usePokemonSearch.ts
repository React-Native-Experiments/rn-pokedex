import { PokemonPage } from "@/types/pokemon";
import { useMemo, useState } from "react";
import { useDebounceValue } from "usehooks-ts";

export function usePokemonSearch(data: PokemonPage[]) {
  const [search, setSearch] = useState("");
  const [debouncedSearch] = useDebounceValue(search, 300);

  const pages = data.flatMap((p) => p.results);

  const filtered = useMemo(
    () =>
      pages.filter(
        (p) =>
          !debouncedSearch || p.name.includes(debouncedSearch.toLowerCase()),
      ),
    [pages, debouncedSearch],
  );

  return { filtered, search, setSearch };
}
