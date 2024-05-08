<script lang="ts">
import { computed, type ReadableSignalStore } from '$lib'

export let counter: ReadableSignalStore<number>
export let doubled: ReadableSignalStore<number>
export let increment: () => void

const quadrupled = computed(() => {
	return doubled.value * 2
})
</script>

<p>
	{$counter}:{$quadrupled}
</p>

<button type="button" on:click={increment}> Increment </button>
