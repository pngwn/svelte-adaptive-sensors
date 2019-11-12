import { network } from '../';
import { get } from 'svelte/store';

test('should return the current network type, add and remeove listeners', () => {
	// ask me no questions
	let cb;
	const add = jest.fn().mockImplementation((e, f) => (cb = f));

	const remove = jest.fn();

	navigator.connection = {
		effectiveType: '4g',
		addEventListener: add,
		removeEventListener: remove,
	};

	const result = get(network());

	// `get` subscribes and unsubscribes so listeners should have been added and removed after this

	expect(add).toHaveBeenCalledWith('change', cb);
	expect(remove).toHaveBeenCalledWith('change', cb);
	expect(result.effectiveType).toEqual('4g');
});

test('when a change event is fired the value should update', () => {
	const add = jest.fn().mockImplementation((e, fn) => {
		events[e] = fn;
	});
	const remove = jest.fn();
	const events = {};

	navigator.connection = {
		effectiveType: '4g',
		addEventListener: add,
		removeEventListener: remove,
	};

	const store = network();
	let v;
	const unsub = store.subscribe(_v => (v = _v));

	expect(v.effectiveType).toEqual('4g');
	navigator.connection.effectiveType = '3g';
	events.change();

	expect(add).toHaveBeenCalled();
	expect(v.effectiveType).toEqual('3g');

	unsub();

	expect(remove).toHaveBeenCalled();
});
