import { createMMKV } from "react-native-mmkv";
import { create, StateCreator } from "zustand";
import { createJSONStorage, persist, StateStorage } from "zustand/middleware";

const mmkv = createMMKV({ id: "app-storage" });

const mmkvStorage: StateStorage = {
  getItem: (key) => mmkv.getString(key) ?? null,
  setItem: (key, value) => mmkv.set(key, value),
  removeItem: (key) => mmkv.remove(key),
};

export function createPersistedStore<T>(
  name: string,
  initializer: StateCreator<T, [["zustand/persist", unknown]]>,
) {
  return create<T>()(
    persist(initializer, {
      name,
      storage: createJSONStorage(() => mmkvStorage),
    }),
  );
}
