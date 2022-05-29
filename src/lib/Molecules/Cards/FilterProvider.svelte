<script>
    import Search from '../../Atom/Fields/Search.svelte';
    import { onMount } from 'svelte';
    import { readProviders } from '../../../api/people';
    export let addToBody;
    $: data = [];
    $: selected = {name:'',id:'',phone:''};

    const providers = async () => {
        try {
            const doc = await readProviders();
            data = doc.list;
            return doc.list;
        } catch (error) {
            throw error;
        }
    }

    let promise = providers();

    $: value = '';

    const handleChange = e => value = e.target.value;
    
    const checked = (value) =>  data.filter(doc => doc.name === value || doc.id === value);


    const filtered = (input) => {
        let byName = data.map(obj => obj.name).filter(item => item.includes(input))
        let byId = data.map(obj => obj.id).filter(item => item.includes(input))
	    return [...byName,...byId];
    }
    
    const search = () => {
        selected = checked(value)[0];
    }

    const done = () => {
        addToBody('provider',selected);
    }

    onMount(() => {
        promise = providers();
    })
</script>


{#if Object.values(selected).filter(data => !!data).length === 0}
    {#await promise}
        <progress style:width='100%' class="progress w-56 progress-primary"></progress>
    {:then}
        <h2 class="card-title">Seleccione el proveedor</h2>
        <br>
        <Search {checked} {filtered} {search} {handleChange} {value} {selected} />
    {:catch error}
        <h2>{error.message}</h2>
    {/await}
{:else}
    <p><b>Nombre: </b>{selected.name}</p>
    <br>
    <p><b>Cédula: </b>{selected.id}</p>
    <br>
    <p><b>Teléfono: </b>{selected.phone}</p>
    <br>
    <div class="flex justify-around">
        <button class="btn btn-square btn-outline" >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
        </button>

        <button class="btn btn-square" on:click={done}>
            ✓
        </button>
    </div>
{/if}