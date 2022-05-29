<script>
    import { signUp } from "../../api/auth";
    import { auth, lrouter, user } from '../../store';
    import { loginSuccess } from '../../tools/notifications/successNotifications';
    import { loginErrors } from '../../tools/notifications/errorsNotifications';
    import Form from "../Molecules/Forms/Form.svelte";
    import { warns } from '../../tools/validations/loginForm';
    import { Info } from "../../tools/notifications/info";
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
        },
        {
            label:'Nombre',
            placeholder:'Nombre del usuario',
            type:'text',
            name:'name'
        },
        {
            label:'Rol',
            placeholder:'Seleccione uno',
            type:'select',
            name:'role',
            options:['Dev','Adm','Usr']
        }
    ]
    const onSubmit = (values) => signUp(values);
    const onSuccess = (response,{reset}) => {
        Info('Al finalizar de incluir usuarios, cierre y reinicie su sesión antes de continar trabajando');
        reset();
    } 
    const onError = (err,{reset}) => {
        loginErrors(err);
        reset();
    }
</script>


<section>
    <Form
        title="Registro de nuevo usuario"
        {fields}
        action="Registrar"
        {onSubmit}
        {onSuccess}
        {onError}
        {warns}
    />
</section>