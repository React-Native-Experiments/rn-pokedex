import { GenericResource } from "@/types/resource";
import { FlashList, ListRenderItem } from "@shopify/flash-list";

interface PokemonListProps {
  data: GenericResource[];
  renderItem: ListRenderItem<GenericResource>;
  onEndReached: () => void;
}

export function PokemonList(props: PokemonListProps) {
  const { data, renderItem, onEndReached } = props;

  return (
    <FlashList
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
