<script lang="ts">
  import Button from "#lib/components/Button.svelte";
  import Card from "#lib/components/Card.svelte";
  import Input from "#lib/components/Input.svelte";
  import Label from "#lib/components/Label.svelte";
  import { login } from "../account.remote";
  let { name, password } = login.fields;
</script>

<Card class="mx-auto max-w-sm">
  <h1 class="mb-4 text-xl font-medium">Log in</h1>
  <form {...login} class="flex flex-col gap-4">
    <Label label={"Username"}> <Input {...name.as("text")} /></Label>
    <Label label={"Password"}> <Input {...password.as("password")}/></Label>
    <Button text={"Log in"}/>
  </form>
  <p class="mt-4 text-sm text-gray-500">
    No account? <a href="/register" class="underline">Register here!</a>
  </p>
</Card>

{#if login.submitted}
  <div class="fixed inset-0 bg-black/40 flex justify-center items-center">
    <div class="animate-spin size-4">loading</div>
  </div>
{/if}