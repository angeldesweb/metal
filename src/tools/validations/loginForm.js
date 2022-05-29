export const warns = (values) => {
    const warnings = {}
    if (values.password && values.password.length < 6) {
        warnings.password = 'La contraseña debe tener al menos 6 carácteres';
    }
    if(values.email){
        const format = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
        let valid = format.test(values.email)
        if(!valid) warnings.email = 'Ingrese un correo electrónico válido'
    }
    return warnings;
}

