import { useInfinitePokemons } from "@/api/pokemon/queries";
import { PokemonItem } from "@/components/pokemon/PokemonItem";
import { PokemonList } from "@/components/pokemon/PokemonList";
import { StateError } from "@/components/ui/StateError";
import { StateLoading } from "@/components/ui/StateLoading";
import { usePokemonSearch } from "@/hooks/usePokemonSearch";
import { extractPokemonId } from "@/utils/extractors";
import { Text, TextInput, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function Index() {
  const {
    data: infinitePokemons,
    isLoading: isPokemonLoading,
    isError: isPokemonError,
    fetchNextPage,
    refetch,
  } = useInfinitePokemons();

  const { filtered, search, setSearch } = usePokemonSearch(
    infinitePokemons?.pages ?? [],
  );

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
      <View className="gap-2 mb-4">
        <Text className="text-3xl mt-10 ">Pokemons</Text>

        <TextInput
          value={search}
          className="border border-gray-300/70 rounded-lg h-[40px] px-3"
          placeholder="Search by name or number..."
          onChangeText={setSearch}
        />
      </View>

      <PokemonList
        data={filtered}
        renderItem={({ item }) => (
          <PokemonItem id={extractPokemonId(item.url)} name={item.name} />
        )}
        onEndReached={() => fetchNextPage()}
      />
    </View>
  );
}
