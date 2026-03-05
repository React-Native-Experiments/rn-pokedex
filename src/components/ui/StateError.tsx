import { Pressable, Text, View } from "react-native";

interface StateErrorProps {
  message?: string;
  onRetry?: () => void;
}

export function StateError({
  message = "Something went wrong",
  onRetry,
}: StateErrorProps) {
  return (
    <View className="flex-1 items-center justify-center p-6 gap-3">
      <Text className="text-gray-900 font-semibold text-base">{message}</Text>
      {onRetry && (
        <Pressable
          onPress={onRetry}
          className="bg-primary-600 rounded-full px-5 py-2 active:opacity-80"
        >
          <Text className="text-white font-semibold">Try Again</Text>
        </Pressable>
      )}
    </View>
  );
}
