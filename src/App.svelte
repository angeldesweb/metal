<script>
    import { auth } from './store';
    import Index from './views/Index.svelte';
    import Main from './views/Main.svelte';

    const views = [Index,Main];
</script>

<svelte:component this={$auth ? views[1] : views[0]} />


