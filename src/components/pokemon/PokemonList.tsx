import { FlashList, ListRenderItem } from "@shopify/flash-list";
import { View } from "react-native";

interface PokemonListProps<T> {
  data: T[];
  renderItem: ListRenderItem<T>;
  onEndReached?: () => void;
}

export function PokemonList<T>(props: PokemonListProps<T>) {
  const { data, renderItem, onEndReached } = props;

  return (
    <FlashList
      data={data}
      renderItem={renderItem}
      keyExtractor={(_, index) => String(index)}
      ItemSeparatorComponent={() => <View style={{ height: 8 }} />}
      contentContainerStyle={{ paddingBottom: 70 }}
      onEndReached={onEndReached}
      onEndReachedThreshold={0.5}
      showsVerticalScrollIndicator={false}
      keyboardDismissMode="on-drag"
      keyboardShouldPersistTaps="never"
    />
  );
}
