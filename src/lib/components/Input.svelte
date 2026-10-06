<script>
  /** here to pass spreading from remote function in parent*/
  let { ...props } = $props()
</script>
<input
  {...props}
  class=" rounded border border-gray-300 px-3 py-2 outline-none focus:border-blue-500"
  autocomplete="off"
/>