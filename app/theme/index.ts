import type { breakpoints } from "./breakpoints";
import { colors as colorsLight } from "./colors";
import { colors as colorsDark } from "./colors-dark";
import { spacing } from "./spacing";
import { timing } from "./timing";
import { typography } from "./typography";

// This supports "light" and "dark" themes by default. If undefined, it'll use the system theme
export type ThemeContexts = "light" | "dark" | undefined;

// Because we have two themes, we need to define the types for each of them.
// colorsLight and colorsDark should have the same keys, but different values.
export type Colors = typeof colorsLight | typeof colorsDark;

// These two are consistent across themes.
export type Spacing = typeof spacing;
export type Timing = typeof timing;
export type Typography = typeof typography;
export type Breakpoints = typeof breakpoints;

// The stacks type is specific to the @grapp/stacks library.
export type Stacks = {
	spacing: Spacing[keyof Spacing];
	debug: boolean;
};

// The overall Theme object should contain all of the data you need to style your app.
export interface Theme {
	colors: Colors;
	spacing: Spacing;
	typography: Typography;
	timing: Timing;
	stacks: Stacks;
	isDark: boolean;
}

const stacks: Stacks = {
	spacing: spacing.xxs,
	debug: false,
};

// Here we define our themes.
export const lightTheme: Theme = {
	colors: colorsLight,
	spacing,
	typography,
	timing,
	stacks,
	isDark: false,
};
export const darkTheme: Theme = {
	colors: colorsDark,
	spacing,
	typography,
	timing,
	stacks,
	isDark: true,
};

// Export the theme objects with backwards compatibility for the old theme structure.
export { colorsLight as colors };
export { colorsDark };
export { spacing };

export * from "./typography";
export * from "./timing";
