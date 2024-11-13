import { Screen } from "@/components";
import { useThemeProvider } from "@/hooks";
import { navigationStore$ } from "@/navigation-store";
import { customFontsToLoad } from "@/theme";
import { observer } from "@legendapp/state/react";
import { useLogger } from "@react-navigation/devtools";
import {
	type StaticParamList,
	createStaticNavigation,
	useNavigationContainerRef,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useFonts } from "expo-font";
import { Text } from "react-native";
import { createStyleSheet, useStyles } from "react-native-unistyles";

function HomeScreen() {
	const { styles } = useStyles($styles);

	return (
		<Screen>
			<Screen.Content>
				<Text style={styles.text}>Home Screen</Text>
			</Screen.Content>
		</Screen>
	);
}

const $styles = createStyleSheet((theme) => ({
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
		Home: {
			screen: HomeScreen,
			options: {
				headerShown: true,
			},
		},
	},
});

const Navigation = createStaticNavigation(RootStack);

type RootStackParamList = StaticParamList<typeof RootStack>;

declare global {
	namespace ReactNavigation {
		interface RootParamList extends RootStackParamList {}
	}
}

function App() {
	const navigationRef = useNavigationContainerRef();

	useLogger(navigationRef);

	const {
		themeScheme,
		navigationTheme,
		setThemeContextOverride,
		ThemeProvider,
	} = useThemeProvider();

	const [areFontsLoaded, fontLoadError] = useFonts(customFontsToLoad);

	const navigationState = navigationStore$.state.peek();

	if (!areFontsLoaded && !fontLoadError) {
		return null;
	}

	return (
		<ThemeProvider value={{ themeScheme, setThemeContextOverride }}>
			<Navigation
				ref={navigationRef}
				theme={navigationTheme}
				initialState={navigationState}
				onStateChange={(state) => navigationStore$.state.set(state)}
			/>
		</ThemeProvider>
	);
}

export default observer(App);
