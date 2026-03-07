import { clamp } from "@/utils/math";
import { ColorValue, DimensionValue, View } from "react-native";

interface ProgressProps {
  progress: number;
  color: ColorValue;
  height?: DimensionValue;
}

export function Progress({ progress, color, height = 10 }: ProgressProps) {
  const progressPercentage = clamp(progress, 0, 100);

  return (
    <View className="flex-1 overflow-hidden rounded-full bg-gray-300/50" style={{ height }}>
      <View
        className="h-full rounded-full"
        style={{
          width: `${progressPercentage}%`,
          backgroundColor: color,
        }}
      />
    </View>
  );
}
