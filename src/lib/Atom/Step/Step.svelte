<script>
    export let label = ''
    export let content;
    export let active = false;
    export let success = false;
    export let error = false;
</script>

<li 
    data-content={content}
    class:step-primary={active}
    class:step-success={success}
    class:step-error={error}
    class="step"
>
    {label}    
</li>