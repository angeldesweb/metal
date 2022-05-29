import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';

const CenterTop = new Notyf({
    duration:3000,
    position:{x:'center',y:'top'}
});

const RightTop = new Notyf({
    duration:4000,
    position:{x:'right',y:'top'}
})

export const loginSuccess = () => CenterTop.success('Saludos, cuentas con acceso a la aplicación')
export const successRegister = () => RightTop.success('Registrado exitosamente');