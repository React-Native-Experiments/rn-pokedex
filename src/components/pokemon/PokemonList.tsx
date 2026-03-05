import { GenericResource } from "@/types/resource";
import { FlatList, ListRenderItem, Text, View } from "react-native";

interface PokemonListProps {
  data: GenericResource[];
  renderItem: ListRenderItem<GenericResource>;
  onEndReached: () => void;
}

// TODO: replace with flashlist
export function PokemonList({
  data,
  renderItem,
  onEndReached,
}: PokemonListProps) {
  return (
    <FlatList
      className="flex-1"
      ListHeaderComponent={() => (
        <View>
          <Text className="text-3xl mt-10 mb-2">Pokemons</Text>
        </View>
      )}
      data={data}
      renderItem={renderItem}
      keyExtractor={(item) => item.url}
      contentContainerStyle={{ gap: 8, paddingBottom: 70 }}
      onEndReached={onEndReached}
      onEndReachedThreshold={0.5}
    />
  );
}
