import { usePokemon } from "@/api/pokemon/queries";
import { PokemonAbilities } from "@/components/pokemon/PokemonAbilities";
import { PokemonAbout } from "@/components/pokemon/PokemonAbout";
import { PokemonHero } from "@/components/pokemon/PokemonHero";
import { PokemonStats } from "@/components/pokemon/PokemonStats";
import { StateError } from "@/components/ui/StateError";
import { StateLoading } from "@/components/ui/StateLoading";
import { getTypeColor } from "@/constants/pokemon";
import { useLocalSearchParams } from "expo-router";
import { ScrollView, View } from "react-native";

export default function Modal() {
  const params = useLocalSearchParams<{ pokemon_id: string }>();

  const { data: pokemon, isLoading, isError, refetch } = usePokemon(params.pokemon_id);

  if (isLoading) return <StateLoading />;
  if (isError) return <StateError message="Failed to load Pokemon" onRetry={refetch} />;
  if (!pokemon) return null;

  const typeColor = getTypeColor(pokemon.types[0].type.name);
  const artwork = pokemon.sprites.other?.["official-artwork"]?.front_default;

  return (
    <View className="flex-1">
      {/* a workaround for ios
      if you pull too much it usually shows the white background
      so this square stays behind keeping the color  */}
      <View className="absolute left-0 right-0 top-0 h-1/2" style={{ backgroundColor: typeColor }} />

      <ScrollView className="flex-1" contentContainerStyle={{ minHeight: "100%", backgroundColor: "white" }}>
        <PokemonHero
          name={pokemon.name}
          types={pokemon.types.map((t) => t.type.name)}
          artwork={artwork}
          backgroundColor={typeColor}
        />

        <View className="gap-4 p-6 pb-36">
          <PokemonAbout weight={pokemon.weight} height={pokemon.height} />
          <PokemonStats stats={pokemon.stats} />
          <PokemonAbilities
            abilities={pokemon.abilities.map((a) => ({
              ability: a.ability.name,
              is_hidden: a.is_hidden,
            }))}
          />
        </View>
      </ScrollView>
    </View>
  );
}
