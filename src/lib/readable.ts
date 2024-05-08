import { type Readable, type StartStopNotifier } from 'svelte/store'
import { writable } from './writable.js'

export type ReadableSignalStore<T> = Readable<T> & {
	readonly value: T
}

export function readable<T>(
	value: T,
	start?: StartStopNotifier<T>
): ReadableSignalStore<T> {
	const store = writable(value, start)

	return {
		get value() {
			return store.value
		},
		subscribe: store.subscribe,
	}
}
