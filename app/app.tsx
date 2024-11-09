import { createStaticNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { View, Text, Button, LayoutAnimation } from "react-native";
import { customFontsToLoad } from "@/theme";
import { useFonts } from "expo-font";
import { createStyleSheet, useStyles } from "react-native-unistyles";
import { useAppTheme, useThemeProvider } from "@/hooks/useAppTheme";

function HomeScreen() {
	const { styles } = useStyles($styles);
	const { setThemeContextOverride, themeContext } = useAppTheme();

	return (
		<View style={styles.container}>
			<Text style={styles.text}>Home Screen</Text>
			<Button
    onPress={() => {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut); // Animate the transition
      setThemeContextOverride(themeContext === "dark" ? "light" : "dark");
    }}
    title={`Switch Theme: ${themeContext}`}
  />
		</View>
	);
}

const $styles = createStyleSheet(theme => ({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: theme.colors.background,
	},
	text: {
		color: theme.colors.text,
		fontFamily: theme.typography.primary.normal,
	},
}));

const RootStack = createNativeStackNavigator({
	screens: {
		Home: HomeScreen,
	},
});

const Navigation = createStaticNavigation(RootStack);

function App() {
	const { themeScheme, navigationTheme, setThemeContextOverride, ThemeProvider } = useThemeProvider()
	const [areFontsLoaded, fontLoadError] = useFonts(customFontsToLoad);

	if (!areFontsLoaded && !fontLoadError) {
		return null;
	}

	return (
		<ThemeProvider value={{ themeScheme, setThemeContextOverride }}>
			<Navigation theme={navigationTheme} />
		</ThemeProvider>
	);
}

export default App;
