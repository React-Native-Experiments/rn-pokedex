import { Platform } from "react-native";

// mobile
export const isAndroid = Platform.OS === "android";
export const isIOS = Platform.OS === "ios";

// desktop
export const isWindows = Platform.OS === "windows";
export const isMac = Platform.OS === "macos";

// generic
export const isMobile = isAndroid || isIOS;
export const isDesktop = isWindows || isMac;
export const isWeb = Platform.OS === "web";
