<template>
    

    <template v-if="!isLoaded">
        <div class="spinner-border text-dark" role="status">
            <span class="visually-hidden">Espere...</span>
        </div>
    </template>
    <template v-else>


       
        <h5>Resumen Informe Diario al: <span class="badge bg-dark">{{ updateAt }}</span></h5>
        <div class="row align-items-start align-content-center">

            <div class="col-sm"  title="Datos de Informe Diario">
                <div class="card text-white bg-danger mb-3">
                    <div class="card-header h5">
                        Casos Nuevos
                    </div>
                    <div class="card-body">
                        <p class="card-text">
                            {{ FormatNumber(resumen.Data[4].Cantidad[resumen.Data[4].Cantidad.length-1].Valor)}}
                        </p>
                    </div>
                </div>
            </div>

            <div class="col-sm"  title="Datos de Informe Diario">
                <div class="card text-dark bg-warning mb-3">
                    <div class="card-header h5">
                        Casos Activos
                    </div>
                    <div class="card-body">
                        <p class="card-text">
                            {{ FormatNumber(resumen.Data[3].Cantidad[resumen.Data[3].Cantidad.length-1].Valor)}}
                        </p>
                    </div>
                </div>
            </div>

            <div class="col-sm"  title="Datos de Informe Diario">
                <div class="card text-white bg-primary mb-3">
                    <div class="card-header h5">
                        Fallecidos Totales
                    </div>
                    <div class="card-body">
                        <p class="card-text">
                            {{ FormatNumber(resumen.Data[2].Cantidad[resumen.Data[2].Cantidad.length-1].Valor)}} ({{ FormatNumber(resumen.Data[1].Cantidad[resumen.Data[1].Cantidad.length-1].Valor)}} hoy)
                        </p>
                    </div>
                </div>
            </div>

            <div class="col-sm"  title="Datos de Informe Diario">
                <div class="card text-white bg-success mb-3"  title="Datos de Informe Diario">
                    <div class="card-header h5">
                        Casos Totales
                    </div>
                    <div class="card-body">
                        <p class="card-text">
                            {{ FormatNumber(resumen.Data[0].Cantidad[resumen.Data[0].Cantidad.length-1].Valor)}}
                        </p>
                    </div>
                </div>
            </div>

            


        </div>

       
        <h5>Casos Activos (Informe Diario)</h5>
        <Graficov2 :registros="casosActivos" color="#e6d40b" />       

        <h5>Casos Nuevos (7 días)</h5>
        <Graficov2 :registros="casosNuevos" color="#f92d04" :prom="true" />

        <h5>Fallecidos (7 días)</h5>
        <Graficov2 :registros="fallecidos" color="#a015e8" :prom="true" />
        
        

    </template>

    
</template>

<script lang="ts" setup>
import { onBeforeMount, ref } from 'vue';
import { CovidResumen, FechaValor } from '../../../interfaces';


import Graficov2 from './Graficov2.vue';
import { useResumenStore } from '../../../store/resumenStore';
import { reloadStore } from '../../../store/storesHelper';
import { FormatFecha } from '../../../helpers';
import { FormatNumber } from '../../../helpers/index';



const isLoaded = ref<boolean>(false);

const resumenHome = useResumenStore();
const resumen = ref<CovidResumen>({UpdatedAt: '', Data: []});
const casosActivos = ref<FechaValor[]>([]);const casosNuevos = ref<FechaValor[]>([]);
const fallecidos = ref<FechaValor[]>([]);
const updateAt = ref('');





onBeforeMount(async ()=>{
    
    
    isLoaded.value = false;   
    await reloadStore();


    resumen.value = resumenHome.resumen;
    
    updateAt.value = FormatFecha(resumen.value.UpdatedAt);

    
    
    fallecidos.value = resumenHome.resumen.Data[1].Cantidad;
    casosActivos.value = resumenHome.resumen.Data[3].Cantidad;
    casosNuevos.value = resumenHome.resumen.Data[4].Cantidad;

    

    
    isLoaded.value = true;


    

});




</script>

