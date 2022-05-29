<script>
    import Search from '../../Atom/Fields/Search.svelte';
    import { readOutbounds } from '../../../api/outbound';
    import { readSells } from '../../../api/sells';
    import { onMount } from 'svelte';


    export let addToBody;
    $: sells = null;


    $: data = [];
    $: selected = {id:'',date:'',materialcount:0,materials:null};

    const outbounds = async () => {
        try {
            const doc = await readOutbounds();
            data = doc.data;
            return doc.data;
        } catch (error) {
            throw error;
        }
    }

    let promise = outbounds();

    $: value = '';

    const handleChange = e => value = e.target.value;
    
    const checked = (value) =>  data.filter(doc => doc.name === value || doc.id === value);


    const filtered = (input) => {
        let ids;
        let valids = data;
        if(sells){
            ids = sells.map(doc => doc.outbound.split('/')[2]);
            valids = data.filter(item => !ids.includes(item.id))
            console.log(valids)
        }
        //const valids = data.map(doc => doc.id).filter(id => ids.filter(item => item !== id));
        let byName = valids.map(obj => obj.id).filter(item => item.includes(input))
        let byDate = valids.map(obj => obj.date).filter(item => item.includes(input))
	    return [...byName,...byDate];
        
    }
    
    const search = () => {
        selected = checked(value)[0];
    }

    const done = () => {
        addToBody('outbound',selected);
    }

    onMount( async () => {
        let info = await readSells()
        sells = info.list;
        promise = outbounds();
    })
</script>


{#if Object.values(selected).filter(data => !!data).length === 0}
    {#await promise}
        <progress style:width='100%' class="progress w-56 progress-primary"></progress>
    {:then}
        <h2 class="card-title">Seleccione la salida reportada</h2>
        <br>
        <Search {checked} {filtered} {search} {handleChange} {value} {selected} />
    {:catch error}
        <h2>{error.message}</h2>
    {/await}
{:else}
    <p><b>ID: </b>{selected.id}</p>
    <br>
    <p><b>Fecha de salida: </b>{selected.date}</p>
    <br>
    <p><b>Materiales: </b>{selected.materialcount}</p>
    <ul>
        {#each selected.materials as material}
            <li>{material.material.split('/')[2]} {material.cantidad} <small>Kgs o unidades</small></li>
        {/each}
    </ul>
    <br>
    <div class="flex justify-around" on:click={e => selected =  {id:'',date:'',materialcount:0,materials:null}}>
        <button class="btn btn-square btn-outline" >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
        </button>

        <button class="btn btn-square" on:click={done}>
            ✓
        </button>
    </div>
{/if}