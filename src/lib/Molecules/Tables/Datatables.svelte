<script>
    import Grid from 'gridjs-svelte';

    export let data;

    const languaje = {
        search:'Buscar',
        pagination:{
            'showing':'Del',
            'to':'al',
            'of':'de',
            'results':'Resultados',
            previous:'Anterior',
            next:'Siguiente'
        },
        
    }
    const paginationConfig = {
        enabled:data.length >= 5 ? true : false,
        limit:5
    }
</script>

<Grid 
    width="100%"
    autoWidth={false}
    {data}
    pagination={paginationConfig}
    search={ data.length >= 5 ? true : false}
    language={languaje}
/>