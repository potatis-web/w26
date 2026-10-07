<script lang="ts">
  import type { HTMLInputAttributes } from "svelte/elements"

  type Props = HTMLInputAttributes & {
    class?: string
    placeholder?: string
    maxlength?: number | null
    oninput?: ((event: Event) => void) | null
  }

  let {
    class: className = "",
    placeholder = "",
    maxlength = null,
    oninput = null,
    ...props
  }: Props = $props()

  let value = $state("")

  const useMaxLength = $derived(maxlength != null && maxlength > 0)
</script>

<div class={`${className} relative flex items-center justify-end`}>
  <input
    {...props}
    bind:value={value}
    placeholder={placeholder}
    maxlength={maxlength ?? undefined}
    oninput={oninput}
    class="w-full rounded border border-gray-300 px-3 py-2 outline-none focus:border-blue-500"
    autocomplete="off"
  />

  {#if useMaxLength}
    <p class="absolute p-2 text-gray-500">
      {value.length}/{maxlength}
    </p>
  {/if}
</div>