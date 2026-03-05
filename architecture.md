# architecture.md

## 1. Overview
The Pokedex application is a mobile-first project built with React Native and Expo, designed to browse and view detailed information about Pokemon using the PokeAPI. It provides a seamless cross-platform experience (iOS, Android, and Web) with infinite scrolling for browsing, detailed statistics for individual entries, and a placeholder for favorite management.

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

## 3. Project Structure
```text
src/
├── api/ pokemon/ queries.ts   # Custom hooks for fetching Pokemon data via TanStack Query
├── app/                       # Expo Router file-based route structure
│   ├── (tabs)/                # Tab-based navigation group
│   │   ├── home/              # Home tab stack navigation
│   │   │   ├── [pokemon_id].tsx # Individual Pokemon details (dynamic route)
│   │   │   ├── _layout.tsx    # Native stack layout for the Home tab
│   │   │   └── index.tsx      # Main Pokedex listing screen
│   │   ├── _layout.ios.tsx    # Platform-specific (iOS) tab configuration
│   │   ├── _layout.tsx        # Default tab bar layout
│   │   └── favorite.tsx       # Favorites screen (boilerplate)
│   ├── _layout.tsx            # Global app layout with QueryClientProvider
│   └── index.tsx              # Root entry point with redirect to home
├── assets/ global.css         # Tailwind CSS entry point
├── components/ ui/ Progress.tsx # Shared UI components (e.g., progress bars)
├── hooks/ useRefreshOnFocus.ts # Utility hook to refetch queries when screens gain focus
├── lib/ http.ts               # Simplified Fetch-based HTTP client wrapper
├── types/                     # Centralized TypeScript definitions for API responses
│   ├── pokemon.ts             # Pokemon and list interfaces
│   └── resource.ts            # Common API resource types
└── utils/                     # Shared helper functions
    ├── css.ts                 # Styling utilities (cn helper)
    ├── extractors.ts          # Logic for parsing IDs from API URLs
    ├── formatters.ts          # URL and string formatting (e.g., sprite URLs)
    └── math.ts                # Mathematical helpers (e.g., clamp)
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
    - `useInfinitePokemons`: Uses `useInfiniteQuery` to manage paginated list state and fetch more results on scroll.
    - `usePokemon`: Uses `useQuery` to retrieve specific entity details based on the dynamic route parameter.
- **Type Safety**: All API interactions are strictly typed using interfaces in `src/types/`, ensuring predictable data handling throughout the UI.

## 6. Styling
- **NativeWind**: Allows the use of Tailwind CSS utility classes within the `className` prop of React Native components.
- **Theming (`theme.config.js`)**: Extends the Tailwind theme with a custom `primary` palette and a `pokemon` palette containing colors mapped to Pokemon types (e.g., `pokemon-fire`, `pokemon-water`).
- **Utilities (`src/utils/css.ts`)**: Includes a `cn` helper that combines `clsx` and `tailwind-merge` to handle conditional styles and resolve Tailwind conflicts effectively.

## 7. Conventions & Patterns
- **Separation of Concerns**: Data fetching is isolated in `api/`, while UI components remain focused on presentation.
- **Custom Hook Encapsulation**: TanStack Query implementations are abstracted into hooks like `usePokemon` for reusability.
- **Path Aliasing**: Uses the `@/` prefix (configured in `tsconfig.json`) to reference the `src/` directory.
- **Component Patterns**: Combines Tailwind utilities for layout with `react-native-safe-area-context` for handling device notches and insets.

## 8. Current Gaps
- **Incomplete Screen (`src/app/(tabs)/favorite.tsx`)**: The Favorites tab is currently a static boilerplate text.
- **UI Gaps (`src/app/(tabs)/home/[pokemon_id].tsx`)**:
    - Detailed statistics are currently hardcoded with placeholder values (e.g., "HP 45").
    - Background colors for Pokemon cards are not yet dynamically mapped to their specific types (e.g., `bg-pokemon-grass` is hardcoded).
    - Contains developer `TODO` comments indicating pending implementation of API data consumption.
- **State Feedback**: Missing robust loading spinners or error screens in the main Pokemon list and detail views.
