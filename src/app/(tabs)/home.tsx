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

  const { filtered, search, setSearch } = usePokemonSearch(infinitePokemons?.pages ?? []);

  const insets = useSafeAreaInsets();

  if (isPokemonLoading) return <StateLoading />;
  if (isPokemonError) return <StateError message="Failed to load Pokemon" onRetry={refetch} />;
  if (!infinitePokemons) return null;

  return (
    <View style={{ paddingTop: insets.top, paddingBottom: insets.bottom }} className="flex-1 px-6">
      <View className="mb-6 gap-4">
        <View className="mt-10 gap-1">
          <Text className="text-4xl font-bold tracking-tight text-gray-900">Pokemons</Text>
          <Text className="text-sm text-gray-500">Currently loaded {filtered.length} species</Text>
        </View>

        <TextInput
          value={search}
          className="h-[40px] rounded-lg border border-gray-300/70 px-3"
          placeholder="Search by name or number..."
          onChangeText={setSearch}
        />
      </View>

      <PokemonList
        data={filtered}
        renderItem={({ item }) => (
          <PokemonItem key={extractPokemonId(item.url)} name={item.name} id={extractPokemonId(item.url)} />
        )}
        onEndReached={() => fetchNextPage()}
      />
    </View>
  );
}
