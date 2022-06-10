<template>
    <template v-if="isLoaded">
        <div class="card">
            <h5 class="card-header bg-light">Región: {{ datosRegionSeleccionada?.Nombre}}</h5>
            <div class="card-body">
                
                <p class="card-text">Población: {{ FormatNumber(datosActivosRegionSeleccionada?.Poblacion!)}} hab.</p>
                
            </div>
        </div>
        <hr />
        <div class="row align-items-start align-content-center">

            <div class="col-sm"  title="Datos de Informe Diario">
                <div class="card text-dark bg-warning mb-3">
                    <div class="card-header">
                        Casos Activos
                    </div>
                    <div class="card-body">
                        <p class="card-text">
                            {{ FormatNumber(casosActivos)}} {{ diferenciaActivos(casosActivosAnt)}}
                        </p>
                    </div>
                </div>
            </div>

        </div>

        <h5>Casos Activos (Informe Epidemiológico)</h5>
        <GraficoRegion :registros="datosActivosRegionSeleccionada!.Data" color="#e6d40b" />
    </template>
    <template v-else>
        Espere...
    </template>
</template>

<script lang="ts" setup>


import { onBeforeMount, ref } from 'vue';
import { ListaRegion, Region } from '../../../interfaces';
import { FormatNumber } from '../../../helpers/index';
import GraficoRegion from './GraficoRegion.vue';
import { useRegionStore } from '../../../store/regionesStore';
import { useActivosRegionesStore } from '../../../store/activosRegionesStore';

const props = defineProps<{    
    id: string    
}>();




const isLoaded = ref(false);

const listaRegionesStore = useRegionStore();
const activosRegionesStore = useActivosRegionesStore();
const datosRegionSeleccionada = ref<Region>();
const datosActivosRegionSeleccionada = ref<ListaRegion>();
const casosActivos = ref<number>(0);
const casosActivosAnt = ref<number>(0);

onBeforeMount(async () => {
    isLoaded.value = false;

    
    datosRegionSeleccionada.value = listaRegionesStore.regiones.find(region=>region.CodRegion === props.id);


    
    datosActivosRegionSeleccionada.value = activosRegionesStore.activosRegiones.Lista.find(region=>region.CodRegion === props.id);

    casosActivos.value = datosActivosRegionSeleccionada.value?.Data[datosActivosRegionSeleccionada.value?.Data.length-1].Valor!;
    casosActivosAnt.value = casosActivos.value - datosActivosRegionSeleccionada.value?.Data[datosActivosRegionSeleccionada.value?.Data.length-2].Valor!;
    isLoaded.value = true;

})


const diferenciaActivos = (num:number):string =>{

    if(num>0){
        return `(+${FormatNumber(num)} casos)`;
    } else if(num<0) {
        return `(${FormatNumber(num)} casos)`;
    } else {
        return '(sin diferencia de casos)'
    }

    
}


</script>