<script>
    import PrintInbound from '../../Organism/PrintInbound.svelte';
    import { Datatable } from 'svelte-simple-datatables';
    import { getInbound } from '../../../api/inbounds';
    import { getPeople } from '../../../api/people';
    import { FormErrors } from '../../../tools/notifications/errorsNotifications';
    export let data; 

    $: inAction = false;
    $: show = false;
    $: providerData = {name:'',id:'',phone:''};
    $: date = null;
    $: materials = [];
    $: price = null;
    $: status = ''

    const print =  async (e) => {
        try {
            inAction = true;
            let {data} = await getInbound(e.target.id);
            date = data.date.toDate().toLocaleDateString('es-ES');
            materials = data.materials;
            price = data.price;
            status = data.payed ? 'Cancelado' : 'Pendiente';
            let provider = data.provider.split('/')[2];
            let {person} = await getPeople(provider);
            const {name,id,phone} = person;
            providerData = {name,id,phone};
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
    $: console.log(providerData);
</script>


<Datatable style="padding:1em;" {settings} {data} bind:dataRows={rows}>
    <thead>
        <th style="padding:1em;" data-key="date">Fecha</th>
        <th style="padding:1em;" data-key="provider">Provedor</th>
        <th style="padding:1em;" data-key="materials">Cant. Materiales</th>
        <th style="padding:1em;" data-key="price">Precio acordado</th>
        <th style="padding:1em;" data-key="payed">Status</th>
        <th style="padding:1em;">Acciones</th>
    </thead>
    <tbody>
    {#if rows}
    {#each $rows as row}
        <tr>
            <td>{row.date}</td>
            <td>{row.provider}</td>
            <td>{row.materials}</td>
            <td>{row.price}</td>
            <td>{row.payed ? 'Cancelado' : 'Pendiente'}</td>
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
        <PrintInbound title="Entrada de material" {date} {price} {status}>
            <div style="width:100%;" slot="provider">
                <p>Nombre: {providerData.name}</p>
                <p>Cédula: {providerData.id}</p>
                <p>Telefono: {providerData.phone}</p>
            </div>
            <ul slot="materials">
                {#each materials as material}
                <li>{material.material.split('/')[2]} {material.cantidad} Kgs ó unidades</li>
                {/each}
            </ul>
        </PrintInbound>
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
