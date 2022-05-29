<script>
    import printJS from 'print-js';
    export let title;
    export let date;
    export let price;
    export let status;
</script>

<div class="box grid" id="print">
    <div>
        <h2 class="font-bold text-lg title">{title}</h2>
    </div>
    <br>
    <hr>
    <br>
    <div style="grid width:100%">
        <p style="font-size:.8rem">Material recibido el: {date}</p>
    </div>
    <p class="py-4 font-bold">Datos del proveedor</p>
    <slot name="provider"></slot>
    <p class="py-4 font-bold">Materiales recibidos</p>
    <slot name="materials"></slot>
    <div class="py-4">
        <p><b>Precio acordado: </b>{price}$ ({status}) </p>
    </div>
</div>
<div class="modal-action" id="">
    <label for="my-modal" class="btn">Cerrar</label>
    <button 
        class="btn btn-primary" 
        on:click={e => printJS({ 
            printable:'print',
            type:'html',
            targetStyles:'*',
            header:false,
            style:'width:100%'
        })}
    >   
        Imprimir
    </button>
</div>

<style>
    @media print {
        .box {
            width:100%;
            margin:0;
            padding:0;
        }
    }
</style>
