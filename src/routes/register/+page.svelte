<script>
  import { signup } from "../account.remote";

  const { name, password } = signup.fields;
</script>

<main class="prose">
  <h1>Register</h1>
  <form {...signup}>
    <label>
      <h2>Username: </h2>
      <input {...name.as("text")}>
    </label>
    <label>
      <h2>Password: </h2>
      <input {...password.as("password")}>
    </label>
    <button type="submit">Register</button>
  </form>
  <p>Already have an account? <a href={"/login"}>Log in here!</a></p>
</main>