<script>
    import { readSells } from '../../api/sells';
    import { FormErrors } from '../../tools/notifications/errorsNotifications';
    import { onMount } from "svelte";
    import DataTableSell from "../Molecules/Tables/DataTableSell.svelte";

    $: data = [];
    $: err = null;
    const sells = async () => {
        try {
            const req = await readSells();
            data = req.data;
            return;
        } catch (error) {
            FormErrors(error);
            err = error.message;
        }
    }
    onMount(() => { sells(); })
    $: console.log(data)
</script>

<span class="card-title text-center">Ventas</span>
<br>
{#if data.length === 0 && !err}
<progress class="progress w-56 progress-primary"></progress>
{:else if err}
<h1>{err}</h1>
{:else if data.length === 0}
<h1>No se encontraron registros</h1>
{:else}
<div class="card" style:background-color="#fff" style:padding="1em" style:width="80vw" style:z-index="0">
    <DataTableSell {data} />
</div>
{/if}