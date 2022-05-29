<script>
    export let checked = false;
    export let pLabel = 'True';
    export let nLabel = 'False'
</script>

<div class="form-control">
    <label class="label cursor-pointer">
        <span class="label-text">{checked ? pLabel : nLabel}</span> 
        <input type="checkbox" class="toggle" checked={checked} />
    </label>
</div>