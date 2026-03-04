import { useInfinitePokemons } from "@/api/pokemon/queries";
import { extractPokemonId } from "@/utils/extractors";
import { formatPokemonSpriteUrl } from "@/utils/formatters";
import { FlatList, Image, Pressable, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function Index() {
  const {
    data: infinitePokemons,
    isLoading: isPokemonLoading,
    isError: isPokemonError,
    fetchNextPage,
  } = useInfinitePokemons();

  const insets = useSafeAreaInsets();

  if (isPokemonLoading) return;
  if (isPokemonError) return;
  if (!infinitePokemons) return;

  return (
    <View
      style={{ paddingTop: insets.top, paddingBottom: insets.bottom }}
      className="px-6 flex-1"
    >
      <FlatList
        className="flex-1"
        ListHeaderComponent={() => (
          <View>
            <Text className="text-3xl mt-10 mb-2">Pokemons</Text>
          </View>
        )}
        data={infinitePokemons.pages.flatMap((p) => p.results)}
        renderItem={({ item, index }) => (
          <PokemonItem id={extractPokemonId(item.url)} name={item.name} />
        )}
        keyExtractor={(item) => item.url}
        contentContainerStyle={{ gap: 8, paddingBottom: 70 }}
        onEndReached={() => fetchNextPage()}
        onEndReachedThreshold={0.5}
      />
    </View>
  );
}

interface PokemonItemProps {
  id: string;
  name: string;
}

/**
 * Displays a single Pokemon item in a list format.
 *
 * @example
 * <PokemonItem name="Pikachu" url="https://pokeapi.co/api/v2/pokemon/25/" index={0} />
 */
export function PokemonItem(props: PokemonItemProps) {
  const { name, id } = props;

  return (
    <Pressable className="border border-gray-300/70 rounded-lg p-4 flex-row item-center gap-x-2 active:bg-gray-50">
      <Image
        className="bg-purple-50 rounded-full"
        source={{
          uri: formatPokemonSpriteUrl(id),
        }}
        width={50}
        height={50}
      />
      <View className="flex-1 justify-center">
        <Text className="font-semibold text-lg capitalize flex-1 text-gray-900">
          {name}
        </Text>
        <Text className="font-light text-sm capitalize flex-1 text-gray-700">
          #{id}
        </Text>
      </View>
    </Pressable>
  );
}
