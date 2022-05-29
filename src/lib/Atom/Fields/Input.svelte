<script>
    export let label = "Field label";
    export let feedback = "";
    export let placeholder = 'Placeholder';
    export let name;
    export let type = 'text';
    export let disabled = false;
    let blurred = false;
    let touched = false;

    $: if(disabled) touched = false;
</script>

<div class="form-control w-full max-w-xs">
    <label for="" class="label">
        <span class:text-error={touched && blurred && feedback ? true : false} class="label-text">{label}</span>
    </label>
    <input 
        on:blur={(e) => blurred = true}
        on:input={(e) => blurred = false}
        on:focus={(e) => touched = true}
        {type}
        class="input input-bordered w-full max-w-xs input-sm"
        class:input-error={touched && blurred && feedback ? true : false}
        class:input-warning={touched && !blurred && feedback ? true : false}
        {name}
        {placeholder}    
        disabled={disabled}
    />
    <label class="label" for="">
        <span 
            class:text-error={touched && blurred && feedback ? true : false}
            class:text-warning={touched && !blurred && feedback ? true : false} 
            class="label-text-alt"
        >
            {touched ? feedback : ''}
        </span>
    </label>
</div>