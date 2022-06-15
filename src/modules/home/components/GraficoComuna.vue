<template>
    <template v-if="isLoaded">
    <GChart
        type="AreaChart"
        :data="chartData"
        :options="chartOptions"
    /> 
    </template>
    <template v-else><div class="spinner-border text-dark" role="status">
            <span class="visually-hidden">Espere...</span>
        </div></template>
</template>


<script lang="ts" setup>
import { GChart } from 'vue-google-charts';
import { D } from '../../../interfaces';

import { getArrayComunas, getPromSemanalComunas } from '../../../api/querys';
import { onBeforeMount, ref } from 'vue';

const props = defineProps<{
    registros: D[],
    color: string,
    prom?: boolean
}>();

const isLoaded = ref(false);
const arrayValores = ref<any>();
const chartData = ref<any>();
const chartOptions = ref<any>();

onBeforeMount(()=>{
    isLoaded.value = false;

    if(!props.prom){
        arrayValores.value = getArrayComunas(props.registros);
    } else {
        arrayValores.value = getPromSemanalComunas(props.registros);
    }
    chartData.value=arrayValores.value;
    chartOptions.value={
    
                colors: [props.color],
                height: 400,
                
                
            legend: { position: 'bottom' },
            showScale: true,
            isStacked: true
                
}
    isLoaded.value = true;


})







 

        
      
</script>