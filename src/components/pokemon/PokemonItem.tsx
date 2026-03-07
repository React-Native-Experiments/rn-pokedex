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
  const { isFavorite, toggleFavorite } = useFavoritesStore();

  const { name, id } = props;

  return (
    <Link
      href={{
        pathname: "/(tabs)/home/[pokemon_id]",
        params: { pokemon_id: id },
      }}
      asChild
    >
      <View className="border border-gray-300/70 rounded-lg p-4 flex flex-row item-center gap-x-2 active:bg-gray-50 ">
        <ExpoImage
          className="bg-purple-50 rounded-full"
          source={formatPokemonSpriteUrl(id)}
          style={{ width: 50, height: 50 }}
          transition={200}
        />
        <View className="flex-1 justify-center">
          <Text className="font-semibold text-lg capitalize flex-1 text-gray-900">
            {name}
          </Text>
          <Text className="font-light text-sm flex-1 text-gray-700">
            #{id.padStart(4, "0")}
          </Text>
        </View>

        <Pressable
          className="items-center justify-center aspect-square"
          onPress={() => toggleFavorite(id)}
        >
          <Ionicons
            name={isFavorite(id) ? "heart" : "heart-outline"}
            size={20}
            color={isFavorite(id) ? "#f87171" : "#9ca3af"}
          />
        </Pressable>
      </View>
    </Link>
  );
}
