
// Para poder usar esta función fuera necesitamos colocar la palabar export,
// adicionalmente si vemos en alguno de los archivos creados por el framework
// angular dicha palabra ya viene por defecto
export function mensaje( nombre: string ){
    return `Saludos ${ nombre }`;
    // return true;
}