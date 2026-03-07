import { useFavoritesStore } from "@/stores/useFavoritesStore";
import { formatPokemonSpriteUrl } from "@/utils/formatters";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Image as ExpoImage } from "expo-image";
import { Link } from "expo-router";
import { Pressable, Text, View } from "react-native";

interface PokemonItemProps {
  id: string;
  name: string;
}

export function PokemonItem(props: PokemonItemProps) {
  const { name, id } = props;
  const { isFavorite, toggleFavorite } = useFavoritesStore();

  return (
    <Link
      href={{
        pathname: "/details",
        params: { pokemon_id: id },
      }}
      asChild
    >
      <Pressable className="item-center flex flex-row gap-x-2 rounded-lg border border-gray-300/70 p-4 active:bg-gray-50">
        <ExpoImage
          className="rounded-full bg-purple-50"
          source={formatPokemonSpriteUrl(id)}
          style={{ width: 50, height: 50 }}
          transition={200}
        />
        <View className="flex-1 justify-center">
          <Text className="flex-1 text-lg font-semibold capitalize text-gray-900">{name}</Text>
          <Text className="flex-1 text-sm font-light text-gray-700">#{id.padStart(4, "0")}</Text>
        </View>

        <Pressable
          className="aspect-square items-center justify-center rounded-full active:bg-rose-50/40"
          onPress={(e) => {
            e.stopPropagation();
            toggleFavorite({ id, name });
          }}
        >
          <Ionicons
            name={isFavorite(id) ? "heart" : "heart-outline"}
            size={20}
            color={isFavorite(id) ? "#f87171" : "#9ca3af"}
          />
        </Pressable>
      </Pressable>
    </Link>
  );
}
