import {
	type ExtendedEdge,
	useSafeAreaInsetsProps,
} from "@/hooks/use-safe-area-insets-style";
import {
	Box,
	Row,
	type RowProps,
	Rows,
	type RowsProps,
	useResponsiveProp,
	useSpacingHelpers,
} from "@grapp/stacks";
import React from "react";
import { ScrollView as RNScrollView, type ScrollViewProps } from "react-native";
import { createStyleSheet, useStyles } from "react-native-unistyles";

type ContextProps = {
	readonly paddingX: number;
};

type Props = React.PropsWithChildren<Omit<RowProps, "paddingX">>;

type ScreenProps = Omit<RowsProps, "paddingTop" | "paddingBottom"> & {
	readonly safeAreaEdges?: ExtendedEdge[];
};

const Context = React.createContext<ContextProps>({
	paddingX: 4,
});

const useScreen = () => {
	return React.useContext(Context);
};

export const Screen = (props: ScreenProps) => {
	const { theme } = useStyles($styles);
	const {
		children,
		paddingX = 4,
		backgroundColor = theme.colors.background,
		safeAreaEdges,
		...rest
	} = props;

	const safeAreaInsetsProps = useSafeAreaInsetsProps(safeAreaEdges);

	const resolveResponsiveProp = useResponsiveProp();

	return (
		<Context.Provider value={{ paddingX: resolveResponsiveProp(paddingX) }}>
			<Rows
				backgroundColor={backgroundColor}
				{...safeAreaInsetsProps}
				{...rest}
			>
				{children}
			</Rows>
		</Context.Provider>
	);
};

const Content = Row.from((props: Props) => {
	const { paddingX } = useScreen();
	// biome-ignore lint/correctness/useJsxKeyInIterable: this is not an iterable
	return <Box paddingX={paddingX} {...props} />;
});

const ScrollView = Row.from((props: Props & ScrollViewProps) => {
	const { children, contentContainerStyle, flex = "fluid", horizontal } = props;
	const { paddingX } = useScreen();
	const { multiply } = useSpacingHelpers();
	const { styles } = useStyles($styles);

	return (
		// biome-ignore lint/correctness/useJsxKeyInIterable: this is not an iterable
		<Box flex={flex}>
			<RNScrollView
				horizontal={horizontal}
				contentContainerStyle={[
					styles.scrollContainer,
					contentContainerStyle,
					{ paddingHorizontal: multiply(paddingX) },
				]}
			>
				{children}
			</RNScrollView>
		</Box>
	);
});

const $styles = createStyleSheet({
	scrollContainer: {
		flexGrow: 1,
	},
});

Screen.Content = Content;
Screen.ScrollView = ScrollView;
