<script>
    import { lrouter } from "../store";
    import LoginForm from "../lib/Organism/LoginForm.svelte";
    import Recovery from "./Recovery.svelte";

    const routes = {
        'signin':LoginForm,
        'pass':Recovery
    }
</script>

<main class="app grid place-content-center">
    <svelte:component this={routes[$lrouter]} />
</main>

<style>
    .app {
        min-height:100vh;
        width:100vw;
        background-image: url('../assets/images/background.png');
    }
</style>