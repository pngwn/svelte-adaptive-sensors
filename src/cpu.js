export const cpu = () => {
	if (navigator !== undefined && 'hardwareConcurrency' in navigator) {
		return { cpu: navigator.hardwareConcurrency };
	} else {
		return { supported: false };
	}
};
