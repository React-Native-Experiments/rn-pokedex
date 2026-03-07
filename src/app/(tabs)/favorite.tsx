import { PokemonItem } from "@/components/pokemon/PokemonItem";
import { PokemonList } from "@/components/pokemon/PokemonList";
import { StateEmpty } from "@/components/ui/StateEmpty";
import { useFavoritesStore } from "@/stores/useFavoritesStore";
import { Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function Favorite() {
  const { favorites } = useFavoritesStore();
  const insets = useSafeAreaInsets();

  if (favorites.length === 0) {
    return <StateEmpty message="No favorites yet" />;
  }

  return (
    <View style={{ paddingTop: insets.top, paddingBottom: insets.bottom }} className="flex-1 gap-6 px-6">
      <View className="mt-10 gap-1">
        <Text className="text-4xl font-bold tracking-tight text-gray-900">Favorites</Text>
        <Text className="text-sm text-gray-500">Your personal collection</Text>
      </View>

      <PokemonList
        data={favorites}
        renderItem={({ item }) => <PokemonItem key={item.id} id={item.id} name={item.name} />}
      />
    </View>
  );
}
