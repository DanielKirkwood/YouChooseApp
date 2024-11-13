import { type ResponsiveProp, useSpacingHelpers } from "@grapp/stacks";
import type { Edge } from "react-native-safe-area-context";
import { UnistylesRuntime } from "react-native-unistyles";

export type ExtendedEdge = Edge | "start" | "end";

const propertySuffixMap = {
	top: "Top",
	bottom: "Bottom",
	left: "Start",
	right: "End",
	start: "Start",
	end: "End",
};

const edgeInsetMap: Record<string, Edge> = {
	start: "left",
	end: "right",
};

export type SafeAreaInsetsProps<
	Property extends "padding" | "margin" = "padding",
	Edges extends Array<ExtendedEdge> = Array<ExtendedEdge>,
> = {
	[K in Edges[number] as `${Property}${Capitalize<K>}`]: ResponsiveProp<number>;
};

export function useSafeAreaInsetsProps<
	Property extends "padding" | "margin" = "padding",
	Edges extends Array<ExtendedEdge> = [],
>(
	safeAreaEdges: Edges = [] as unknown as Edges,
	property: Property = "padding" as Property,
): SafeAreaInsetsProps<Property, Edges> {
	const { divide } = useSpacingHelpers();
	const { insets } = UnistylesRuntime;

	return safeAreaEdges.reduce(
		(acc, e) => {
			const value = edgeInsetMap[e] ?? e;
			const key =
				`${property}${propertySuffixMap[e]}` as keyof SafeAreaInsetsProps<
					Property,
					Edges
				>;
			acc[key] = divide(insets[value]) as SafeAreaInsetsProps<
				Property,
				Edges
			>[typeof key];
			return acc;
		},
		{} as SafeAreaInsetsProps<Property, Edges>,
	);
}
