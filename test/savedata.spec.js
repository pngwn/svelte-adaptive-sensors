import { getSaveDataInfo } from '../';

test('x.supported should be false when not supported', () => {
	const result = getSaveDataInfo();
	expect(result.supported).toBe(false);
});

test('if saveData is true then guess what', () => {
	navigator.connection = {
		saveData: true,
	};

	const result = getSaveDataInfo();
	expect(result.saveData).toEqual(true);
	expect(result.saveData).toEqual(navigator.connection.saveData);
});

test('if saveData is false then guess what', () => {
	navigator.connection = {
		saveData: false,
	};

	const result = getSaveDataInfo();
	expect(result.saveData).toEqual(false);
	expect(result.saveData).toEqual(navigator.connection.saveData);
});
