import type { StartStopNotifier, Writable } from 'svelte/store'
import { effect, peek, signal } from '@maverick-js/signals'
import { Subscribers } from './_subscribers'

export type WritableSignalStore<T> = Writable<T> & {
	value: T
}

export function writable<T>(
	value: T,
	start?: StartStopNotifier<T>
): WritableSignalStore<T> {
	const s = signal<T>(value)

	const subscribers = Subscribers(() => {
		return start?.(set, update)
	})

	function get() {
		subscribers.track()
		return s()
	}
	function set(value: T) {
		s.set(value)
	}
	function update(fn: (value: T) => T) {
		const old_value = peek(s)
		const new_value = fn(old_value)
		s.set(new_value)
	}

	return {
		get value() {
			return get()
		},
		set value(value: T) {
			set(value)
		},
		set,
		subscribe(fn: (value: T) => void) {
			return effect(() => {
				const current_value = get()
				fn(current_value)
			})
		},
		update,
	}
}
