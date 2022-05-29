import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';

const errors = {
    'auth/user-not-found':'Usuario no registrado',
    'auth/wrong-password':'Correo o contraseña incorrectos',
    'auth/network-request-failed':'Problemas de conectividad al realizar la petición'
}


const CenterTop = new Notyf({
    duration:10000,
    position:{x:'center',y:'top'}
});

const RightTop = new Notyf({
    duration:10000,
    position:{x:'right',y:'top'}
});

export const loginErrors = (error) => CenterTop.error(errors[error.code] || error.message);
export const FormErrors = (error) => RightTop.error(error.message);