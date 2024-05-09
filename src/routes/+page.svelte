<script lang="ts">
import { computed, writable } from '$lib'
import Counter from './counter.svelte'

let show = false

const counter = writable(0, () => {
	console.log('START')
	return () => console.log('STOP')
})
const doubled = computed(() => {
	return counter.value * 2
})

function increment() {
	counter.set(counter.value + 1)
}
</script>

<h1>Home</h1>
<p>
	<a href="/about">About</a>
	<a href="/derived">Derived</a>
	<a href="/map">Map</a>
</p>

<fieldset>
	<label>
		<input type="checkbox" bind:checked={show} />
		Show
	</label>

	{#if show}
		<Counter {counter} {doubled} {increment} />
	{/if}
</fieldset>
