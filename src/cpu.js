export const getCpuInfo = () => {
	if (navigator !== undefined && 'hardwareConcurrency' in navigator) {
		return { processors: navigator.hardwareConcurrency, supported: true };
	} else {
		return { supported: false };
	}
};
