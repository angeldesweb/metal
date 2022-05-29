<script>
    let blurred = false;
    let touched = false;
    export let feedback = '';
    export let label = 'Select';
    export let disabled = false;
    export let options = ['option 1','option 2'];
    export let name;
    export let placeholder = 'Seleccione uno';

    $: if(disabled) touched = false;
</script>


<div class="form-control w-full max-w-xs">
    <label for="" class="label">
        <span
            class:text-error={touched && blurred && feedback ? true : false} 
            class:text-warning={touched && !blurred && feedback ? true : false} 
            class="label-text"
        >
            {label}
        </span>
    </label>
    <select 
        on:blur={(e) => blurred = true}
        on:input={(e) => blurred = false}
        on:focus={(e) => touched = true}
        class="select select-bordered select-sm"
        {name}
        class:select-error={touched && blurred && feedback ? true : false}
        class:select-warning={touched && !blurred && feedback ? true : false}
        disabled={disabled}
    >
      <option value="" disabled selected>{placeholder}</option>
      {#each options as option}
        <option>{option}</option>
      {/each}
    </select>
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