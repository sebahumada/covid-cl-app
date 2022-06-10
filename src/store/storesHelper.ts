import { useActivosNacionalStore } from "./activosNacionalStore";
import { useComunasStore } from "./comunasStore";
import { useRegionStore } from "./regionesStore";
import { useResumenStore } from "./resumenStore";
import { useActivosComunasStore } from "./activosComunasStore";
import { useActivosRegionesStore } from "./activosRegionesStore";

export const reloadStore = async () => {
  const activosNacional = useActivosNacionalStore();
  const regiones = useRegionStore();
  const comunas = useComunasStore();
  const resumenHome = useResumenStore();
  const activosComunas = useActivosComunasStore();
  const activosRegiones = useActivosRegionesStore();

  if (activosNacional.activosNacional.Lista.length === 0) {
    await activosNacional.getActivosNacional();
  }

  if (resumenHome.resumen.Data.length === 0) {
    await resumenHome.getResumenHome();
  }
  if (regiones.regiones.length === 0) {
    await regiones.getRegiones();
  }

  if (comunas.comunas.length === 0) {
    await comunas.getComunas();
  }

  if(activosComunas.activosComunas.Lista.length === 0){
    await activosComunas.getActivosComunas();
  }

  if(activosRegiones.activosRegiones.Lista.length === 0){
    await activosRegiones.getActivosRegiones();
  }
};
