import { createPersistedStore } from "@/lib/persist";

interface FavoritesState {
  favorites: string[];
  toggleFavorite: (id: string) => void;
  isFavorite: (id: string) => boolean;
}

export const useFavoritesStore = createPersistedStore<FavoritesState>(
  "pokemon-favorites",
  (set, get) => ({
    favorites: [],
    isFavorite: (id: string) => get().favorites.includes(id),

    toggleFavorite: (id: string) => {
      const favorites = get().favorites;

      if (favorites.includes(id)) {
        return set({ favorites: favorites.filter((fav) => fav !== id) });
      }

      set({ favorites: [...favorites, id] });
    },
  }),
);
