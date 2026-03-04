import { usePokemons } from "@/api/pokemon/queries";
import { extractPokemonId } from "@/utils/extractors";
import { formatPokemonSpriteUrl } from "@/utils/formatters";
import { FlatList, Image, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function Index() {
  const {
    data: pokemons,
    isLoading: isPokemonLoading,
    isError: isPokemonError,
  } = usePokemons();

  const { top } = useSafeAreaInsets();

  if (isPokemonLoading) return;
  if (isPokemonError) return;
  if (!pokemons) return;

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingTop: top,
      }}
    >
      <FlatList
        data={pokemons.results}
        renderItem={({ item }) => (
          <View>
            <Image
              source={{
                uri: formatPokemonSpriteUrl(extractPokemonId(item.url)),
              }}
              width={50}
              height={50}
            />
            <Text>{item.name}</Text>
          </View>
        )}
      />

      <Text>Edit app/index.tsx to edit this screen.</Text>
    </View>
  );
}
