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

        <!-- <h3>Casos Activos</h3>
        <GraficoCasos :registros="casosActivos" color="#e6d40b" />
        <h3>Casos Nuevos</h3>
        <GraficoCasos :registros="casosNuevos" color="#f92d04" />
        <h3>Fallecidos</h3>
        <GraficoCasos :registros="fallecidos" color="#a015e8" /> -->
        <h3>Casos Activos</h3>
        <Graficov2 :registros="casosActivos" color="#e6d40b" />

        <h3>Casos Nuevos (7 días)</h3>
        <Graficov2 :registros="casosNuevos" color="#f92d04" :prom="true" />

        <h3>Fallecidos (7 días)</h3>
        <Graficov2 :registros="fallecidos" color="#a015e8" :prom="true" />
        

        

    </template>

    
</template>

<script lang="ts" setup>
import { onBeforeMount, ref } from 'vue';
import { getPromSemanal, getResumen } from '../../../api/querys';
import { CovidResumen, FechaValor } from '../../../interfaces';

import dayjs from 'dayjs';
import Graficov2 from './Graficov2.vue';




const resumen = ref<CovidResumen>({UpdatedAt: '', Data: []});
const isLoaded = ref<boolean>(false);
const casosActivos = ref<FechaValor[]>([]);
const casosNuevos = ref<FechaValor[]>([]);
const fallecidos = ref<FechaValor[]>([]);



onBeforeMount(async ()=>{
    isLoaded.value = false;
    resumen.value = await getResumen();

    casosActivos.value = resumen.value.Data[3].Cantidad;
    casosNuevos.value = resumen.value.Data[4].Cantidad;
    fallecidos.value = resumen.value.Data[1].Cantidad;
    
    isLoaded.value = true;

})








</script>