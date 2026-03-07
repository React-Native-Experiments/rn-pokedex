import { Text, View } from "react-native";

interface StateEmptyProps {
  message?: string;
}

export function StateEmpty({ message = "Nothing here yet" }: StateEmptyProps) {
  return (
    <View className="flex-1 items-center justify-center p-6">
      <Text className="text-base text-gray-400">{message}</Text>
    </View>
  );
}
