<template>
    

    <template v-if="!isLoaded">
        Espere...
    </template>
    <template v-else>


       
        <h5>Resumen (Informe Diario)</h5>
        <div class="row align-items-start align-content-center">

            <div class="col-sm"  title="Datos de Informe Diario">
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

            <div class="col-sm"  title="Datos de Informe Diario">
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

            <div class="col-sm"  title="Datos de Informe Diario">
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

            <div class="col-sm"  title="Datos de Informe Diario">
                <div class="card text-white bg-success mb-3"  title="Datos de Informe Diario">
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

       
        <h5>Casos Activos (Informe Diario)</h5>
        <Graficov2 :registros="casosActivos" color="#e6d40b" />

        <h5>Casos Activos (Informe Epidemiológico)</h5>
        <Graficov2 :registros="casosActivosInfEpid" color="#e6d40b" />

        <h5>Casos Nuevos (7 días)</h5>
        <Graficov2 :registros="casosNuevos" color="#f92d04" :prom="true" />

        <h5>Fallecidos (7 días)</h5>
        <Graficov2 :registros="fallecidos" color="#a015e8" :prom="true" />
        
        

    </template>

    
</template>

<script lang="ts" setup>
import { onBeforeMount, ref } from 'vue';
import { CovidNacional, CovidResumen, FechaValor } from '../../../interfaces';


import Graficov2 from './Graficov2.vue';
import { useActivosNacionalStore } from '../../../store/activosNacionalStore';
import { useResumenStore } from '../../../store/resumenStore';
import { reloadStore } from '../../../store/storesHelper';



const isLoaded = ref<boolean>(false);

const resumen = ref<CovidResumen>({UpdatedAt: '', Data: []});
const activosNacional=ref<CovidNacional>({UpdatedAt:'', Lista:[]});

const casosActivos = ref<FechaValor[]>([]);
const casosActivosInfEpid = ref<FechaValor[]>([]);
const casosNuevos = ref<FechaValor[]>([]);
const fallecidos = ref<FechaValor[]>([]);

const resumenHome = useResumenStore();
const activosNacionalStore = useActivosNacionalStore();




onBeforeMount(async ()=>{
    
    
    isLoaded.value = false;   
    await reloadStore();


    resumen.value = resumenHome.resumen;
    

    activosNacional.value = activosNacionalStore.activosNacional;
    casosActivosInfEpid.value = activosNacional.value.Lista; 
    
        fallecidos.value = resumenHome.resumen.Data[1].Cantidad;
        casosActivos.value = resumenHome.resumen.Data[3].Cantidad;
        casosNuevos.value = resumenHome.resumen.Data[4].Cantidad;

    

    
    isLoaded.value = true;


    

});




</script>

