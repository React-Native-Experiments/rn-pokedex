import { Image as ExpoImage } from "expo-image";
import { Text, View } from "react-native";

interface PokemonHeroProps {
  name: string;
  types: string[];
  artwork?: string | null;
  backgroundColor: string;
}

export function PokemonHero(props: PokemonHeroProps) {
  const { name, types, artwork, backgroundColor } = props;

  const renderPokemonType = (type: string) => (
    <View className="bg-white/30 rounded-full px-3 py-1" key={type}>
      <Text className={"uppercase text-xs text-white font-black"}>{type}</Text>
    </View>
  );

  return (
    <View
      className="pt-14 items-center justify-center rounded-b-[40] gap-3 bg-white "
      style={{ backgroundColor }}
    >
      <Text className="capitalize text-white text-3xl font-bold">{name}</Text>

      <View className="flex-row gap-2">
        {types.map((t, idx) => renderPokemonType(t))}
      </View>

      {artwork && (
        <ExpoImage
          source={artwork}
          style={{ width: 200, height: 200 }}
          contentFit="contain"
          transition={200}
        />
      )}
    </View>
  );
}
