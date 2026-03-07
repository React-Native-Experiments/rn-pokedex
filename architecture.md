# architecture.md

## 1. Overview
The Pokedex application is a mobile-first project built with React Native and Expo, designed to browse and view detailed information about Pokemon using the PokeAPI. It provides a seamless cross-platform experience (iOS, Android, and Web) with infinite scrolling, name-based search with debouncing, and detailed statistics and abilities for each entry.

## 2. Tech Stack
| Technology | Version | Role |
| :--- | :--- | :--- |
| React | 19.1.0 | UI Library |
| React Native | 0.81.5 | Mobile Framework |
| Expo | 54.0.33 | Runtime & Tooling |
| Expo Router | 6.0.23 | File-based Routing |
| TanStack Query | 5.90.21 | State Management & Data Fetching |
| NativeWind | 4.2.2 | Tailwind CSS for React Native |
| TypeScript | 5.9.2 | Type Safety |
| MMKV | 4.2.0 | Fast, persistent key-value storage |
| usehooks-ts | 3.1.1 | React Hook utilities (e.g., debouncing) |

## 3. Project Structure
```text
src/
├── api/ pokemon/ queries.ts   # Custom hooks for fetching Pokemon data via TanStack Query
├── app/                       # Expo Router file-based route structure
│   ├── (tabs)/                # Tab-based navigation group
│   │   ├── home/              # Home tab stack navigation
│   │   │   ├── [pokemon_id].tsx # Individual Pokemon details (dynamic route)
│   │   │   ├── _layout.tsx    # Native stack layout for the Home tab
│   │   │   └── index.tsx      # Main Pokedex listing screen with search
│   │   ├── _layout.ios.tsx    # Platform-specific (iOS) tab configuration
│   │   ├── _layout.tsx        # Default tab bar layout
│   │   └── favorite.tsx       # Favorites screen (empty state)
│   ├── _layout.tsx            # Global app layout with QueryClientProvider
│   └── index.tsx              # Root entry point with redirect to home
├── assets/ global.css         # Tailwind CSS entry point
├── components/
│   ├── pokemon/               # Pokemon-specific UI components
│   │   ├── PokemonAbilities.tsx # Displays ability list and hidden status
│   │   ├── PokemonAbout.tsx     # Displays height and weight
│   │   ├── PokemonHero.tsx      # Top section with name, types, and artwork
│   │   ├── PokemonItem.tsx      # List item for the Pokedex index
│   │   ├── PokemonList.tsx      # Optimized FlatList wrapper for Pokemon
│   │   └── PokemonStats.tsx     # Animated progress bars for battle stats
│   └── ui/                    # Generic shared UI components
│       ├── Progress.tsx       # Reusable progress bar
│       ├── StateEmpty.tsx     # Component for empty list states
│       ├── StateError.tsx     # Component for handling fetch errors with retry
│       └── StateLoading.tsx   # Loading spinner/state screen
├── constants/
│   ├── pokemon.ts             # Type color mappings and stat labels
│   └── theme.ts               # Custom color palette definitions
├── hooks/
│   ├── useFavoritesMK.ts      # Placeholder for MMKV-based persistent favorites
│   └── usePokemonSearch.ts    # Logic for debounced name-based filtering
├── lib/ http.ts               # Simplified Fetch-based HTTP client wrapper
├── types/                     # Centralized TypeScript definitions for API responses
│   ├── pokemon.ts             # Pokemon and list interfaces
│   └── resource.ts            # Common API resource types
└── utils/                     # Shared helper functions
    ├── css.ts                 # Styling utilities (cn helper)
    ├── extractors.ts          # Logic for parsing IDs from API URLs
    ├── formatters.ts          # URL and string formatting (e.g., sprite URLs)
    ├── math.ts                # Mathematical helpers (e.g., clamp)
    └── string.ts              # String manipulation (e.g., capitalize)
```

## 4. Routing & Navigation
The application implements **Expo Router** with a nested hierarchy:
- **Root Layout (`src/app/_layout.tsx`)**: Wraps the application in a `QueryClientProvider` and a root `Stack` navigator.
- **Redirect Index (`src/app/index.tsx`)**: Automatically redirects users to the `/(tabs)/home` route.
- **Tab Navigation (`src/app/(tabs)/_layout.tsx`)**: Defines a bottom tab bar with "Pokedex" (home) and "Favorites" (favorite) icons.
- **Home Stack (`src/app/(tabs)/home/_layout.tsx`)**: Manages the navigation transition between the Pokemon list and the detail view.
- **Dynamic Routing**: The `[pokemon_id].tsx` file uses dynamic segments to handle parameters passed via the Pokedex list.

## 5. Data Layer
Data flows from the PokeAPI through a standardized pipeline:
- **API Client (`src/lib/http.ts`)**: Encapsulates `fetch` logic and query parameter serialization.
- **Query Hooks (`src/api/pokemon/queries.ts`)**:
    - `useInfinitePokemons`: Manages paginated list state and fetches more results on scroll.
    - `usePokemon`: Retrieves specific entity details based on the dynamic route parameter.
- **Search & Filtering (`src/hooks/usePokemonSearch.ts`)**: Implements client-side filtering on the fetched pages using a debounced search term (300ms) to ensure smooth performance.
- **Persistence**: Includes `react-native-mmkv` for high-performance data persistence, primarily intended for storing user favorites.

## 6. Styling
- **NativeWind**: Utilizes Tailwind CSS utility classes within the `className` prop for consistent styling across platforms.
- **Dynamic Theming**: Background colors and UI accents are dynamically derived from the Pokemon's primary type using the `getTypeColor` helper and `TYPE_COLORS` constant.
- **Custom Constants**: Centralized theme colors (e.g., primary palette in `src/constants/theme.ts`) ensure design consistency.
- **Utilities (`src/utils/css.ts`)**: Includes a `cn` helper that combines `clsx` and `tailwind-merge` to handle conditional styles and resolve Tailwind conflicts.

## 7. Conventions & Patterns
- **Separation of Concerns**: UI components (Hero, Stats, About) are separated from data-fetching logic (Query Hooks) and filtering logic (Search Hooks).
- **State Feedback**: Systematic use of `StateLoading`, `StateError`, and `StateEmpty` across all screens to provide consistent user feedback.
- **Path Aliasing**: Uses the `@/` prefix (configured in `tsconfig.json`) to reference the `src/` directory.
- **Debouncing Pattern**: Uses `useDebounceValue` from `usehooks-ts` for search inputs to minimize unnecessary re-renders and filtering logic.

## 8. Current Gaps
- **Persistence Logic (`src/hooks/useFavoritesMK.ts`)**: The hook for managing favorites via MMKV is currently a placeholder (0 bytes) and needs full implementation.
- **Favorites Integration (`src/app/(tabs)/favorite.tsx`)**: The Favorites screen correctly shows an empty state but lacks the logic to display and manage a list of saved Pokemon.
- **Detail View Polish**: Additional Pokemon data such as "About" text (flavor text) or evolutionary chains could be added to complete the detail experience.
