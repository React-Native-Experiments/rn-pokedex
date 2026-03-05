import { useInfinitePokemons } from "@/api/pokemon/queries";
import { PokemonItem } from "@/components/pokemon/PokemonItem";
import { PokemonList } from "@/components/pokemon/PokemonList";
import { StateError } from "@/components/ui/StateError";
import { StateLoading } from "@/components/ui/StateLoading";
import { extractPokemonId } from "@/utils/extractors";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function Index() {
  const {
    data: infinitePokemons,
    isLoading: isPokemonLoading,
    isError: isPokemonError,
    fetchNextPage,
    refetch,
  } = useInfinitePokemons();

  const insets = useSafeAreaInsets();

  if (isPokemonLoading) return <StateLoading />;
  if (isPokemonError)
    return <StateError message="Failed to load Pokemon" onRetry={refetch} />;
  if (!infinitePokemons) return null;

  return (
    <View
      style={{ paddingTop: insets.top, paddingBottom: insets.bottom }}
      className="px-6 flex-1"
    >
      <PokemonList
        data={infinitePokemons.pages.flatMap((p) => p.results)}
        renderItem={({ item }) => (
          <PokemonItem id={extractPokemonId(item.url)} name={item.name} />
        )}
        onEndReached={() => fetchNextPage()}
      />
    </View>
  );
}
