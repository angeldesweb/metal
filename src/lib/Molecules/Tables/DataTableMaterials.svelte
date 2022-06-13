<script>
    import { Datatable } from 'svelte-simple-datatables';
    import { getMaterial } from '../../../api/materials';
    import { FormErrors } from '../../../tools/notifications/errorsNotifications';
    import PrintMaterial from '../../Organism/PrintMaterial.svelte';
    export let data; 

    $: inAction = false;
    $: show = false;
    $: materialData = {name:'',tipo:'',precio:0,cantidad:0,medidas:''};
    $: date = null;
    $: materials = [];
    $: price = null;
    $: status = ''

    const print =  async (e) => {
        try {
            inAction = true;
            let {data} = await getMaterial(e.target.id);
            //@ts-ignore
            materialData = {...data}
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
</script>


<Datatable style="padding:1em;" {settings} {data} bind:dataRows={rows}>
    <thead>
        <th style="padding:1em;" data-key="name">Nombre</th>
        <th style="padding:1em;" data-key="provider">Tipo</th>
        <th style="padding:1em;" data-key="materials">Costo unitario</th>
        <th style="padding:1em;" data-key="price">Cantidad en almacén</th>
        <th style="padding:1em;" data-key="">Valor total</th>
        <th style="padding:1em;">Acciones</th>
    </thead>
    <tbody>
    {#if rows}
    {#each $rows as row}
        <tr>
            <td>{row.name}</td>
            <td>{row.tipo}</td>
            <td>{row.precio} $</td>
            <td>{row.cantidad} {row.medidas}</td>
            <td>{row.precio * row.cantidad} $</td>
            <td>
                {#if inAction}<p>Ejecutando</p>{:else}
                <a 
                    id="{row.name}"
                    class:link-primary={!inAction}
                    class="link link-hover"
                    on:click|preventDefault={print}
                    href={null}
                    disabled={inAction}
                >
                    Detalles
                </a>
                
                <a 
                    id="{row.name}"
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
        <PrintMaterial title="Detalle Material">
            <div style="width:100%;" slot="material">
                <p>Nombre: {materialData.name}</p>
                <p>Tipo: {materialData.tipo}</p>
                <p>Costo unitario: {materialData.precio} $</p>
                <p>Cantidad existente: {materialData.cantidad} {materialData.medidas}</p>
                <p>Valor total: {materialData.cantidad * materialData.precio}</p>
            </div>
        </PrintMaterial>
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