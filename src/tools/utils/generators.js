export const randomHexColor = () => {
    // Generate a random 2 digit hex number, padded with a 0 if necessary
    const part = () => Math.floor(Math.random() * 256)
    .toString(16)
    .padStart(2, '0');
    
    const r = part();
    
    const g = part();
    
    const b = part();
    
    return `#${r}${g}${b}`;
};