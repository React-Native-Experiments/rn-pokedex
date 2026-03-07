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
      <Text className="w-16 text-gray-600/80">{text}</Text>
      <Text className="mr-2 font-[500] text-gray-900">{value}</Text>
      <Progress color={tint} progress={value} />
    </View>
  );

  return (
    <View className="gap-4">
      <Text className="text-lg font-bold">Base Stats</Text>

      {stats.map((s) => renderPokemonStat(s.stat.name, s.base_stat, STAT_COLORS[s.stat.name] ?? "#888"))}
    </View>
  );
}
