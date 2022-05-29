<script>
    import { router, user } from "../store";
    import Header from "../lib/Molecules/Header/Header.svelte";
    import FormMaterials from "../lib/Organism/FormMaterials.svelte";
    import FormProviders from "../lib/Organism/FormProviders.svelte";
    import HomeCharts from "../lib/Organism/HomeCharts.svelte";
    import TableMaterial from "../lib/Organism/TableMaterial.svelte";
    import TableProvider from "../lib/Organism/TableProvider.svelte";
    import ActionInbound from "../lib/Organism/ActionInbound.svelte";
    import ActionOutbound from "../lib/Organism/ActionOutbound.svelte";
    import TableInbounds from "../lib/Organism/TableInbounds.svelte";
    import TableUser from "../lib/Organism/TableUser.svelte";
    import NotAuth from "../lib/Organism/NotAuth.svelte";
    import UserForm from "../lib/Organism/UserForm.svelte";
    import Print from "../lib/Organism/PrintInbound.svelte";    
    import TableOutbounds from "../lib/Organism/TableOutbounds.svelte";
    import ActionSell from "../lib/Organism/ActionSell.svelte";
    import TableSell from "../lib/Organism/TableSell.svelte";

    const views = {
        'home':HomeCharts,
        'n-material':FormMaterials,
        'n-provider':FormProviders,
        's-material':TableMaterial,
        's-provider':TableProvider,
        's-inbounds':TableInbounds,
        's-outbounds':TableOutbounds,
        's-sells':TableSell,
        'n-inbound':ActionInbound,
        'n-outbound':ActionOutbound,
        'n-sell':ActionSell,
        'a-users': $user.role === 'Dev' ? TableUser : NotAuth,
        'n-user':  $user.role === 'Dev' ? UserForm : NotAuth,
        'print':Print
    };
</script>

<main class="app ">
    <Header />
    <div class="section grid place-content-center">
        <svelte:component this={views[$router]} />
    </div>
</main>

<style>
    .app {
        min-height:100vh;
        width:100vw;
        padding:1em;
        background-image: url('../assets/images/background.png');
    }
    .section {
        min-height:60vh;
        margin-top:3em;
    }
</style>