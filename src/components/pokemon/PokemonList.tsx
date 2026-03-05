import { GenericResource } from "@/types/resource";
import { FlatList, ListRenderItem } from "react-native";

interface PokemonListProps {
  data: GenericResource[];

  renderItem: ListRenderItem<GenericResource>;
  onEndReached: () => void;
}

// TODO: replace with flashlist
export function PokemonList(props: PokemonListProps) {
  const { data, renderItem, onEndReached } = props;

  return (
    <FlatList
      className="flex-1"
      data={data}
      renderItem={renderItem}
      keyExtractor={(item) => item.url}
      contentContainerStyle={{ gap: 8, paddingBottom: 70 }}
      onEndReached={onEndReached}
      onEndReachedThreshold={0.5}
      showsVerticalScrollIndicator={false}
      keyboardDismissMode="on-drag"
      keyboardShouldPersistTaps="never"
    />
  );
}
