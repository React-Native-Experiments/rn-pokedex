import { Text, View } from "react-native";

interface PokemonAboutProps {
  weight: number;
  height: number;
}

export function PokemonAbout(props: PokemonAboutProps) {
  const { weight, height } = props;

  return (
    <View className="flex-row justify-around">
      <View className="items-center">
        <Text className="text-xs text-gray-500">Weight</Text>
        <Text className="font-semibold text-gray-900">{(weight / 10).toFixed(1)} kg</Text>
      </View>
      <View className="items-center">
        <Text className="text-xs text-gray-500">Height</Text>
        <Text className="font-semibold text-gray-900">{(height / 10).toFixed(1)} m</Text>
      </View>
    </View>
  );
}
