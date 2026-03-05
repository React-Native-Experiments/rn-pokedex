import { usePokemon } from "@/api/pokemon/queries";
import { Progress } from "@/components/ui/Progress";
import { StateError } from "@/components/ui/StateError";
import { StateLoading } from "@/components/ui/StateLoading";
import { STAT_COLORS, STAT_LABELS, getTypeColor } from "@/constants/pokemon";
import { isMobile } from "@/lib/platform";
import { cn } from "@/utils/css";
import { capitalize } from "@/utils/string";
import { Image as ExpoImage } from "expo-image";
import { useLocalSearchParams } from "expo-router";
import { ColorValue, ScrollView, Text, View } from "react-native";

export default function PokemonId() {
  const params = useLocalSearchParams<{ pokemon_id: string }>();

  const {
    data: pokemon,
    isLoading,
    isError,
    refetch,
  } = usePokemon(params.pokemon_id);

  const artwork = pokemon?.sprites.other?.["official-artwork"]?.front_default;
  const hasArtwork = !!artwork;

  if (isLoading) return <StateLoading />;
  if (isError)
    return <StateError message="Failed to load Pokemon" onRetry={refetch} />;
  if (!pokemon) return null;

  const typeColor = getTypeColor(pokemon.types[0].type.name);

  return (
    <View className="flex-1">
      <View
        className="absolute top-0 left-0 right-0 h-1/2"
        style={{ backgroundColor: typeColor }}
      />
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ minHeight: "100%", backgroundColor: "white" }}
      >
        {/* pokemon hero */}
        <View
          className="pt-14 items-center justify-center rounded-b-[40] gap-3 bg-white "
          style={{ backgroundColor: typeColor }}
        >
          <Text className="capitalize text-white text-3xl font-bold">
            {pokemon.name}
          </Text>

          <View className="flex-row gap-2">
            {pokemon.types.map((t, idx) => (
              <View className="bg-white/30 rounded-full px-3 py-1" key={idx}>
                <Text
                  className={cn(
                    "uppercase text-xs text-white font-black",
                    isMobile && "shadow-sm",
                  )}
                >
                  {t.type.name}
                </Text>
              </View>
            ))}
          </View>

          {hasArtwork && (
            <ExpoImage
              source={artwork}
              style={{ width: 200, height: 200 }}
              contentFit="contain"
              transition={200}
            />
          )}
        </View>

        <View className="p-6 pb-36 gap-4">
          <View className="flex-row justify-around">
            <View className="items-center">
              <Text className="text-gray-500 text-xs">Weight</Text>
              <Text className="text-gray-900 font-semibold">
                {(pokemon.weight / 10).toFixed(1)} kg
              </Text>
            </View>
            <View className="items-center">
              <Text className="text-gray-500 text-xs">Height</Text>
              <Text className="text-gray-900 font-semibold">
                {(pokemon.height / 10).toFixed(1)} m
              </Text>
            </View>
          </View>

          {/* status  */}
          <Text className="font-bold text-lg">Base Stats</Text>

          {pokemon.stats.map((s) => (
            <PokemonDetailsStatus
              key={s.stat.name}
              label={STAT_LABELS[s.stat.name] ?? s.stat.name}
              value={s.base_stat}
              color={STAT_COLORS[s.stat.name] ?? "#888"}
            />
          ))}

          {/* abilities */}
          <Text className="font-bold text-lg">Base Stats</Text>

          <View className="flex flex-row gap-2">
            {pokemon.abilities.map((a) => (
              <View
                key={a.ability.name}
                className="px-4 py-2 bg-gray-100 rounded-full flex flex-row gap-1"
              >
                <Text>{capitalize(a.ability.name)}</Text>
                {a.is_hidden && (
                  <Text className="text-gray-500 italic">(Hidden)</Text>
                )}
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
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
