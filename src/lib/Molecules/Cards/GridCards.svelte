<script>
    export let data = []
</script>

<div class="grid-roll">
    {#each data as item}
    <div class="card w-96 bg-base-100 shadow-xl">
        <div class="card-body">
            <p style:font-size="1.5em"><b>{item.nombre}</b></p>
            <p><b>Cantidad:</b> {item.existencia}</p>
            <p><b>Precio:</b> {item.precio}$</p>
        </div>
    </div>
    {/each}
</div>

<style>
    .grid-roll {
        display:grid;
        width:100%;
        grid-auto-rows: 15rem;
        grid-template-columns: repeat(auto-fill,minmax(15rem,1fr));
        gap:20px;
        margin-top:2em;
    }
</style>
