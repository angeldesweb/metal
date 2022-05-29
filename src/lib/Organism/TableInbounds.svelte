<script>
    import { readInbounds } from '../../api/inbounds';
    import { FormErrors } from '../../tools/notifications/errorsNotifications';
    import { onMount } from "svelte";
    import DataTableInbounds from "../Molecules/Tables/DataTableInbounds.svelte";

    $: data = [];
    $: err = null;
    const inbounds = async () => {
        try {
            const req = await readInbounds();
            data = req.data;
            return;
        } catch (error) {
            FormErrors(error);
            err = error.message;
        }
    }
    onMount(() => { inbounds(); })
</script>

<span class="card-title text-center">Entradas de material</span>
<br>
{#if data.length === 0 && !err}
<progress class="progress w-56 progress-primary"></progress>
{:else if err}
<h1>{err}</h1>
{:else if data.length === 0}
<h1>No se encontraron registros</h1>
{:else}
<div class="card" style:background-color="#fff" style:padding="1em" style:width="80vw" style:z-index="0">
    <DataTableInbounds {data} />
</div>
{/if}