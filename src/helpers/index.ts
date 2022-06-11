import dayjs from "dayjs";


export const FormatNumber = (num:number):string =>{

    return Intl.NumberFormat('es-CL').format(num);
}

export const FormatFecha = (fecha:string):string => {

    return dayjs(`${fecha}`).format('DD-MM-YYYY');
}

export const diferenciaActivos = (num:number):string =>{

    if(num>0){
        return `(+${FormatNumber(num)} casos)`;
    } else if(num<0) {
        return `(${FormatNumber(num)} casos)`;
    } else {
        return '(sin diferencia de casos)'
    }    
}