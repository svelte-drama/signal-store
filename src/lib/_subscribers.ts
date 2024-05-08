import { getScope, onDispose } from '@maverick-js/signals'

export function Subscribers(start: () => (void | (() => void))) {
	let subscribers = 0
	let stop: void | (() => void)

	function track<T>(fn: () => T) {
		if (getScope()) {
			if (!subscribers) {
				stop = start()
			}
			subscribers++

			onDispose(() => {
				setTimeout(() => {
					subscribers--
					if (!subscribers) {
						stop?.()
						stop = undefined
					}
				})
			})

			return fn()
		} else if (!subscribers) {
			const stop = start()
			const value = fn()
			stop?.()
			return value
		} else {
			return fn()
		}
	}

	return { track }
}
