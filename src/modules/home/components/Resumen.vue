<template>
    

    <template v-if="!isLoaded">
        Espere...
    </template>
    <template v-else>

        <h1><span class="badge bg-dark">Covid en Chile</span></h1>
        <hr />
        <h4>Actualizado al: <span class="badge bg-success">{{ dayjs(`${resumen.UpdatedAt}`).format('DD-MM-YYYY') }}</span></h4>

        <hr />

        <div class="row align-items-start align-content-center">

            <div class="col-sm">
                <div class="card text-white bg-danger mb-3">
                    <div class="card-header">
                        Casos Nuevos
                    </div>
                    <div class="card-body">
                        <p class="card-text">
                            {{ Intl.NumberFormat('es-CL').format(resumen.Data[4].Cantidad[resumen.Data[4].Cantidad.length-1].Valor)}}
                        </p>
                    </div>
                </div>
            </div>

            <div class="col-sm">
                <div class="card text-dark bg-warning mb-3">
                    <div class="card-header">
                        Casos Activos
                    </div>
                    <div class="card-body">
                        <p class="card-text">
                            {{ Intl.NumberFormat('es-CL').format(resumen.Data[3].Cantidad[resumen.Data[3].Cantidad.length-1].Valor)}}
                        </p>
                    </div>
                </div>
            </div>

            <div class="col-sm">
                <div class="card text-white bg-primary mb-3">
                    <div class="card-header">
                        Fallecidos Totales
                    </div>
                    <div class="card-body">
                        <p class="card-text">
                            {{ Intl.NumberFormat('es-CL').format(resumen.Data[2].Cantidad[resumen.Data[2].Cantidad.length-1].Valor)}} ({{ Intl.NumberFormat('es-CL').format(resumen.Data[1].Cantidad[resumen.Data[1].Cantidad.length-1].Valor)}} hoy)
                        </p>
                    </div>
                </div>
            </div>

            <div class="col-sm">
                <div class="card text-white bg-success mb-3">
                    <div class="card-header">
                        Casos Totales
                    </div>
                    <div class="card-body">
                        <p class="card-text">
                            {{ Intl.NumberFormat('es-CL').format(resumen.Data[0].Cantidad[resumen.Data[0].Cantidad.length-1].Valor)}}
                        </p>
                    </div>
                </div>
            </div>

            


        </div>

       
        <h3>Casos Activos (Informe Diario)</h3>
        <Graficov2 :registros="casosActivos" color="#e6d40b" />

        <h3>Casos Activos (Informe Epidemiológico)</h3>
        <Graficov2 :registros="casosActivosInfEpid" color="#e6d40b" />

        <h3>Casos Nuevos (7 días)</h3>
        <Graficov2 :registros="casosNuevos" color="#f92d04" :prom="true" />

        <h3>Fallecidos (7 días)</h3>
        <Graficov2 :registros="fallecidos" color="#a015e8" :prom="true" />
        
        <br/>
        <p>Datos obtenidos gracias a <a href="https://minciencia.gob.cl/covid19/" target="_blank">Base de Datos COVID-19 - Ministerio de Ciencia, Tecnología, Conocimiento e Innovación</a></p>

    </template>

    
</template>

<script lang="ts" setup>
import { onBeforeMount, ref } from 'vue';
import { getActivosNacional, getPromSemanal, getResumen } from '../../../api/querys';
import { CovidNacional, CovidResumen, FechaValor } from '../../../interfaces';

import dayjs from 'dayjs';
import Graficov2 from './Graficov2.vue';




const resumen = ref<CovidResumen>({UpdatedAt: '', Data: []});
const isLoaded = ref<boolean>(false);
const casosActivos = ref<FechaValor[]>([]);
const casosActivosInfEpid = ref<FechaValor[]>([]);
const casosNuevos = ref<FechaValor[]>([]);
const fallecidos = ref<FechaValor[]>([]);
const activosNacional = ref<CovidNacional>();


onBeforeMount(async ()=>{
    isLoaded.value = false;
    resumen.value = await getResumen();
    activosNacional.value = await getActivosNacional();

    casosActivos.value = resumen.value.Data[3].Cantidad;
    casosActivosInfEpid.value = activosNacional.value.Lista; 
    casosNuevos.value = resumen.value.Data[4].Cantidad;
    fallecidos.value = resumen.value.Data[1].Cantidad;
    
    isLoaded.value = true;

})








</script>