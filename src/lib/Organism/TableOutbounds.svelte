<script>
    import { readOutbounds } from '../../api/outbound';
    import { FormErrors } from '../../tools/notifications/errorsNotifications';
    import { onMount } from "svelte";
    import DataTableOutbounds from "../Molecules/Tables/DataTableOutbounds.svelte";

    $: data = [];
    $: err = null;
    const outbounds = async () => {
        try {
            const req = await readOutbounds();
            data = req.data;
            return;
        } catch (error) {
            FormErrors(error);
            err = error.message;
        }
    }
    onMount(() => { outbounds(); })
</script>

<span class="card-title text-center">Salidas de material</span>
<br>
{#if data.length === 0 && !err}
<progress class="progress w-56 progress-primary"></progress>
{:else if err}
<h1>{err}</h1>
{:else if data.length === 0}
<h1>No se encontraron registros</h1>
{:else}
<div class="card" style:background-color="#fff" style:padding="1em" style:width="80vw" style:z-index="0">
    <DataTableOutbounds {data} />
</div>
{/if}