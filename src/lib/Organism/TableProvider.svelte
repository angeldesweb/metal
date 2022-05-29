<script>
    import Datatables from "../Molecules/Tables/Datatables.svelte";
    import { readProviders } from '../../api/people';
    import { FormErrors } from '../../tools/notifications/errorsNotifications';
    import { onMount } from "svelte";

    $: data = [];
    $: err = null;
    const providers = async () => {
        try {
            const req = await readProviders();
            data = req.data;
            return;
        } catch (error) {
            FormErrors(error);
            err = error.message;
        }
    }
    onMount(() => { providers(); })
</script>

<span class="card-title text-center">Buscar Proveedores</span>
<br>
{#if data.length === 0 && !err}
<progress class="progress w-56 progress-primary"></progress>
{:else if err}
<h1>{err}</h1>
{:else if data.length === 0}
<h1>No se encontraron registros</h1>
{:else}
<div style:width="70vw">
    <Datatables {data} />
</div>
{/if}