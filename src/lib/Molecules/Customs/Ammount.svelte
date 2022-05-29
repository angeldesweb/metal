<script>
    export let addToBody
    let price;
    let payed = false;

    const done = () => {
        addToBody('price',price);
        addToBody('payed',payed);
    }
</script>

<input bind:value={price} type="number" placeholder="Ingrese el monto a cancelar" class="input w-full max-w-xs" />
<br>
<div style="width:30%"class="form-control">
    <label class="label cursor-pointer">
        <span class="label-text">Status</span> 
        <input type="checkbox" class="toggle" bind:checked={payed} />
        <span class="label-text">{payed ? 'Cancelado' : 'Sin cancelar'}</span>
    </label>
</div>
<br>
{#if price > 0}
<div>
    <button class="btn" on:click={done}>
        Hecho
    </button>
</div>
{/if}