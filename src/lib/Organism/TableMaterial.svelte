<script>
    import Datatables from "../Molecules/Tables/Datatables.svelte";
    import { readMaterials } from '../../api/materials';
    import { FormErrors } from '../../tools/notifications/errorsNotifications';
    import { onMount } from "svelte";
import DataTableMaterials from "../Molecules/Tables/DataTableMaterials.svelte";

    $: data = [];
    $: err = null;
    const materials = async () => {
        try {
            const req = await readMaterials();
            data = req.list;
            return;
        } catch (error) {
            FormErrors(error);
            err = error.message;
        }
    }
    onMount(() => { materials(); })
</script>

<span class="card-title text-center">Buscar Materiales</span>
<br>
{#if data.length === 0 && !err}
<progress class="progress w-56 progress-primary"></progress>
{:else if err}
<h1>{err}</h1>
{:else if data.length === 0}
<h1>No se encontraron registros</h1>
{:else}
<div class="card" style:background-color="#fff" style:padding="1em" style:width="80vw" style:z-index="0">
    <DataTableMaterials {data} />
</div>
{/if}


