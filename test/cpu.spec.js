import { cpu } from '../';

test('should return the hardwareConcurrency value', () => {
	const result = cpu();
	expect(result.cpu).toBe(window.navigator.hardwareConcurrency);
});

test('should return 17 if we have 17', () => {
	Object.defineProperty(window.navigator, 'hardwareConcurrency', {
		value: 17,
		configurable: true,
		writable: true,
	});

	const result = cpu();
	expect(result.cpu).toEqual(17);
});

test('should return 1 if we have 1', () => {
	Object.defineProperty(window.navigator, 'hardwareConcurrency', {
		value: 1,
		configurable: true,
		writable: true,
	});

	const result = cpu();
	expect(result.cpu).toEqual(1);
});
