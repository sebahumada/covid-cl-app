<template>
    <template v-if="isLoaded">
    <GChart
        type="AreaChart"
        :data="chartData"
        :options="chartOptions"
    /> 
    </template>
    <template v-else>Espere...</template>
</template>


<script lang="ts" setup>
import { GChart } from 'vue-google-charts';
import { FechaValor } from '../../../interfaces';

import { getArray, getPromSemanal } from '../../../api/querys';
import { onBeforeMount, ref } from 'vue';

const props = defineProps<{
    registros: FechaValor[],
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
        arrayValores.value = getArray(props.registros);
    } else {
        arrayValores.value = getPromSemanal(props.registros);
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