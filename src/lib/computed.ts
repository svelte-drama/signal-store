import { Subscribers } from './_subscribers.js'
import type { ReadableSignalStore } from './readable.js'
import {
	computed as computedSignal,
	effect,
	getScope,
	root,
	untrack,
	type ReadSignal,
} from '@maverick-js/signals'

export function computed<T>(fn: () => T): ReadableSignalStore<T> {
	let signal: ReadSignal<T> | null = null
	const subscribers = Subscribers(() => {
		let stop: () => void
		untrack(() => {
			root((dispose) => {
				stop = dispose
				signal = computedSignal(fn)
			})
		})
		return () => {
			stop()
			signal = null
		}
	})

	function get() {
		return subscribers.track(() => {
			return signal ? signal() : fn()
		})
	}

	return {
		get value() {
			return get()
		},
		subscribe(fn: (value: T) => void) {
			return effect(() => {
				const current_value = get()
				fn(current_value)
			})
		},
	}
}
