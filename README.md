# Pokedex - Crash Course 2026

A modern React Native application built with Expo, showcasing a Pokedex implementation. 

## Tech Stack

- **Framework:** [Expo](https://expo.dev/) (React Native)
- **Routing:** [Expo Router](https://docs.expo.dev/router/introduction/) (File-based routing)
- **Styling:** [NativeWind](https://www.nativewind.dev/) (Tailwind CSS for React Native)
- **Data Fetching:** [React Query](https://tanstack.com/query/latest) (@tanstack/react-query)
- **Language:** TypeScript

## Prerequisites

Before you begin, ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v18 or newer recommended)
- [Yarn](https://yarnpkg.com/) or npm/bun
- [Expo CLI](https://docs.expo.dev/more/expo-cli/)

## Getting Started

1. **Install dependencies:**
   ```bash
   yarn install
   # or
   npm install
   # or
   bun install
   ```

2. **Start the development server:**
   ```bash
   yarn start
   # or
   npm start
   # or
   bun start
   ```

3. **Run the app:**
   - Press `a` in the terminal to open the app on an Android emulator.
   - Press `i` to open on an iOS simulator.
   - Press `w` to open on the web.
   - Alternatively, scan the QR code with the Expo Go app on your physical device.

## Project Structure

- `src/app/`: Contains the Expo Router file-based routing setup.
- `src/api/`: API queries and data fetching logic (React Query).
- `src/components/`: Reusable UI components.
- `src/hooks/`: Custom React hooks.
- `src/types/`: TypeScript definitions.
- `src/utils/`: Helper functions and formatters.
- `src/assets/`: Global CSS and static assets.

## Scripts

- `start`: Starts the Expo development server.
- `android`: Starts the server and opens the app on Android.
- `ios`: Starts the server and opens the app on iOS.
- `web`: Starts the server and opens the app on the web.
- `lint`: Runs Expo linting.

## License

This project is licensed under the MIT License.
