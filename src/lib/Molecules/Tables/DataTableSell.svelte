<script>
    import PrintSell from '../../Organism/PrintSell.svelte';
    import { Datatable } from 'svelte-simple-datatables';
    import { getSell } from '../../../api/sells';
    import { FormErrors } from '../../../tools/notifications/errorsNotifications';
    import { getOutbound } from '../../../api/outbound';
    export let data; 

    $: inAction = false;
    $: show = false;
    $: outData = {materials:null,id:''};
    $: date = null;
    $: materials = [];
    $: price = null;
    $: status = ''
    $: console.log(data)

    const print =  async (e) => {
        try {
            inAction = true;
            let {data} = await getSell(e.target.id);
            date = data.date.toDate().toLocaleDateString('es-ES');
            price = data.price;
            status = data.payed ? 'Cancelado' : 'Pendiente';
            let outbound = data.outbound.split('/')[2];
            let {out} = await getOutbound(outbound);
            const {id,materials} = out;
            let mats = materials.map(it => ({name:it.material.split('/')[2],cantidad:it.cantidad}))
            outData = {id,materials:mats};
            show = true;
            inAction = false;
            return;
        } catch (error) {
            FormErrors(error)
        }
    }
    const remove = async (e) => {
        let run = confirm('¿Desea eliminar este registro? El cambio no se podrá deshacer.')
        alert('Comuníquese con el administrador del sistema')
    }
    const settings = { 
        pagination: true, 
        css: true ,
        rowsPerPage:5,
        scrollY: false,
        scrollX:false,
        labels: {
            noRows:   'Sin resultados',
            search:   'Buscar...',    // search input placeholer
            filter:   'Filtrar',    // filter inputs placeholder
            info:     'Del {start} al {end} de {rows} resultados',
            previous: 'Anterior',
            next:     'Siguiente',       
        }
    }
    let rows
    $: console.log(outData);
</script>


<Datatable style="padding:1em;" {settings} {data} bind:dataRows={rows}>
    <thead>
        <th style="padding:1em;" data-key="date">Fecha</th>
        <th style="padding:1em;" data-key="outbound">ID de salida</th>
        <th style="padding:1em;" data-key="price">Precio de venta</th>
        <th style="padding:1em;" data-key="status">Estado</th>
        <th style="padding:1em;">Acciones</th>
    </thead>
    <tbody>
    {#if rows}
    {#each $rows as row}
        <tr>
            <td>{row.fecha}</td>
            <td>{row.outbound}</td>
            <td>{row.monto}</td>
            <td>{row.status ? 'Cancelado' : 'Pendiente'}</td>
            <td>
                {#if inAction}<p>Ejecutando</p>{:else}
                <a 
                    id="{row.id}"
                    class:link-primary={!inAction}
                    class="link link-hover"
                    on:click|preventDefault={print}
                    href={null}
                    disabled={inAction}
                >
                    Detalles
                </a>
                
                <a 
                    id="{row.id}"
                    class:link-accent={!inAction}
                    class="link link-hover"
                    on:click|preventDefault={remove}
                    href={null}
                    disabled={inAction}
                >
                    Eliminar
                </a>
                {/if}
            </td>
        </tr>
        {/each}
    {/if}
    </tbody>
</Datatable>
{#if inAction}
<progress class="progress w-56 progress-primary"></progress>
{/if}
<input type="checkbox" id="my-modal" class="modal-toggle" bind:checked={show} />
<div class="modal">
    <div class="modal-box w-12/12 max-w-5xl">
        {#if outData.materials}
        <PrintSell title="Resumen de venta" {date} {price}>
            <div style="width:100%;" slot="outbound">
                <p><b>Materiales</b></p>
                <p><b>Cantidad de materiales:</b> {outData.materials.length}</p>
                <ul>
                    {#each outData.materials as material , i}
                        <li>{material.name} {material.cantidad}{material.name === 'Batería' ? ' Unidades' : 'Kgs'}</li>
                    {/each}
                </ul>
            </div>
        </PrintSell>
        {:else}
        <p>Loading</p>
        {/if}
    </div>
</div>

<style>
    th:first-child{
        margin-left:1em;
    }
    td{
        text-align:center;
        padding:.5rem 0;
    }
    tr {
        border: 0.75px rgb(220, 219, 219) solid;
    }
</style>
