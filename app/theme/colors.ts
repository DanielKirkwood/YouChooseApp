import { palette } from "./palette";

export const colors = {
	/**
	 * The palette is available to use, but prefer using the name.
	 * This is only included for rare, one-off cases. Try to use
	 * semantic names as much as possible.
	 */
	palette,
	/**
	 * A helper for making something see-thru.
	 */
	transparent: "rgba(0, 0, 0, 0)",
	/**
	 * The default text color in many components.
	 */
	text: palette.neutral800,
	/**
	 * Secondary text information.
	 */
	textDim: palette.neutral600,
	/**
	 * The default color of the screen background.
	 */
	background: palette.neutral200,
	/**
	 * The default color of elements on the screen.
	 */
	card: palette.neutral100,
	/**
	 * The default border color.
	 */
	border: palette.neutral400,
	/**
	 * The main tinting color.
	 */
	tint: palette.primary300,
	/**
	 * The inactive tinting color.
	 */
	tintInactive: palette.neutral500,
	/**
	 * A subtle color used for lines.
	 */
	separator: palette.neutral600,
	/**
	 * Error messages.
	 */
	error: palette.angry500,
	/**
	 * Error Background.
	 */
	errorBackground: palette.angry700,
} as const;
