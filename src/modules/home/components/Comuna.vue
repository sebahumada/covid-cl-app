<template>
    <template v-if="isLoaded">

        <h5>Datos Informe Epidemiológico: <span class="badge bg-dark">{{ updateAt }}</span></h5>

        <div class="row">
            <div class="col-sm-4">
                <div class="card">
             <h5 class="card-header bg-light">Comuna: {{ datosComunaSeleccionada?.Comuna}}</h5>
                <div class="card-body">
                <h5 class="card-title">Región: {{ datosComunaSeleccionada?.Region }}</h5>
                <p class="card-text">Población: {{ FormatNumber(datosComunaSeleccionada?.Poblacion!)}} hab.</p>
                
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
                            (s/i)
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
                            {{ FormatNumber(totalComunaSeleccionada?.Total!)}} 
                        </p>
                    </div>
                </div>
            </div>

        </div>

        <h5>Casos Activos (Informe Epidemiológico)</h5>
        <GraficoComuna :registros="datosActivosComunaSeleccionada!.D" color="#e6d40b" />
    </template>
    <template v-else>
        <div class="spinner-border text-dark" role="status">
            <span class="visually-hidden">Espere...</span>
        </div>
    </template>
</template>

<script lang="ts" setup>

import { useComunasStore } from '../../../store/comunasStore';
import { useActivosComunasStore } from '../../../store/activosComunasStore';
import { onBeforeMount, ref } from 'vue';
import { Comunas, Lista, ListaTotalComuna } from '../../../interfaces';
import { FormatNumber, FormatFecha, diferenciaActivos, FormatDecimal } from '../../../helpers/index';
import GraficoComuna from './GraficoComuna.vue';
import { useTotalComunasStore } from '../../../store/totalComunasStore';

const props = defineProps<{    
    id: string    
}>();




const isLoaded = ref(false);

const listaComunasStore = useComunasStore();
const activosComunasStore = useActivosComunasStore();
const totalesComunasStore = useTotalComunasStore();

const totalComunaSeleccionada = ref<ListaTotalComuna>();
const datosComunaSeleccionada = ref<Comunas>();
const datosActivosComunaSeleccionada = ref<Lista>();

const casosActivos = ref<number>(0);
const casosActivosAnt = ref<number>(0);
const updateAt = ref('');



const tasa = ref(0);

onBeforeMount(async () => {
    isLoaded.value = false;

    datosComunaSeleccionada.value = listaComunasStore.comunas.find(comuna => comuna.CodComuna === props.id);
    datosActivosComunaSeleccionada.value = activosComunasStore.activosComunas.Lista.find(comuna => comuna.C === props.id)
    casosActivos.value = datosActivosComunaSeleccionada.value?.D[datosActivosComunaSeleccionada.value?.D.length-1].V!
    casosActivosAnt.value = casosActivos.value - datosActivosComunaSeleccionada.value?.D[datosActivosComunaSeleccionada.value?.D.length-2].V!
    updateAt.value = FormatFecha(activosComunasStore.activosComunas.UpdatedAt);
    totalComunaSeleccionada.value = totalesComunasStore.totalComunas.Lista.find(comuna => comuna.Comuna === props.id);
    tasa.value = (100000*casosActivos.value)/datosComunaSeleccionada.value?.Poblacion!;
    isLoaded.value = true;

})





</script>