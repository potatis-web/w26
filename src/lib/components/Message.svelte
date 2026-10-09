<script lang="ts">
  import { formatTemporal, tooltip } from "#lib/misc.js";
  import type { Message } from "../remote/forum.remote";

  let { message }: { message: Message } = $props()

</script>
<div class="group relative px-3 py-2 hover:bg-gray-50">
  <p class="text-sm">
  <span class="font-medium">{message.user?.name ?? "Unknown user"} <i {@attach tooltip(JSON.stringify(message.userid))}>ID</i></span>
    <span class="ml-1 text-xs text-gray-400">
      {formatTemporal(message.created_at)}
    </span>
  </p>

  <p class="text-sm wrap-break-words">{message.text}</p>

  <!-- Actions -->
  <div
    class="absolute right-3 top-0 flex -translate-y-1/2 overflow-hidden
          rounded-md border border-gray-200 bg-white shadow-sm
          opacity-0 transition-opacity
          group-hover:opacity-100"
  >
    {#each ["A", "B", "C"] as btn}
      <button
        class="px-2.5 py-1 text-xs text-gray-600
            hover:bg-gray-100 hover:text-gray-900
              cursor-pointer"
      >
        {btn}
      </button>
    {/each}
  </div>
</div>