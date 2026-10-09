<script>
  let { children, label } = $props();
</script>

<label class="flex flex-col gap-1 text-sm text-gray-700">
  {label}
  {@render children()}
</label>
