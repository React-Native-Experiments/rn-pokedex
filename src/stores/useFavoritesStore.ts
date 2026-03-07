import { createPersistedStore } from "@/lib/persist";

export interface Favorite {
  id: string;
  name: string;
}

interface FavoritesState {
  favorites: Favorite[];
  toggleFavorite: (favorite: Favorite) => void;
  isFavorite: (id: string) => boolean;
}

export const useFavoritesStore = createPersistedStore<FavoritesState>("pokemon-favorites", (set, get) => ({
  favorites: [],
  isFavorite: (id: string) => get().favorites.some((fav) => fav.id === id),

  toggleFavorite: (favorite: Favorite) => {
    const favorites = get().favorites;

    if (favorites.some((fav) => fav.id === favorite.id)) {
      return set({ favorites: favorites.filter((fav) => fav.id !== favorite.id) });
    }

    set({ favorites: [...favorites, favorite] });
  },
}));
