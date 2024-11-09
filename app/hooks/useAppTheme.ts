import type { Theme, ThemeContexts } from "@/theme";
import {
	DefaultTheme,
	useTheme as useNavTheme,
} from "@react-navigation/native";
import * as SystemUI from "expo-system-ui";
import {
	createContext,
	useCallback,
	useContext,
	useEffect,
	useState,
} from "react";
import { useColorScheme } from "react-native";
import { UnistylesRuntime, useStyles } from "react-native-unistyles";

type ThemeContextType = {
	themeScheme: ThemeContexts;
	setThemeContextOverride: (newTheme: ThemeContexts) => void;
};

// create a React context and provider for the current theme
export const ThemeContext = createContext<ThemeContextType>({
	themeScheme: undefined, // default to the system theme
	setThemeContextOverride: (_newTheme: ThemeContexts) => {
		console.error(
			"Tried to call setThemeContextOverride before the ThemeProvider was initialized",
		);
	},
});

const setImperativeTheming = (backgroundColor: string) => {
	SystemUI.setBackgroundColorAsync(backgroundColor);
};

export const useThemeProvider = (initialTheme: ThemeContexts = undefined) => {
	const { theme } = useStyles();
	const colorScheme = useColorScheme();
	const [overrideTheme, setTheme] = useState<ThemeContexts>(initialTheme);

	const setThemeContextOverride = useCallback((newTheme: ThemeContexts) => {
		setTheme(newTheme);
		UnistylesRuntime.setTheme(newTheme || "light");
	}, []);

	const themeScheme = overrideTheme || colorScheme || "light";
	const navigationTheme = {
		...DefaultTheme,
		colors: {
			...DefaultTheme.colors,
			background: theme.colors.background,
			card: theme.colors.card,
			primary: theme.colors.tint,
			dark: theme.isDark,
			border: theme.colors.border,
			text: theme.colors.text,
		},
	};

	useEffect(() => {
		setImperativeTheming(theme.colors.background);
	}, [theme]);

	return {
		themeScheme,
		navigationTheme,
		setThemeContextOverride,
		ThemeProvider: ThemeContext.Provider,
	};
};

interface UseAppThemeValue {
	// The theme object from react-navigation
	navTheme: typeof DefaultTheme;
	// A function to set the theme context override (for switching modes)
	setThemeContextOverride: (newTheme: ThemeContexts) => void;
	// The current theme context "light" | "dark"
	themeContext: ThemeContexts;
}

/**
 * Custom hook that provides the app theme and utility functions for theming.
 *
 * @returns {UseAppThemeReturn} An object containing various theming values and utilities.
 * @throws {Error} If used outside of a ThemeProvider.
 */
export const useAppTheme = (): UseAppThemeValue => {
	const navTheme = useNavTheme();
	const context = useContext(ThemeContext);
	if (!context) {
		throw new Error("useTheme must be used within a ThemeProvider");
	}

	const { setThemeContextOverride } = context;

	const themeContext: ThemeContexts = UnistylesRuntime.themeName;

	return {
		navTheme,
		setThemeContextOverride,
		themeContext,
	};
};
