<script lang="ts">
  interface Link {
    path: string;
    text: string;
  }
  interface LinkWithNote extends Link {
    note?: string;
  }

  let links: LinkWithNote[] = [
    { path: "/todo", text: "Todo page" },
    { path: "/forum", text: "Forum page" },
    { path: "/login", text: "Login page", note: "already logged in" },
  ];
</script>

<h1 class="mb-4 text-xl font-medium">Pages</h1>
<ul class="divide-y divide-gray-200 rounded-md border border-gray-300">
  {#each links as link}
    <li>
      <a
        href={link.path}
        class="flex items-center justify-between px-3 py-2 text-sm hover:bg-gray-50 active:bg-gray-100"
      >
        <span>
          {link.text}
          {#if link.note}<span class="text-gray-500">({link.note})</span>{/if}
        </span>
        <span class="text-gray-400">→</span>
      </a>
    </li>
  {/each}
</ul>
