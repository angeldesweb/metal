<script>
    export let label = "Button";
    export let primary = true;
    export let onClick = null;
    export let loading = false;
    export let disabled = false;
</script>

<button class="btn" 
    class:loading
    class:btn-primary={primary}
    class:btn-disabled={disabled}
    on:click={onClick}
>{label}</button>