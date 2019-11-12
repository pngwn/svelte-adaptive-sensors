import { readable } from 'svelte/store';

export const cpu = () =>
	readable({}, set => {
		if (navigator !== undefined && 'hardwareConcurrency' in navigator) {
			set({ cpu: navigator.hardwareConcurrency });
		} else {
			set({ supported: false });
		}
	});
