<script>
    export let body;
    export let endRoad;
    export let isSending;
</script>


<h2 class="card-title">Confirmar venta</h2>
<div class="divider"></div>
<p><b>Id de salida: </b>{body.outbound.id}</p>
<br>
<p><b>Materiales</b></p>
<ul>
    {#each body.outbound.materials as item}
    <li>{item.name} {item.cantidad} {item.name === 'Batería' ? 'Unidades' : 'Kg'}</li>
    {/each}
</ul>
<br>
<p><b>Monto: </b> {body.price}$</p>
<br>
<p><b>Estado: </b> {body.payed ? 'Cancelado' : 'Pendiente'}</p>
<br>
{#if isSending}
<progress class="progress w-56 progress-primary"></progress>
{:else}
<div>
    <button class="btn" on:click={endRoad}>
        Confirmar
    </button>
</div>
{/if}