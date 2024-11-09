import { palette } from "./palette";

export const colors = {
	palette,
	transparent: "rgba(0, 0, 0, 0)",
	text: palette.neutral100,
	textDim: palette.neutral600,
	background: palette.neutral1100,
	card: palette.neutral900,
	border: palette.neutral700,
	tint: palette.primary500,
	tintInactive: palette.neutral300,
	separator: palette.neutral300,
	error: palette.angry500,
	errorBackground: palette.angry300,
} as const;
