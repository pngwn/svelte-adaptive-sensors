import { readable } from 'svelte/store';

export const network = () =>
	readable({}, set => {
		if (
			navigator !== undefined &&
			'connection' in navigator &&
			'effectiveType' in navigator.connection
		) {
			set({
				effectiveConnectionType: navigator.connection.effectiveType,
				supported: true,
			});
		} else {
			set({ supported: false });
		}

		const update_network_status = () => {
			set({ effectiveConnectionType: navigator.connection.effectiveType });
		};

		navigator.connection.addEventListener('change', update_network_status);

		return () => {
			navigator.connection.removeEventListener('change', update_network_status);
		};
	});
