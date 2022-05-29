<script>
    import Form from '../Molecules/Forms/Form.svelte';
    import { addPeople } from '../../api/people';
    import { successRegister } from '../../tools/notifications/successNotifications';
    import { FormErrors } from '../../tools/notifications/errorsNotifications';
    import { warns } from '../../tools/validations/providerForm'
    const fields = [
        {
            label:'Cédula de identidad',
            placeholder:'N° de Cédula',
            type:'text',
            name:'id'
        },
        {
            label:'Nombre',
            placeholder:'Nombre del proveedor',
            type:'text',
            name:'name'
        },
        {
            label:'Teléfono',
            placeholder:'N° de teléfono del proveedor',
            type:'text',
            name:'phone'
        }
    ]
    const onSubmit = (values) => addPeople(values);
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
        title="Registrar nuevo proveedor"
        action="Registrar"
        {onSubmit}
        {onSuccess}
        {onError}
        {fields}
        {warns}
    />
</section>
