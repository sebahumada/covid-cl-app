<template>
    <template v-if="isLoaded">
        <div class="card">
            <h5 class="card-header bg-light">Comuna: {{ datosComunaSeleccionada?.Comuna}}</h5>
            <div class="card-body">
                <h5 class="card-title">Región: {{ datosComunaSeleccionada?.Region }}</h5>
                <p class="card-text">Población: {{ FormatNumber(datosComunaSeleccionada?.Poblacion!)}} hab.</p>
                
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
        <GraficoComuna :registros="datosActivosComunaSeleccionada!.D" color="#e6d40b" />
    </template>
    <template v-else>
        Espere...
    </template>
</template>

<script lang="ts" setup>

import { useComunasStore } from '../../../store/comunasStore';
import { useActivosComunasStore } from '../../../store/activosComunasStore';
import { onBeforeMount, ref } from 'vue';
import { Comunas, Lista } from '../../../interfaces';
import { FormatNumber } from '../../../helpers/index';
import GraficoComuna from './GraficoComuna.vue';

const props = defineProps<{    
    id: string    
}>();




const isLoaded = ref(false);

const listaComunasStore = useComunasStore();
const activosComunasStore = useActivosComunasStore();

const datosComunaSeleccionada = ref<Comunas>();
const datosActivosComunaSeleccionada = ref<Lista>();

const casosActivos = ref<number>(0);
const casosActivosAnt = ref<number>(0);

onBeforeMount(async () => {
    isLoaded.value = false;

    datosComunaSeleccionada.value = listaComunasStore.comunas.find(comuna => comuna.CodComuna === props.id);
    datosActivosComunaSeleccionada.value = activosComunasStore.activosComunas.Lista.find(comuna => comuna.C === props.id)
    casosActivos.value = datosActivosComunaSeleccionada.value?.D[datosActivosComunaSeleccionada.value?.D.length-1].V!
    casosActivosAnt.value = casosActivos.value - datosActivosComunaSeleccionada.value?.D[datosActivosComunaSeleccionada.value?.D.length-2].V!
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