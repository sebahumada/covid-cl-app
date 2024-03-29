import { useActivosNacionalStore } from "./activosNacionalStore";
import { useComunasStore } from "./comunasStore";
import { useRegionStore } from "./regionesStore";
import { useResumenStore } from "./resumenStore";
import { useActivosComunasStore } from "./activosComunasStore";
import { useActivosRegionesStore } from "./activosRegionesStore";
import { useTotalComunasStore } from "./totalComunasStore";
import { useTotalRegionesStore } from './totalRegionesStore';
import { usePositividadNacionalStore } from "./positividadNacionalStore";




export const reloadComunaRegionStore = async()=>{
  const activosNacional = useActivosNacionalStore();
  const activosComunas = useActivosComunasStore();
  const activosRegiones = useActivosRegionesStore();
  const totalComunas = useTotalComunasStore();
  const totalRegiones = useTotalRegionesStore();
  

  if (activosNacional.activosNacional.Lista.length === 0) {
    await activosNacional.getActivosNacional();
  }

  if(activosComunas.activosComunas.Lista.length === 0){
    await activosComunas.getActivosComunas();
  }

  if(activosRegiones.activosRegiones.Lista.length === 0){
    await activosRegiones.getActivosRegiones();
  }

  if(totalComunas.totalComunas.Lista.length === 0){
    await totalComunas.getTotalComunas();
  }

  if(totalComunas.totalFallecidosComuna.Lista.length === 0){
    await totalComunas.getTotalFallecidosComuna();
  }

  if(totalRegiones.totalRegiones.Lista.length === 0){
    await totalRegiones.getTotalRegiones();
  }

  if(totalRegiones.totalFallecidosRegiones.Lista.length === 0){
    await totalRegiones.getTotalesFallecidosRegion();
  }



}



export const reloadStore = async () => {
  const regiones = useRegionStore();
  const comunas = useComunasStore();
  const resumenHome = useResumenStore();
  const positividad = usePositividadNacionalStore();

  if (resumenHome.resumen.Data.length === 0) {
    await resumenHome.getResumenHome();
  }
  if (regiones.regiones.length === 0) {
    await regiones.getRegiones();
  }

  if (comunas.comunas.length === 0) {
    await comunas.getComunas();
  }

  
  if(positividad.positividad.Lista.length === 0){
    await positividad.getPositividadNacional();
  }
  
};
