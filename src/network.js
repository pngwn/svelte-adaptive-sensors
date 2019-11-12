import { readable } from 'svelte/store';

export const getNetworkInfo = () =>
	readable({}, set => {
		if (
			navigator !== undefined &&
			'connection' in navigator &&
			'effectiveType' in navigator.connection
		) {
			set({
				effectiveType: navigator.connection.effectiveType,
				supported: true,
			});
			navigator.connection.addEventListener('change', update_network_status);
		} else {
			set({ supported: false });
		}

		const update_network_status = () => {
			set({
				effectiveType: navigator.connection.effectiveType,
				supported: true,
			});
		};

		return () => {
			if (
				navigator !== undefined &&
				'connection' in navigator &&
				'effectiveType' in navigator.connection
			) {
				navigator.connection.removeEventListener(
					'change',
					update_network_status
				);
			}
		};
	});
