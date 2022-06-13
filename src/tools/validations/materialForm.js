export const warns = (values) => {
    
    const warnings = {}
    if (!values.name) {
        warnings.name = 'Este campo es requerido';
    };
    if(!values.tipo) {
        warnings.tipo = 'Debe seleccionar un tipo de material'
    };
    if(!values.medidas) {
        warnings.medidas = 'Seleccione una unidad de medida'
    };
    if(values.cantidad < 0 && values.cantidad !== 0) {
        warnings.cantidad = 'Ingrese cantidad inicial o 0 si no posee existencia'
    }
    return warnings;
}