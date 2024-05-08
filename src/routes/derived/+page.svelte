<script lang="ts">
import { readable } from "$lib"
import { derived as svelteDerived, writable as svelteWritable } from "svelte/store"

const count = svelteWritable(5)
const doubled = svelteDerived(count, count => 2 * count)
const wrapped = readable<number | undefined>(undefined, set => {
  return doubled.subscribe(set)
})
</script>

{wrapped.value}
