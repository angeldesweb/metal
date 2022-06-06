<script>
    import Input from '../../Atom/Fields/Input.svelte';
    import Select from '../../Atom/Fields/Select.svelte';
    import Button from '../../Atom/Buttons/Button.svelte';
    import { createForm } from 'felte';
    
    export let warns;
    export let header = '';
    export let title = '';
    export let subtitle = '';
    export let action = 'Submit';
    export let fields;
    $: warnings = {}
    $: hasWarnings = Object.entries(warnings).length;
    //FELTE SUBMIT FUNCTIONS
    export let onSubmit;
    export let onSuccess;
    export let onError;
    const { form , data , isSubmitting } = createForm({
        warn:(values) => warnings = warns(values),
        onSubmit,
        onSuccess,
        onError,
    });
    $: filleds = Object.entries($data).map(arr => arr[1]).filter(val => val === 0 || val != '').length;
    $: inputs = Object.entries($data).length;
</script>

<div class="card w-96 bg-base-100 shadow-xl justify-self-center">
    <div class="card-body text-center">
        <h1 class="card-title header text-primary">{header}</h1>
        <h2 class="card-title text-center">{title}</h2>
        <p>{subtitle}</p>
        <form use:form>
            {#each fields as field}
                {#if field.type === 'select'}
                <Select {...field} disabled={$isSubmitting} feedback={warnings[field.name] || ''} />
                {:else}
                <Input {...field} disabled={$isSubmitting} feedback={warnings[field.name] || ''} />
                {/if}
            {/each}
            {#if $isSubmitting}
            <progress class="progress w-56 progress-primary"></progress>
            {:else}
            <Button label={action} primary={true} disabled={filleds != inputs || hasWarnings != 0 || $isSubmitting}/>
            {/if}
        </form>
    </div>
</div>

<style>
    h1.header {
        margin:auto;
        font-size:2rem;
    }
</style>