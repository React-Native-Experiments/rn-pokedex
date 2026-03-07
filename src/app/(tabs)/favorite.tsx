import { PokemonItem } from "@/components/pokemon/PokemonItem";
import { StateEmpty } from "@/components/ui/StateEmpty";
import { useFavoritesStore } from "@/stores/useFavoritesStore";
import { FlatList, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function Favorite() {
  const { favorites } = useFavoritesStore();
  const insets = useSafeAreaInsets();

  if (favorites.length === 0) {
    return <StateEmpty message="No favorites yet" />;
  }

  return (
    <View
      style={{ paddingTop: insets.top, paddingBottom: insets.bottom }}
      className="px-6 flex-1"
    >
      <Text className="text-3xl mt-10 mb-4">Favorites</Text>
      <FlatList
        className="flex-1"
        data={favorites}
        keyExtractor={(fav) => fav.id}
        renderItem={({ item }) => (
          <PokemonItem key={item.id} id={item.id} name={item.name} />
        )}
        contentContainerStyle={{ gap: 8, paddingBottom: 70 }}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}
