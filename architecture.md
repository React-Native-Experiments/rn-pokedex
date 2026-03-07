# architecture.md

## 1. Overview
The Pokedex application is a mobile-first project built with React Native and Expo, designed to browse and view detailed information about Pokemon using the PokeAPI. It provides a seamless cross-platform experience (iOS, Android, and Web) with infinite scrolling via FlashList, name-based search with debouncing, and detailed statistics and abilities for each entry.

## 2. Tech Stack
| Technology | Version | Role |
| :--- | :--- | :--- |
| React | 19.1.0 | UI Library |
| React Native | 0.81.5 | Mobile Framework |
| Expo | 54.0.33 | Runtime & Tooling |
| Expo Router | 6.0.23 | File-based Routing |
| TanStack Query | 5.90.21 | Server State & Data Fetching |
| Zustand | 5.0.11 | Client State Management (Favorites) |
| NativeWind | 4.2.2 | Tailwind CSS for React Native |
| TypeScript | 5.9.2 | Type Safety |
| react-native-mmkv | 4.2.0 | High-performance, persistent key-value storage |
| expo-image | 3.0.11 | Optimized image loading and caching |
| usehooks-ts | 3.1.1 | React Hook utilities (e.g., debouncing) |
| FlashList | 2.0.2 | High-performance list rendering |

## 3. Project Structure
```text
src/
├── api/
│   └── pokemon/
│       └── queries.ts       # Custom hooks for fetching Pokemon data via TanStack Query
├── app/                     # Expo Router file-based route structure
│   ├── (tabs)/              # Tab-based navigation group
│   │   ├── _layout.ios.tsx  # Platform-specific (iOS) native tab configuration
│   │   ├── _layout.tsx      # Default cross-platform tab bar layout
│   │   ├── favorite.tsx     # Favorites screen displaying saved Pokemon
│   │   └── home.tsx         # Main Pokedex listing screen with search
│   ├── _layout.tsx          # Global app layout with QueryClientProvider & Modal setup
│   ├── details.tsx          # Pokemon details screen (presented as a modal)
│   └── index.tsx            # Root entry point with redirect to home
├── assets/
│   └── global.css           # Tailwind CSS (NativeWind) entry point
├── components/
│   ├── pokemon/             # Pokemon-specific UI components
│   │   ├── PokemonAbilities.tsx # Displays ability list and hidden status
│   │   ├── PokemonAbout.tsx     # Displays height and weight
│   │   ├── PokemonHero.tsx      # Top section with name, types, and artwork
│   │   ├── PokemonItem.tsx      # List item with favorite toggle and detail link
│   │   ├── PokemonList.tsx      # Optimized FlashList wrapper for Pokemon
│   │   └── PokemonStats.tsx     # Displays battle stats using Progress bars
│   └── ui/                  # Generic shared UI components
│       ├── Progress.tsx     # Reusable progress bar
│       ├── StateEmpty.tsx   # Component for empty list states
│       ├── StateError.tsx   # Component for handling fetch errors with retry
│       └── StateLoading.tsx # Loading spinner/state screen
├── constants/
│   ├── pokemon.ts           # Type color mappings, stat colors, and labels
│   └── theme.ts             # Custom color palette definitions
├── hooks/
│   └── usePokemonSearch.ts  # Logic for debounced name-based filtering
├── lib/
│   ├── http.ts              # Fetch-based HTTP client wrapper
│   └── persist.ts           # Zustand + MMKV persistence configuration
├── stores/
│   └── useFavoritesStore.ts # Zustand store for managing favorite Pokemon
├── types/                   # Centralized TypeScript definitions
│   ├── pokemon.ts           # Pokemon and list interfaces
│   └── resource.ts          # Common API resource types
└── utils/                   # Shared helper functions
    ├── css.ts               # Styling utilities (cn helper)
    ├── extractors.ts        # Logic for parsing IDs from API URLs
    ├── formatters.ts        # URL and sprite formatting
    ├── math.ts              # Mathematical helpers (e.g., clamp)
    └── string.ts            # String manipulation (e.g., capitalize)
```

## 4. Routing & Navigation
The application implements **Expo Router** with a flattened hierarchical structure:
- **Root Layout (`src/app/_layout.tsx`)**: Wraps the application in a `QueryClientProvider` and a root `Stack` navigator. It defines the `details` route as a modal presentation.
- **Redirect Index (`src/app/index.tsx`)**: Automatically redirects users to the `/(tabs)/home` route.
- **Tab Navigation (`src/app/(tabs)/_layout.tsx`)**: Defines a bottom tab bar with "Pokedex" (home) and "Favorites" (favorite) icons.
- **Modal Detail View (`src/app/details.tsx`)**: A top-level route that displays detailed Pokemon information, accessed via the `pokemon_id` search parameter from the list views.

## 5. Data Layer
Data flows from the PokeAPI through a standardized pipeline:
- **API Client (`src/lib/http.ts`)**: Encapsulates `fetch` logic and query parameter serialization.
- **Query Hooks (`src/api/pokemon/queries.ts`)**:
    - `useInfinitePokemons`: Manages paginated list state and fetches more results on scroll.
    - `usePokemon`: Retrieves specific entity details based on the `pokemon_id` parameter.
- **Search & Filtering (`src/hooks/usePokemonSearch.ts`)**: Implements client-side filtering on the fetched pages using a debounced search term (300ms) to ensure smooth performance.
- **Persistence**: Uses `Zustand` with a custom `MMKV` storage adapter (`src/lib/persist.ts`) for high-performance data persistence of user favorites.

## 6. Styling
- **NativeWind**: Utilizes Tailwind CSS utility classes within the `className` prop for consistent styling across platforms.
- **Dynamic Theming**: Background colors and UI accents are dynamically derived from the Pokemon's primary type using the `getTypeColor` helper and `TYPE_COLORS` constant.
- **Custom Constants**: Centralized theme colors (e.g., primary palette in `src/constants/theme.ts`) ensure design consistency.
- **Utilities (`src/utils/css.ts`)**: Includes a `cn` helper that combines `clsx` and `tailwind-merge` to handle conditional styles and resolve Tailwind conflicts.

## 7. Conventions & Patterns
- **Separation of Concerns**: UI components are separated from data-fetching logic (Query Hooks) and global state (Zustand Stores).
- **Persistent State**: Global state requiring persistence (like favorites) is abstracted into stores with middleware handling the sync to MMKV via a custom `createPersistedStore` helper.
- **Performance Optimization**: Use of `@shopify/flash-list` for the main Pokedex list to ensure high-performance rendering on both Android and iOS.
- **State Feedback**: Systematic use of `StateLoading`, `StateError`, and `StateEmpty` across all screens to provide consistent user feedback.
- **Path Aliasing**: Uses the `@/` prefix (configured in `tsconfig.json`) to reference the `src/` directory.
