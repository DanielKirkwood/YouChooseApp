import { UnistylesRegistry } from "react-native-unistyles";
import App from "@/app";
import { lightTheme, darkTheme } from "@/theme";

UnistylesRegistry.addThemes({
	light: lightTheme,
	dark: darkTheme,
}).addConfig({
	initialTheme: "light",
});

function YouChooseApp() {
	return <App />;
}

export default YouChooseApp;
