# @svelte-suspense/signal-store

This implements a signal based Svelte store. This allows writing code similar to Svelte 5's `$derived.by` even in Svelte 4 and will ease transitioning code from stores in Svelte 4 to $state in Svelte 5.

## Installation

```bash
npm install --save @svelte-suspense/signal-store
```

## API

### `ReadableSignalStore`

```ts
import type { Readable } from 'svelte/store'

type ReadableSignalStore<T> = Readable<T> & {
	readonly value: T
}
```

### `WritableSignalStore`

```ts
import type { Writable } from 'svelte/store'

type WritableSignalStore<T> = Writable<T> & {
	value: T
}
```

### `readable`

```ts
import { readable } from '@svelte-drama/signal-store

const time = readable(new Date(), (set) => {
  // This function is not run until time has subscribers
  // or if `.value` is accessed inside of `computed`
	set(new Date());

	const interval = setInterval(() => {
		set(new Date());
	}, 1000);

	return () => clearInterval(interval);
})

// Reading the value is not reactive unless inside `computed`
console.log(time.value)
```

`readable` takes the same arguments as Svelte's [readable](https://svelte.dev/docs/svelte-store#readable). Additionally, the current value is available through `.value`.

### `writable`

```ts
import { writable } from '@svelte-drama/signal-store
```

`writable` takes the same arguments as Svelte's [writable](https://svelte.dev/docs/svelte-store#readable). Additionally, the current value is available through `.value`.

### `computed`

```ts
function computed<T>(fn: () => T): ReadableSignalStore<T>
```

```ts
import { computed, writable } from '@svelte-drama/signal-store

const count = writable(1)
const doubled = computed(() => {
  return count * 2
})
console.log(doubled.value) // 2

count.set(8)
console.log(doubled.value) // 16
```
