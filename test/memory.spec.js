import { getMemoryInfo } from '../';

test(`supported should be false if it isn't supported`, () => {
	const result = getMemoryInfo();

	expect(result.supported).toBe(false);
});

test(`it should work`, () => {
	const fake_memory = {
		deviceMemory: 1,
		totalJSHeapSize: 7,
		usedJSHeapSize: 100,
		jsHeapSizeLimit: 900,
	};

	navigator.deviceMemory = fake_memory.deviceMemory;
	performance.memory = {
		totalJSHeapSize: fake_memory.totalJSHeapSize,
		usedJSHeapSize: fake_memory.usedJSHeapSize,
		jsHeapSizeLimit: fake_memory.jsHeapSizeLimit,
	};

	const result = getMemoryInfo();

	expect(result).toEqual({ ...fake_memory, supported: true });
});

test(`it should work with anotehr ste of random values`, () => {
	const fake_memory = {
		deviceMemory: 4,
		totalJSHeapSize: 700,
		usedJSHeapSize: 101230,
		jsHeapSizeLimit: 91103230,
	};

	navigator.deviceMemory = fake_memory.deviceMemory;
	performance.memory = {
		totalJSHeapSize: fake_memory.totalJSHeapSize,
		usedJSHeapSize: fake_memory.usedJSHeapSize,
		jsHeapSizeLimit: fake_memory.jsHeapSizeLimit,
	};

	const result = getMemoryInfo();

	expect(result).toEqual({ ...fake_memory, supported: true });
});
