import { capitalize } from "@/utils/string";
import { Text, View } from "react-native";

interface PokemonAbilitiesProps {
  abilities: {
    ability: string;
    is_hidden: boolean;
  }[];
}

export function PokemonAbilities(props: PokemonAbilitiesProps) {
  const { abilities } = props;

  const renderPokemonAbility = (ability: string, isHidden: boolean) => (
    <View
      key={ability}
      className="px-4 py-2 bg-gray-100 rounded-full flex flex-row gap-1"
    >
      <Text>{capitalize(ability)}</Text>
      {isHidden && <Text className="text-gray-500 italic">(Hidden)</Text>}
    </View>
  );

  return (
    <View className="gap-4">
      <Text className="font-bold text-lg">Abilities</Text>
      <View className="flex flex-row gap-2">
        {abilities.map((a) => renderPokemonAbility(a.ability, a.is_hidden))}
      </View>
    </View>
  );
}
