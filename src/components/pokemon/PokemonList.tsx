import { GenericResource } from "@/types/resource";
import type { ReactNode } from "react";
import { FlatList, ListRenderItem } from "react-native";

interface PokemonListProps {
  data: GenericResource[];
  renderHeader: () => ReactNode;
  renderItem: ListRenderItem<GenericResource>;
  onEndReached: () => void;
}

// TODO: replace with flashlist
export function PokemonList(props: PokemonListProps) {
  const { data, renderHeader, renderItem, onEndReached } = props;

  return (
    <FlatList
      className="flex-1"
      ListHeaderComponent={renderHeader}
      data={data}
      renderItem={renderItem}
      keyExtractor={(item) => item.url}
      contentContainerStyle={{ gap: 8, paddingBottom: 70 }}
      onEndReached={onEndReached}
      onEndReachedThreshold={0.5}
    />
  );
}
