<script>
    //@ts-nocheck
    import { successRegister } from '../../tools/notifications/successNotifications';
    import { createOutbound } from '../../api/outbound';
    import FilterProvider from "../Molecules/Cards/FilterProvider.svelte";
    import Ammount from "../Molecules/Customs/Ammount.svelte";
    import InboundDetail from "../Molecules/Customs/InboundDetail.svelte";
    import PickerMaterials from "../Molecules/Customs/PickerMaterials.svelte";
    import { FormErrors } from '../../tools/notifications/errorsNotifications';

    const road = [FilterProvider,PickerMaterials,Ammount,'',InboundDetail];

    $: body = {}
    $: isSending = false;

    const addToBody = (key,value) => {
        body = {...body,[key]:value};
        sendBody();
    }
    const sendBody = async () => {
        isSending = true;
        let args = {
            materials:body.materials.map(doc => ({material:`/materials/${doc.name}`,cantidad:doc.cantidad}))
        }
        try {
            await createOutbound(args);
            body = {};
            successRegister();
            isSending = false;
            return
        } catch (error) {
                FormErrors(error);         
        }
    }
</script>

<div style:padding="3em" style:width='60vw' class="card w-96 bg-base-100 shadow-xl justify-self-center">
    <h2 class="card-title">Seleccione material saliente</h2>
    <br>
    <hr>
    <br>
    <PickerMaterials {addToBody} {isSending} />
</div>