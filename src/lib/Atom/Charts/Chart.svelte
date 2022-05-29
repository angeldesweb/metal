<script>
    import { onMount, tick , onDestroy } from 'svelte';
    import { Chart , registerables } from 'chart.js';
    import { randomHexColor } from '../../../tools/utils/generators';

    export let labels;
    export let values;
    export let title = "Chart";
    let color = () => randomHexColor();
    let backgrounds = labels.map(() => color())
    Chart.register(...registerables);
    let canvas;
    let ctx;
    let myChart;
    const data = {
        labels,
        datasets: [{
            label: title,
            data:values,
            backgroundColor:backgrounds,
            hoverOffset: 4
        }]
    };
    const config = {
        type: 'doughnut',
        data,
        options:{
            plugins:{
                legend:{
                    position:'bottom',
                    align:'center',
                    labels:{
                        usePointStyle:true
                    }
                }
            }
        }
    };
    onMount(async () => {
        ctx = canvas.getContext("2d");
        canvas.width = '200';
        canvas.height = '200';
        await tick();
        myChart = new Chart(ctx,config);
    });

    onDestroy(() => myChart.destroy());
</script>

<div class="card w-96 bg-base-100 shadow-xl">
    <h1 class="card-title text-center">{title}</h1>
    <canvas id="chart" bind:this={canvas} ></canvas>
</div>

<style>
    .card {
        padding:1em;
    }
</style>

