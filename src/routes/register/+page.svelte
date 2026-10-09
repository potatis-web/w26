<script>
  import { signup } from "#lib/remote/account.remote.ts";

  import Input from "#lib/components/Input.svelte";
  import Label from "#lib/components/Label.svelte";
  import Button from "#lib/components/Button.svelte";
  import Card from "#lib/components/Card.svelte";

  const { name, password } = signup.fields;
</script>

<Card class="mx-auto max-w-sm">
  <h1 class="mb-4 text-xl font-medium">Register</h1>
  <form {...signup} class="flex flex-col gap-4">
    <Label label="Username"><Input {...name.as("text")} /></Label>
    <Label label="Password"><Input {...password.as("password")} /></Label>
    <Button text="Register" />
  </form>
  <p class="mt-4 text-sm text-gray-500">
    Already have an account? <a href="/login" class="underline">Log in!</a>
  </p>
</Card>
