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
    <View className="rounded-full bg-white/30 px-3 py-1" key={type}>
      <Text className={"text-xs font-black uppercase text-white"}>{type}</Text>
    </View>
  );

  return (
    <View className="items-center justify-center gap-3 rounded-b-[40] bg-white pt-14" style={{ backgroundColor }}>
      <Text className="text-3xl font-bold capitalize text-white">{name}</Text>

      <View className="flex-row gap-2">{types.map((t, idx) => renderPokemonType(t))}</View>

      {artwork && (
        <ExpoImage source={artwork} style={{ width: 200, height: 200 }} contentFit="contain" transition={200} />
      )}
    </View>
  );
}
