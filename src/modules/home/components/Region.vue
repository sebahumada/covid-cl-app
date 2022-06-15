<template>
    <template v-if="isLoaded">


        <h5>Datos Informe Epidemiológico: <span class="badge bg-dark">{{ updateAt }}</span></h5>

        <div class="row">
            <div class="col-sm-4">
                <div class="card">
                    <h5 class="card-header bg-light">Región: {{ datosRegionSeleccionada?.Nombre}}</h5>
                    <div class="card-body">                
                        <p class="card-text">Población: {{ FormatNumber(datosActivosRegionSeleccionada?.Poblacion!)}} hab.</p>                
                    </div>
                </div>
            </div>            

        </div>       


        <hr />
        
        <div class="row">
            <div class="col-sm-4"  title="Datos de Informe Diario">
                <div class="card text-dark bg-warning mb-3">
                    <div class="card-header h5">
                        Casos Activos
                    </div>
                    <div class="card-body">
                        <p class="card-text">
                            {{ FormatNumber(casosActivos)}} {{ diferenciaActivos(casosActivosAnt)}}
                        </p>
                        <p class="card-text">
                            {{ FormatDecimal(tasa,1) }} casos cada 100.000 hab.
                        </p>
                    </div>
                </div>
            </div>

            <div class="col-sm-4"  title="Datos de Informe Diario">
                <div class="card text-white bg-primary mb-3">
                    <div class="card-header h5">
                        Fallecidos Totales
                    </div>
                    <div class="card-body">
                        <p class="card-text">
                            {{ FormatNumber(totalFallecidosRegionSeleccionada?.Total!)}} 
                        </p>
                    </div>
                </div>
            </div>

            <div class="col-sm-4"  title="Datos de Informe Diario">
                <div class="card text-white bg-success mb-3"  title="Datos de Informe Diario">
                    <div class="card-header h5">
                        Casos Totales
                    </div>
                    <div class="card-body">
                        <p class="card-text">
                            {{ FormatNumber(totalRegionSeleccionada?.Total!)}} 
                        </p>
                    </div>
                </div>
            </div>

            

        </div>

        <h5>Casos Activos (Informe Epidemiológico)</h5>
        <GraficoRegion :registros="datosActivosRegionSeleccionada!.Data" color="#e6d40b" />
    </template>
    <template v-else>
        <div class="spinner-border text-dark" role="status">
            <span class="visually-hidden">Espere...</span>
        </div>
    </template>
</template>

<script lang="ts" setup>


import { onBeforeMount, ref } from 'vue';
import { ListaRegion, ListaTotalRegion, Region } from '../../../interfaces';
import { FormatNumber, FormatFecha, diferenciaActivos, FormatDecimal } from '../../../helpers/index';
import GraficoRegion from './GraficoRegion.vue';
import { useRegionStore } from '../../../store/regionesStore';
import { useActivosRegionesStore } from '../../../store/activosRegionesStore';
import { useTotalRegionesStore } from '../../../store/totalRegionesStore';

const props = defineProps<{    
    id: string    
}>();




const isLoaded = ref(false);

const listaRegionesStore = useRegionStore();
const activosRegionesStore = useActivosRegionesStore();
const totalRegionesStore = useTotalRegionesStore();

const datosRegionSeleccionada = ref<Region>();
const totalRegionSeleccionada = ref<ListaTotalRegion>();
const totalFallecidosRegionSeleccionada = ref<ListaTotalRegion>();
const datosActivosRegionSeleccionada = ref<ListaRegion>();
const casosActivos = ref<number>(0);
const casosActivosAnt = ref<number>(0);

const updateAt = ref('');

const tasa = ref(0);

onBeforeMount(async () => {
    isLoaded.value = false;   
    
    
    datosRegionSeleccionada.value = listaRegionesStore.regiones.find(region=>region.CodRegion === props.id);

    updateAt.value = FormatFecha(activosRegionesStore.activosRegiones.UpdatedAt);
    
    datosActivosRegionSeleccionada.value = activosRegionesStore.activosRegiones.Lista.find(region=>region.CodRegion === props.id);

    casosActivos.value = datosActivosRegionSeleccionada.value?.Data[datosActivosRegionSeleccionada.value?.Data.length-1].Valor!;
    casosActivosAnt.value = casosActivos.value - datosActivosRegionSeleccionada.value?.Data[datosActivosRegionSeleccionada.value?.Data.length-2].Valor!;
    tasa.value = (100000*casosActivos.value)/datosActivosRegionSeleccionada.value?.Poblacion!;
    totalRegionSeleccionada.value = totalRegionesStore.totalRegiones.Lista.find(region=>region.Region === props.id);
    totalFallecidosRegionSeleccionada.value = totalRegionesStore.totalFallecidosRegiones.Lista.find(region=>region.Region === props.id);
    isLoaded.value = true;

})


</script>