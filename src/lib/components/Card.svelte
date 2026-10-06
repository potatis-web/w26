<script>
  let { children, class: className = "" } = $props()
</script>
<div class={`rounded-md border border-gray-300 p-4 ${className}`}>
  {@render children()}
</div>