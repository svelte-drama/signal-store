<script lang="ts">
import { computed, writable } from "$lib"

function createStore(inital: string) {
  return writable(inital)
}

const stores = [
  createStore('A'),
  createStore('B'),
  createStore('C'),
  createStore('D'),
  createStore('E'),
  createStore('F'),
]
const pick = writable({ choose: [1, 3, 5] })
const timer = computed(() => {
  return pick.value.choose.map(index => {
    return stores[index].value
  })
})
</script>

<p>{$timer}&nbsp;</p>

{#each Array(6) as _, i}
  {@const store = stores[i]}
  <label>
    <p>
      <input type="checkbox" bind:group={$pick.choose} value={i} />
      <input type="text" value={store.value} on:input={e => store.set(e.currentTarget.value)} />
    </p>
  </label>
{/each}

