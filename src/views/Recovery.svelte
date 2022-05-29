<script>
    import Form from "../lib/Molecules/Forms/Form.svelte";
    import { warns } from '../tools/validations/loginForm';
    import { loginErrors } from '../tools/notifications/errorsNotifications';
    import { resetPassword } from "../api/auth";
    import { lrouter } from "../store";

    const onSubmit = (values) => resetPassword(values.email);

    const fields = [
        {
            label:'Correo electrónico',
            placeholder:'ejemplo@mail.com',
            type:'email',
            name:'email'
        }
    ]

    const onSuccess = (response,{reset}) => {
        alert(JSON.stringify(response));
        lrouter.navigateTo('signin');
        reset();
    } 

    const onError = (err,{reset}) => {
        loginErrors(err);
        reset();
    }
</script>


<Form
    title="Reestablecer contraseña"
    {fields}
    action="Reestablecer"
    {onSubmit}
    {onSuccess}
    {onError}
    {warns}
/>
