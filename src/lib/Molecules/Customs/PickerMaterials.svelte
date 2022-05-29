<script>
    import { onMount } from 'svelte';
    import { readMaterials } from '../../../api/materials';

    export let addToBody;
    export let isSending = false;

    let name;
    let cantidad;

    const fetchMaterials = async () => {
        try {
            const data = await readMaterials();
            return data.list;
        } catch (error) {
            throw error;
        }
    }

    let promise = fetchMaterials();

    onMount(() => {
        promise = fetchMaterials();
    });

    $: inputs = []

    const add = () =>{ 
        if(!name || !cantidad) return
        inputs = [...inputs,{name,cantidad}];
        name = '';
        cantidad = ''
    }
    const remove = e => {
        let filtered = inputs.filter(doc => doc.name !== e.target.id);
        inputs = filtered;
    }

    $: if(isSending) inputs = []

</script>

{#await promise}
    <progress class="progress w-56 progress-primary"></progress>
{:then materials}
    <div class="flex gap-2 flex-wrap" >
        {#if inputs.length > 0}
            {#each inputs as item}
            <div id={item.name} class="badge badge-info gap-2" on:click={remove}>
                <svg id={item.name} on:click={remove} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="inline-block w-4 h-4 stroke-current"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                {item.name} {item.cantidad} {item.name === 'Batería' ? 'Unidades' : 'Kg.'}
            </div>
            {/each}
        {/if}
    </div>
    <br>
    <div class="flex">
        <select bind:value={name} class="select select-ghost w-full max-w-xs">
            <option value="" disabled selected>Selecciona un material</option>
            {#each materials as material}
                <option>{material.name}</option>
            {/each}
        </select>
        <input bind:value={cantidad} type="number" placeholder="Ingrese cantidad {name === 'Batería' ? 'Unidades' : 'Kgs'}" class="input input-ghost w-full max-w-xs" />
    </div>
    <br>
    <button class="btn btn-ghost" on:click={add} >
        Añadir
    </button>
    <br>
    {#if isSending}
    <progress class="progress w-56 progress-primary"></progress>
    {/if}
    {#if inputs.length > 0}
    <div>
        <button class="btn" on:click={addToBody('materials',inputs)}>
            Hecho
        </button>
    </div>
    {/if}
{/await}
