<script>
    //@ts-nocheck
    import { successRegister } from '../../tools/notifications/successNotifications';
    import { createSell } from '../../api/sells';
    import FilterOutbounds from "../Molecules/Cards/FilterOutbounds.svelte";
    import Ammount from "../Molecules/Customs/Ammount.svelte";
    import SellDetails from "../Molecules/Customs/SellDetails.svelte";
    import { FormErrors } from '../../tools/notifications/errorsNotifications';
    import { Info } from '../../tools/notifications/info';


    const road = [FilterOutbounds,Ammount,'',SellDetails];

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
            outbound:`/outbounds/${body.outbound.id}`,
            payed:body.payed,
            price:body.price
        }
        try {
            await createSell(args);
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
    <h2 class="card-title">Control de venta de material</h2>
    <br>
    <hr>
    <br>
    <div class="tabs">
        <a href={null} id="0" on:click|preventDefault={tabActions} class="tab tab-sm tab-lifted" class:tab-active={index === 0}>Salida</a> 
        <a href={null} id="1" on:click|preventDefault={tabActions} class="tab tab-sm tab-lifted" class:tab-active={index === 1 || index === 2}>Monto</a>
        <a href={null} id="4" on:click|preventDefault={tabActions} class="tab tab-sm tab-lifted" class:tab-active={index === 4}>Confirmar</a>
    </div>
    <br>
    <svelte:component this={road[index]} {addToBody} {body} {endRoad} {isSending} />
</div>
<br>
<ul class="steps">
    <li class="step disabled" class:step-success={index > 0}>Paso 1</li>
    <li class="step disabled" class:step-success={index > 1} disabled>Paso 2</li>
    <li class="step" data-content="✓" class:step-success={end}>Hecho</li>
  </ul>