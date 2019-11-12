import { savedata } from '../';
import { get } from 'svelte/store';

test('x.supported should be false when not supported', () => {
	const result = savedata();
	expect(get(result).supported).toBe(false);
});

test('if saveData is true then guess what', () => {
	navigator.connection = {
		saveData: true,
	};

	const result = savedata();
	expect(get(result).saveData).toEqual(true);
	expect(get(result).saveData).toEqual(navigator.connection.saveData);
});

test('if saveData is false then guess what', () => {
	navigator.connection = {
		saveData: false,
	};

	const result = savedata();
	expect(get(result).saveData).toEqual(false);
	expect(get(result).saveData).toEqual(navigator.connection.saveData);
});
