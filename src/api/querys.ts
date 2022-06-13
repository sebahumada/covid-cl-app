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
  Region,
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

export const getPromSemanal = (entrada: FechaValor[]) => {
  let semana = 1;
  let acumulador = 1;
  let suma = 0;

  let salida: [[any, any]] = [["Fecha", "Valor"]];
  for (let i = 0; i < entrada.length; i++) {
    suma = suma + entrada[i].Valor;
    acumulador = acumulador + 1;

    if (acumulador === 8) {
      salida.push(["Semana " + semana, suma]);
      suma = 0;
      semana = semana + 1;
      acumulador = 1;
    }
  }

  if (acumulador > 1) {
    salida.push(["Semana " + semana + " (en curso)", suma]);
  }

  return salida;
};

export const getPromSemanalComunas = (entrada: D[]) => {
  let semana = 1;
  let acumulador = 1;
  let suma = 0;

  let salida: [[any, any]] = [["Fecha", "Valor"]];
  for (let i = 0; i < entrada.length; i++) {
    suma = suma + entrada[i].V;
    acumulador = acumulador + 1;

    if (acumulador === 8) {
      salida.push(["Semana " + semana, suma]);
      suma = 0;
      semana = semana + 1;
      acumulador = 1;
    }
  }

  if (acumulador > 1) {
    salida.push(["Semana " + semana + " (en curso)", suma]);
  }

  return salida;
};
