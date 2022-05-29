export const warns = (values) => {
    const warnings = {}
    if (!values.name) {
        warnings.name = 'Debe ingresar un nombre';
    }
    if(values.id){
        const format = /([V,E]-[0-9]{6,8})/g
        let valid = format.test(values.id)
        if(!valid) warnings.id = 'Formato de cédula incorrecto EJ: (V-12345678)'
    }
    if(values.phone){
        const format = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/i
        let valid = format.test(values.phone)
        if(!valid) warnings.phone = 'Formato de teléfono incorrecto EJ: (+5804241112233 ó 04241112233)'
    }
    return warnings;
}