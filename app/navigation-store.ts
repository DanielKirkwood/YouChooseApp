import { observable } from "@legendapp/state";
import { ObservablePersistMMKV } from "@legendapp/state/persist-plugins/mmkv";
import { syncObservable } from "@legendapp/state/sync";
import type { NavigationState } from "@react-navigation/native";

interface NavigationStore {
	state: Readonly<NavigationState> | undefined;
}

export const navigationStore$ = observable<NavigationStore>({
	state: undefined,
});

syncObservable(navigationStore$, {
	persist: {
		name: "navigation",
		plugin: ObservablePersistMMKV,
	},
});
