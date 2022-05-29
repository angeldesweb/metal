<script>
    export let selected = {name:'',id:'',phone:''} || {id:'',date:'',materials:[],materialcount:0};
    
    export let checked;

    export let filtered;

    export let value;
    
    export let search = () => selected = checked(value)[0];

    export let handleChange

    $: list = filtered(value);
</script>


<div class="form-control" style:width='100%'>
    <div class="input-group">
        <input style:width="100%" on:change={handleChange} type="text" placeholder="Buscar…" list="providers" class="input input-bordered" />
        <button disabled={!list.includes(value)} on:click={search} class="btn btn-square">
            Ok
        </button>
    </div>
</div>
<datalist id="providers">
    {#each list as li}
        <option>{li}</option>
    {/each}
</datalist>
