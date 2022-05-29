<script>
    //@ts-nocheck
    import { successRegister } from '../../tools/notifications/successNotifications';
    import { createInbond } from '../../api/inbounds';
    import FilterProvider from "../Molecules/Cards/FilterProvider.svelte";
    import Ammount from "../Molecules/Customs/Ammount.svelte";
    import InboundDetail from "../Molecules/Customs/InboundDetail.svelte";
    import PickerMaterials from "../Molecules/Customs/PickerMaterials.svelte";
    import { FormErrors } from '../../tools/notifications/errorsNotifications';
    import { Info } from '../../tools/notifications/info';

    const road = [FilterProvider,PickerMaterials,Ammount,'',InboundDetail];

    $: body = {}
    $: index = Object.entries(body).length;
    $: end = false;
    $: isSending = false;

    const addToBody = (key,value) => {
        body = {...body,[key]:value}
    }

    const tabActions = (e) => {
        if(e.target.id > index){
            Info('Debe llenar primero los datos anteriores a este paso');
        }else {
            let keys = Object.entries(body).filter((entrie,i) => i < e.target.id);
            let result = Object.fromEntries(keys);
            body = result;

        }
    }

    const endRoad = async () => {
        isSending = true;
        let args = {
            provider:`/people/${body.provider.id}`,
            materials:body.materials.map(doc => ({material:`/materials/${doc.name}`,cantidad:doc.cantidad})),
            payed:body.payed,
            price:body.price
        }
        try {
            await createInbond(args);
            body = {};
            end = false;
            successRegister();
            return
        } catch (error) {
                FormErrors(error);         
        }
        end = true;
    }
</script>

<div style:padding="3em" style:width='60vw' class="card w-96 bg-base-100 shadow-xl justify-self-center">
    <h2 class="card-title">Nuevo ingreso de material</h2>
    <br>
    <hr>
    <br>
    <div class="tabs">
        <a href={null} id="0" on:click|preventDefault={tabActions} class="tab tab-sm tab-lifted" class:tab-active={index === 0}>Proveedor</a> 
        <a href={null} id="1" on:click|preventDefault={tabActions} class="tab tab-sm tab-lifted" class:tab-active={index === 1}>Material</a> 
        <a href={null} id="2" on:click|preventDefault={tabActions} class="tab tab-sm tab-lifted" class:tab-active={index === 2 || index === 3}>Monto</a>
        <a href={null} id="4" on:click|preventDefault={tabActions} class="tab tab-sm tab-lifted" class:tab-active={index === 4}>Confirmar</a>
    </div>
    <br>
    <svelte:component this={road[index]} {addToBody} {body} {endRoad} {isSending} />
</div>
<br>
<ul class="steps">
    <li class="step disabled" class:step-success={index > 0}>Paso 1</li>
    <li class="step disabled" class:step-success={index > 1} disabled>Paso 2</li>
    <li class="step disabled" class:step-success={index > 2}>Paso 3</li>
    <li class="step" data-content="✓" class:step-success={end}>Hecho</li>
  </ul>
