<script lang="ts">
  type BtnVariant = "normal" | "borderless"
  type Props = { text?: string, class?: string, variant?: BtnVariant } 
  let { text = "Click", class: className = "", variant = "normal" }: Props = $props()
</script>
<button 
  class={`${className} cursor-pointer rounded-md border border-gray-300 px-3 py-1.5 text-sm hover:bg-gray-50 active:bg-gray-100`}
>{text}</button>