import { Icon, Label, NativeTabs } from "expo-router/unstable-native-tabs";

export default function TabLayout() {
  return (
    <NativeTabs iconColor={{ default: "#634ac94f", selected: "#644AC9" }}>
      <NativeTabs.Trigger name="index">
        <Label>Pokedex</Label>
        <Icon sf="square.grid.3x3.fill" />
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="favorite">
        <Icon sf={{ default: "heart", selected: "heart.fill" }} />
        <Label>Settings</Label>
      </NativeTabs.Trigger>
    </NativeTabs>
  );
}
