import { formatPokemonSpriteUrl } from "@/utils/formatters";
import { Image as ExpoImage } from "expo-image";
import { Link } from "expo-router";
import { Text, View } from "react-native";

interface PokemonItemProps {
  id: string;
  name: string;
}

export function PokemonItem(props: PokemonItemProps) {
  const { name, id } = props;

  return (
    <Link
      className="border border-gray-300/70 rounded-lg p-4 flex-row item-center gap-x-2 active:bg-gray-50"
      href={{
        pathname: "/(tabs)/home/[pokemon_id]",
        params: { pokemon_id: id },
      }}
    >
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
    </Link>
  );
}
