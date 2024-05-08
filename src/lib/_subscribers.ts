import { getScope, onDispose } from '@maverick-js/signals'

export function Subscribers(start: () => void) {
	let subscribers = 0
	let stop: void | (() => void)

	function track() {
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
		}
	}

	return { track }
}
