import type { Theme, Breakpoints } from "app/theme";
import "react-native-unistyles";

type AppThemes = {
	light: Theme;
	dark: Theme;
};

declare module "react-native-unistyles" {
	export interface UnistylesThemes extends AppThemes {}
	export interface UnistylesBreakpoints extends Breakpoints {}
}
