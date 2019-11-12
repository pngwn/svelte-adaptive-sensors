import { readable } from 'svelte/store';

export const cpu = initial =>
	readable(initial, set => {
		if (navigator !== undefined && 'hardwareConcurrency' in navigator) {
			set({ cpu: navigator.hardwareConcurrency });
		} else {
			set({ supported: false });
		}
	});
