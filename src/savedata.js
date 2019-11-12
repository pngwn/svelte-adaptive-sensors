import { readable } from 'svelte/store';

export const savedata = () =>
	readable({}, set => {
		if (
			navigator !== undefined &&
			'connection' in navigator &&
			'saveData' in navigator.connection
		) {
			set({
				supported: true,
				saveData: navigator.connection.saveData === true,
			});
		} else {
			set({ supported: false });
		}
	});
