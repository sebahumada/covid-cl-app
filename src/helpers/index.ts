import dayjs from "dayjs";
import { DataActivosComuna,  ActivosComuna} from './../interfaces/index';
import { ListaTotalComuna, D } from '../interfaces/index';



export const FormatNumber = (num:number):string =>{

    return Intl.NumberFormat('es-CL').format(num);
}

export const FormatDecimal = (num:number, decimales:number=2):string =>{
    const numeroDecimales = Number(num.toFixed(decimales));


    return Intl.NumberFormat('es-CL').format(numeroDecimales);
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


export const transformData = (entrada:DataActivosComuna):ActivosComuna =>{

    const salida:ActivosComuna = { UpdatedAt: entrada.UpdatedAt, Lista: []};




    entrada.Lista.forEach(x=>{

        let comuna:ListaTotalComuna={C:'',D:[]};

        comuna.C = x.C;

        let datosComuna:D[]=[];

        for(let i=0;i<entrada.Fechas.length;i++){

            let fecha = entrada.Fechas[i];
            let valor = x.D[i];



            let datoComuna:D = { F: fecha, V: valor}
            datosComuna.push(datoComuna);
        }


        comuna.D = datosComuna;

        salida.Lista.push(comuna);


    });



    return salida;

    



    


    


}