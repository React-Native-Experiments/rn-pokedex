import { STAT_COLORS } from "@/constants/pokemon";
import { ColorValue, Text, View } from "react-native";
import { Progress } from "../ui/Progress";

interface PokemonStatsProps {
  stats: {
    base_stat: number;
    stat: { name: string };
  }[];
}

export function PokemonStats({ stats }: PokemonStatsProps) {
  const renderPokemonStat = (text: string, value: number, tint: ColorValue) => (
    <View key={text} className="flex-row items-center">
      <Text className="text-gray-600/80 w-16">{text}</Text>
      <Text className="text-gray-900 font-[500] mr-2">{value}</Text>
      <Progress color={tint} progress={value} />
    </View>
  );

  return (
    <View className="gap-4">
      <Text className="font-bold text-lg">Base Stats</Text>

      {stats.map((s) =>
        renderPokemonStat(
          s.stat.name,
          s.base_stat,
          STAT_COLORS[s.stat.name] ?? "#888",
        ),
      )}
    </View>
  );
}
