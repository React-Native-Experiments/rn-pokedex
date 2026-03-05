import { usePokemon } from "@/api/pokemon/queries";
import { Progress } from "@/components/ui/Progress";
import { STAT_COLORS, STAT_LABELS, getTypeColor } from "@/constants/pokemon";
import { useLocalSearchParams } from "expo-router";
import { ColorValue, Image, ScrollView, Text, View } from "react-native";

export default function PokemonId() {
  const params = useLocalSearchParams<{ pokemon_id: string }>();

  const { data: pokemon, isLoading, isError } = usePokemon(params.pokemon_id);

  const artwork = pokemon?.sprites.other?.["official-artwork"]?.front_default;
  const hasArtwork = !!artwork;

  if (isLoading) return;
  if (isError) return;
  if (!pokemon) return;

  const typeColor = getTypeColor(pokemon.types[0].type.name);

  return (
    <ScrollView
      className="flex-1"
      contentContainerStyle={{ minHeight: "100%" }}
    >
      <View
        className="pt-14 pb-20 items-center justify-center rounded-b-[40] gap-3"
        style={{ backgroundColor: typeColor }}
      >
        <Text className="capitalize text-white text-3xl font-bold">
          {pokemon.name}
        </Text>

        <View className="flex-row gap-2">
          {pokemon.types.map((t, idx) => (
            <View className="bg-white/30 rounded-full px-3 py-1" key={idx}>
              <Text className="uppercase text-xs text-white font-black shadow-md">
                {t.type.name}
              </Text>
            </View>
          ))}
        </View>

        {hasArtwork && (
          <Image
            source={{ uri: artwork, width: 200, height: 200 }}
            resizeMode="contain"
          />
        )}
      </View>

      <View className="p-6">
        <Text className="font-bold text-lg mb-3">Base Stats</Text>

        {pokemon.stats.map((s) => (
          <PokemonDetailsStatus
            key={s.stat.name}
            label={STAT_LABELS[s.stat.name] ?? s.stat.name}
            value={s.base_stat}
            color={STAT_COLORS[s.stat.name] ?? "#888"}
          />
        ))}
      </View>
    </ScrollView>
  );
}

interface PokemonStatus {
  label: string;
  value: number;
  color: ColorValue;
}

export function PokemonDetailsStatus(props: PokemonStatus) {
  const { label, value, color } = props;

  return (
    <View className="flex-row items-center">
      <Text className="text-gray-600/80 w-16">{label}</Text>
      <Text className="text-gray-900 font-[500] mr-2">{value}</Text>
      <Progress color={color} progress={value} />
    </View>
  );
}
