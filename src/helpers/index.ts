

export const FormatNumber = (num:number):string =>{

    return Intl.NumberFormat('es-CL').format(num);
}