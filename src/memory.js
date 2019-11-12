import { readable } from 'svelte/store';

export const memory = () =>
	readable({}, set => {
		if (navigator !== undefined && 'deviceMemory' in navigator) {
			const performance_memory =
				'memory' in performance ? performance.memory : null;

			set({
				deviceMemory: navigator.deviceMemory,
				totalJSHeapSize: performance_memory
					? performance_memory.totalJSHeapSize
					: null,
				usedJSHeapSize: performance_memory
					? performance_memory.usedJSHeapSize
					: null,
				jsHeapSizeLimit: performance_memory
					? performance_memory.jsHeapSizeLimit
					: null,
				supported: true,
			});
		} else {
			set({ supported: false });
		}
	});
