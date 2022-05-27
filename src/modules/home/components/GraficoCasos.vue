<template>
    <Bar
                :chart-options="chartOptions"
                :chart-data="chartData"
                :chart-id="chartId"
                :dataset-id-key="datasetIdKey"
                :width="400"
                :height="150"
            />
    <!-- <Line
                :chart-options="chartOptions"
                :chart-data="chartData"
                :chart-id="chartId"
                :dataset-id-key="datasetIdKey"
                :width="400"
                :height="150"
                
            /> -->
</template>


<script lang="ts" setup>
// import { Line } from 'vue-chartjs'
// import { Chart as ChartJS, Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale, PointElement } from 'chart.js'
import dayjs from 'dayjs';
import { FechaValor } from "../../../interfaces";
import { Bar } from 'vue-chartjs';


import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale  
} from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);


// ChartJS.register(Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale, PointElement);

const props = defineProps<{
    registros: FechaValor[],
    color: string
}>();

const fechas = Array.from(props.registros, x=> dayjs(`${x.Fecha}`).format('DD-MM-YYYY'));
const cantidades = Array.from(props.registros, x => x.Valor);


const chartOptions = { responsive: true, maintainAspectRatio: true }
const chartData = {
    labels: fechas,
    datasets: [
        {
            label: 'casos',            
            backgroundColor: props.color,
            data: cantidades,
            fill: true,         
            borderColor: props.color,
            borderWidth: 0.1

        }
    ]
}

const chartId = 'bar-chart';
const datasetIdKey = 'label';


</script>