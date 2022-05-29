<script>
    import { onMount } from 'svelte';
    import { readMaterials } from '../../api/materials';
    import Chart from '../Atom/Charts/Chart.svelte';

    let fLabels;
    let nFLabels;
    let fValues;
    let nFValues
    
    const materials = async () => {
        try {
            const request = await readMaterials();
            fLabels = request.list.filter(doc => doc.tipo === 'Ferroso').map(doc => doc.name);
            fValues = request.list.filter(doc => doc.tipo === 'Ferroso').map(doc => doc.cantidad);
            nFLabels = request.list
                .filter(doc => doc.tipo === 'No ferroso')
                .filter(doc => doc.medidas === 'Kg')
                .map(doc => doc.name);
            nFValues = request.list
                .filter(doc => doc.tipo === 'No ferroso')
                .filter(doc => doc.medidas === 'Kg')
                .map(doc => doc.cantidad);
            return request.list;
        } catch (error) {
            alert(JSON.stringify(error.message));
        }
    }

    let promise = materials();

    onMount(async () => {
        promise = materials();
    })

</script>

{#await promise}
    <progress class="progress w-56 progress-primary"></progress>
{:then}
<h2 class="text-3xl text-center">Materiales por Kg.</h2>
<br>
<div  class="grid grid-flow-col auto-cols-max gap-2">
    
    {#if fLabels.length !== 0}
    <Chart labels={fLabels} values={fValues} title="Ferrosos" />
    {/if}
    {#if nFLabels.length !== 0}
    <Chart labels={nFLabels} values={nFValues} title="No ferrosos" />
    {/if}
</div>
    
{:catch error}
    <h2>Error</h2>
    <h1>{error.message}</h1>
{/await}
