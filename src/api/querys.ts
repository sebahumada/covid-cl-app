import axios from "axios";
import { transformData } from "../helpers";
import {
  ActivosComuna,
  ActivosRegion,
  Comunas,
  CovidNacional,
  CovidResumen,
  D,
  DataActivosComuna,
  Positividad,
  Region,
  TotalComuna,
  TotalRegion,
  UpdatedAt,
} from "../interfaces";
import { FechaValor } from "./../interfaces/index";

export const getRegiones = async (): Promise<Region[]> => {
  const { data } = await axios.get<Region[]>(
    "https://raw.githubusercontent.com/sebahumada/covid-data/main/Output/dataListaRegiones.json"
  );

  return data;
};

export const getComunas = async (): Promise<Comunas[]> => {
  const { data } = await axios.get<Comunas[]>(
    "https://raw.githubusercontent.com/sebahumada/covid-data/main/Output/dataRegionComuna.json"
  );

  return data;
};

export const getActivosComunas = async (): Promise<ActivosComuna> => {
  const { data } = await axios.get<DataActivosComuna>(
    "https://raw.githubusercontent.com/sebahumada/covid-data/main/Output/dataActivosComuna.json"
  );

  const tranformar = transformData(data);

  return tranformar;
};
// export const getActivosComunas = async (): Promise<ActivosComuna> => {
//   const { data } = await axios.get<ActivosComuna>(
//     "https://raw.githubusercontent.com/sebahumada/covid-data/main/Output/dataActivosComuna.json"
//   );

//   return data;
// };

export const getActivosRegiones = async():Promise<ActivosRegion>=>{
  const {data} = await axios.get<ActivosRegion>("https://raw.githubusercontent.com/sebahumada/covid-data/main/Output/dataActivosRegion.json");

  return data;

}


export const getUpdatedAt = async (): Promise<UpdatedAt> => {
  const { data } = await axios.get<UpdatedAt>(
    "https://raw.githubusercontent.com/sebahumada/covid-data/main/Output/dataUpdateAt.json"
  );

  return data;
};

export const getArray = (entrada: FechaValor[]) => {
  let salida: [[any, any]] = [["Fecha", "Valor"]];

  for (let i = 0; i < entrada.length; i++) {
    salida.push([entrada[i].Fecha, entrada[i].Valor]);
  }

  return salida;
};

export const getArrayComunas = (entrada: D[]) => {
  let salida: [[any, any]] = [["Fecha", "Valor"]];

  for (let i = 0; i < entrada.length; i++) {
    salida.push([entrada[i].F, entrada[i].V]);
  }

  return salida;
};

export const getTotalComunas = async():Promise<TotalComuna>=>{

  const { data } = await axios.get<TotalComuna>(
    "https://raw.githubusercontent.com/sebahumada/covid-data/main/Output/dataTotalesComuna.json"
  );

  return data;
}

export const getTotalRegiones = async():Promise<TotalRegion>=>{

  const { data } = await axios.get<TotalRegion>(
    "https://raw.githubusercontent.com/sebahumada/covid-data/main/Output/dataTotalesRegion.json"
  );

  return data;
}

export const getResumenHome = async (): Promise<CovidResumen> => {
  const { data } = await axios.get<CovidResumen>(
    "https://raw.githubusercontent.com/sebahumada/covid-data/main/Output/dataResumen.json"
  );

  return data;
};

export const getActivosNacional = async (): Promise<CovidNacional> => {
  const { data } = await axios.get<CovidNacional>(
    "https://raw.githubusercontent.com/sebahumada/covid-data/main/Output/dataActivosNacional.json"
  );

  return data;
};


export const getTotalesFallecidosRegion = async():Promise<TotalRegion> => {

  const { data } = await axios.get<TotalRegion>(
    "https://raw.githubusercontent.com/sebahumada/covid-data/main/Output/dataTotalesFallecidosRegion.json"
  );

  return data;
}

export const getTotalesFallecidosComuna = async():Promise<TotalComuna> => {

  const { data } = await axios.get<TotalComuna>(
    "https://raw.githubusercontent.com/sebahumada/covid-data/main/Output/dataTotalesFallecidosComuna.json"
  );

  return data;
}
export const getPositividadNacional = async(): Promise<Positividad> =>{
  const { data } = await axios.get<Positividad>("https://raw.githubusercontent.com/sebahumada/covid-data/main/Output/dataPositividadNacionalDiaria.json");

  return data;
}





export const getPromSemanal = (entrada: FechaValor[]) => {
  
  let acumulador = 1;
  let suma = 0;

  const cantidadSemanas = Number((entrada.length / 7).toFixed(0));

  const quitar = entrada.length - cantidadSemanas*7;
  
  
  entrada.splice(0, quitar);
  

  let salida: [[any, any]] = [["Fecha", "Valor"]];
  for (let i = 0; i < entrada.length; i++) {
    suma = suma + entrada[i].Valor;
    acumulador = acumulador + 1;

    if (acumulador === 8) {
      salida.push([entrada[i].Fecha, suma]);
      suma = 0;
      
      acumulador = 1;
    }
  }

  if (acumulador > 1) {
    salida.push([entrada[entrada.length-1].Fecha, suma]);
  }

  return salida;
};

export const getPromSemanalComunas = (entrada: D[]) => {
  
  let acumulador = 1;
  let suma = 0;

  const cantidadSemanas = Number((entrada.length / 7).toFixed(0));

  const quitar = entrada.length - cantidadSemanas*7;
  
  
  entrada.splice(0, quitar);
  

  let salida: [[any, any]] = [["Fecha", "Valor"]];
  for (let i = 0; i < entrada.length; i++) {
    suma = suma + entrada[i].V;
    acumulador = acumulador + 1;

    if (acumulador === 8) {
      salida.push([entrada[i].F, suma]);
      suma = 0;      
      acumulador = 1;
    }
  }

  if (acumulador > 1) {
    salida.push([entrada[entrada.length-1].F, suma]);
  }

  return salida;
};
