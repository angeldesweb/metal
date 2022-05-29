<script>
    import { signIn } from "../../api/auth";
    import { auth, lrouter, user } from '../../store';
    import { loginSuccess } from '../../tools/notifications/successNotifications';
    import { loginErrors } from '../../tools/notifications/errorsNotifications';
    import Form from "../Molecules/Forms/Form.svelte";
    import { warns } from '../../tools/validations/loginForm';
    const fields = [
        {
            label:'Correo electrónico',
            placeholder:'ejemplo@mail.com',
            type:'email',
            name:'email'
        },
        {
            label:'Contraseña',
            placeholder:'Ingrese su contraseña',
            type:'password',
            name:'password'
        }
    ]
    const onSubmit = (values) => signIn(values);
    const onSuccess = (response,{reset}) => {
        auth.authenticate();
        user.setUser(response)
        loginSuccess();
        reset();
    } 
    const onError = (err,{reset}) => {
        loginErrors(err);
        reset();
    }

    const reset = () => lrouter.navigateTo('pass');
</script>


<section>
    <Form
        header="MetalRecuperadora"
        subtitle="Sistema de control de inventarios"
        {fields}
        action="Iniciar sesión"
        {onSubmit}
        {onSuccess}
        {onError}
        {warns}
    />
</section>
<br>
<div class="card w-96 bg-base-100 shadow-xl justify-self-center" style="padding:1em;text-align:center">
    <a class="link link-hover link-primary" href={null} on:click|preventDefault={reset}>Olvidé mi contraseña</a>
</div>
