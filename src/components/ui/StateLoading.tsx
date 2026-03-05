import { COLORS } from "@/constants/theme";
import { ActivityIndicator, View } from "react-native";

export function StateLoading() {
  return (
    <View className="flex-1 items-center justify-center">
      <ActivityIndicator size="large" color={COLORS.primary[500]} />
    </View>
  );
}
