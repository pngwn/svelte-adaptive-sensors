export const getSaveDataInfo = () => {
	if (
		navigator !== undefined &&
		'connection' in navigator &&
		'saveData' in navigator.connection
	) {
		return {
			supported: true,
			saveData: navigator.connection.saveData === true,
		};
	} else {
		return { supported: false };
	}
};
