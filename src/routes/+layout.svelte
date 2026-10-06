<script lang="ts">
	import './layout.css';
	import Page from "#lib/components/Page.svelte"
	let { children } = $props();
</script>
<nav class="border-b border-gray-300">
  <div class="mx-auto flex max-w-2xl gap-4 px-4 py-3 text-sm">
    <a href="/" class="hover:underline">Home</a>
    <a href="/todo" class="hover:underline">Todo</a>
    <a href="/forum" class="hover:underline">Forum</a>
  </div>
</nav>

<Page>
	{@render children()}
</Page>
