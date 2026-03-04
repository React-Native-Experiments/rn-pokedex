import { usePokemons } from "@/api/pokemon/queries";
import { extractPokemonId } from "@/utils/extractors";
import { formatPokemonSpriteUrl } from "@/utils/formatters";
import { FlatList, Image, Pressable, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function Index() {
  const {
    data: pokemons,
    isLoading: isPokemonLoading,
    isError: isPokemonError,
  } = usePokemons();

  const insets = useSafeAreaInsets();

  if (isPokemonLoading) return;
  if (isPokemonError) return;
  if (!pokemons) return;

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
        data={pokemons.results}
        renderItem={({ item, index }) => (
          <PokemonItem name={item.name} url={item.url} index={index} />
        )}
        contentContainerStyle={{ gap: 8, paddingBottom: 70 }}
      />
    </View>
  );
}

interface PokemonItemProps {
  name: string;
  url: string;
  index: number;
}

/**
 * Displays a single Pokemon item in a list format.
 *
 * @example
 * <PokemonItem name="Pikachu" url="https://pokeapi.co/api/v2/pokemon/25/" index={0} />
 */
export function PokemonItem(props: PokemonItemProps) {
  const { name, url, index } = props;

  return (
    <Pressable className="border border-gray-300/70 rounded-lg p-4 flex-row item-center gap-x-2 active:bg-gray-50">
      <Image
        className="bg-purple-50 rounded-full"
        source={{
          uri: formatPokemonSpriteUrl(extractPokemonId(url)),
        }}
        width={50}
        height={50}
      />
      <View className="flex-1 justify-center">
        <Text className="font-semibold text-lg capitalize flex-1 text-gray-900">
          {name}
        </Text>
        <Text className="font-light text-sm capitalize flex-1 text-gray-700">
          #{index + 1}
        </Text>
      </View>
    </Pressable>
  );
}
