import { Pressable, Text, View } from "react-native";

interface StateErrorProps {
  message?: string;
  onRetry?: () => void;
}

export function StateError({ message = "Something went wrong", onRetry }: StateErrorProps) {
  return (
    <View className="flex-1 items-center justify-center gap-3 p-6">
      <Text className="text-base font-semibold text-gray-900">{message}</Text>
      {onRetry && (
        <Pressable onPress={onRetry} className="rounded-full bg-primary-600 px-5 py-2 active:opacity-80">
          <Text className="font-semibold text-white">Try Again</Text>
        </Pressable>
      )}
    </View>
  );
}
