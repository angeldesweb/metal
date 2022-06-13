<script>
    import printJS from 'print-js';
    export let title;
</script>

<div class="box grid" id="print">
    <div>
        <h2 class="font-bold text-lg title">{title}</h2>
    </div>
    <br>
    <hr>
    <br>
    <p class="py-4 font-bold">Detalle</p>
    <slot name="material"></slot>
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