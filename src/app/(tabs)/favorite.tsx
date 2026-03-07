import { usePokemon } from "@/api/pokemon/queries";
import { PokemonItem } from "@/components/pokemon/PokemonItem";
import { StateEmpty } from "@/components/ui/StateEmpty";
import { useFavoritesStore } from "@/stores/useFavoritesStore";
import { FlatList, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

function FavoritePokemonItem({ id }: { id: string }) {
  const { data: pokemon } = usePokemon(id);

  if (!pokemon) return null;

  return <PokemonItem id={id} name={pokemon.name} />;
}

export default function Favorite() {
  const { favorites } = useFavoritesStore();
  const insets = useSafeAreaInsets();

  return (
    <View
      style={{ paddingTop: insets.top, paddingBottom: insets.bottom }}
      className="px-6 flex-1"
    >
      <Text className="text-3xl mt-10 mb-4">Favorites</Text>

      {favorites.length === 0 ? (
        <StateEmpty message="No favorites yet" />
      ) : (
        <FlatList
          className="flex-1"
          data={favorites}
          keyExtractor={(id) => id}
          renderItem={({ item }) => <FavoritePokemonItem id={item} />}
          contentContainerStyle={{ gap: 8, paddingBottom: 70 }}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
}
