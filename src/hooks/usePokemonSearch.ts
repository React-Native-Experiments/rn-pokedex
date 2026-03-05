import { PokemonPage } from "@/types/pokemon";
import { useMemo, useState } from "react";

export function usePokemonSearch(data: PokemonPage[]) {
  const [search, setSearch] = useState("");
  const pages = data.flatMap((p) => p.results);

  const filtered = useMemo(
    () => pages.filter((p) => !search || p.name.includes(search.toLowerCase())),
    [pages, search],
  );

  return { filtered, search, setSearch };
}
