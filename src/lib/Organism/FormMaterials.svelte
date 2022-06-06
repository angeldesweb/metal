<script>
    import Form from '../Molecules/Forms/Form.svelte';
    import { addMaterial } from '../../api/materials';
    import { successRegister } from '../../tools/notifications/successNotifications';
    import { FormErrors } from '../../tools/notifications/errorsNotifications';
    import { warns } from '../../tools/validations/materialForm';
    const fields = [
        {
            label:'Material',
            placeholder:'Nombre del material',
            type:'text',
            name:'name'
        },
        {
            label:'Tipo de material',
            placeholder:'Seleccione uno',
            type:'select',
            name:'tipo',
            options:['Ferroso','No ferroso']
        },
        {
            label:'Unidad de medición',
            placeholder:'Seleccione uno',
            type:'select',
            name:'medidas',
            options:['Kg','Unidades']
        },
        {
            label:'Cantidad existente',
            placeholder:'Cantidad actual en existencia',
            type:'number',
            name:'cantidad'
        },
        {
            label:'Precio',
            placeholder:'Precio por unidad',
            type:'number',
            name:'precio'
        }
    ]
    const onSubmit = (values) => addMaterial(values);
    const onSuccess = (_,{reset}) => {
        successRegister();
        reset();
    }
    const onError = (err,{reset}) => {
        FormErrors(err);
        reset();
    }
</script>

<section>
    <Form
        title="Registrar nuevo material"
        action="Registrar"
        {onSubmit}
        {onSuccess}
        {onError}
        {fields}
        {warns}
    />
</section>

