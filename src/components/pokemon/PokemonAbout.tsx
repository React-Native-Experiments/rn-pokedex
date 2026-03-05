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
        <Text className="text-gray-500 text-xs">Weight</Text>
        <Text className="text-gray-900 font-semibold">
          {(weight / 10).toFixed(1)} kg
        </Text>
      </View>
      <View className="items-center">
        <Text className="text-gray-500 text-xs">Height</Text>
        <Text className="text-gray-900 font-semibold">
          {(height / 10).toFixed(1)} m
        </Text>
      </View>
    </View>
  );
}
