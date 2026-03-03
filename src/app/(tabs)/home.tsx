import { usePokemons } from "@/api/pokemon/queries";
import { Text, View } from "react-native";

export default function Index() {
  const {
    data: pokemons,
    isLoading: isPokemonLoading,
    isError: isPokemonError,
  } = usePokemons();

  if (isPokemonLoading) return;
  if (isPokemonError) return;
  if (!pokemons) return;

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {pokemons?.results.map((p) => (
        <Text key={p.url}> {p.name} </Text>
      ))}

      <Text>Edit app/index.tsx to edit this screen.</Text>
    </View>
  );
}
