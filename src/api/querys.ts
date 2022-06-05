import axios from "axios";
import { CovidNacional, CovidResumen, UpdatedAt } from "../interfaces";
import { FechaValor } from './../interfaces/index';



export const getResumen = async (): Promise<CovidResumen> => {
  const updatedAt = await getUpdatedAt();

  const local = localStorage.getItem("dataResumen");
  const localUpdated = localStorage.getItem("updatedAt");


  if (
    local === null ||
    localUpdated === null
  )
    return await getDataResumen();

  if(localUpdated !== updatedAt.UpdatedDate) return await getDataResumen();

  const data:CovidResumen = JSON.parse(local);

  return data;
};

export const getDataResumen = async (): Promise<CovidResumen> => {
  const { data } = await axios.get<CovidResumen>(
    "https://raw.githubusercontent.com/sebahumada/covid-data/main/Output/dataResumen.json"
  );
  localStorage.setItem("dataResumen", JSON.stringify(data));
  localStorage.setItem("updatedAt", data.UpdatedAt);

  return data;
};

export const getUpdatedAt = async (): Promise<UpdatedAt> => {
  const { data } = await axios.get<UpdatedAt>(
    "https://raw.githubusercontent.com/sebahumada/covid-data/main/Output/dataUpdateAt.json"
  );

  return data;
};

export const getArray = (entrada:FechaValor[]) =>{

    let salida:[[any, any]] = [['Fecha','Valor']];

    for(let i=0;i<entrada.length;i++){
      salida.push([entrada[i].Fecha, entrada[i].Valor])
    }

    
    
    return salida;
}



export const getActivosNacional = async():Promise<CovidNacional> => {
   const {data} = await axios.get<CovidNacional>("https://raw.githubusercontent.com/sebahumada/covid-data/main/Output/dataActivosNacional.json");

   return data;
}


export const getPromSemanal = (entrada:FechaValor[]) =>{

  let semana=1;
  let acumulador=1;
  let suma=0;

  let salida:[[any, any]] = [['Fecha','Valor']];
  for(let i=0;i<entrada.length;i++){

    suma = suma+entrada[i].Valor;
    acumulador=acumulador+1;

    if(acumulador === 8){
      
      
          
      salida.push(['Semana '+semana, suma]);
      suma=0;
      semana=semana+1;
      acumulador = 1;
    }
  }

  
  
  
  if(acumulador>1) {
    salida.push(['Semana '+semana+'(en curso)', suma]);
  }

  return salida;


}
