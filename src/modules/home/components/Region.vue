<template>
    <template v-if="isLoaded">


        <h5>Datos Informe Epidemiológico: <span class="badge bg-dark">{{ updateAt }}</span></h5>

        <div class="row">
            <div class="col-sm-8">
                <div class="card">
                    <h5 class="card-header bg-light">Región: {{ datosRegionSeleccionada?.Nombre}}</h5>
                    <div class="card-body">                
                        <p class="card-text">Población: {{ FormatNumber(datosActivosRegionSeleccionada?.Poblacion!)}} hab.</p>  
                        <span class="card-text">Comunas: 
                            <select name="comunas" v-model="busquedaComunas" class="form-select w-50 ">
                                <option value="" selected>Seleccione...</option>
                                <template v-for="com in comunasQuery">
                                    <template v-if="com.CodComuna.length>0">
                                        <option :value="com.CodComuna">{{ com.Comuna }}</option>
                                    </template>
                                </template>
                            </select>
                        </span>              
                        
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
                            {{ FormatNumber(totalFallecidosRegionSeleccionada?.Total!)}} 
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
                            {{ FormatNumber(totalRegionSeleccionada?.Total!)}} 
                        </p>
                    </div>
                </div>
            </div>

            

        </div>

        <h5>Casos Activos (Informe Epidemiológico)</h5>
        <GraficoRegion :registros="datosActivosRegionSeleccionada!.Data" color="#e6d40b" />
    </template>
    <template v-else>
        <div class="spinner-border text-dark" role="status">
            <span class="visually-hidden">Espere...</span>
        </div>
    </template>
</template>

<script lang="ts" setup>


import { onBeforeMount, ref, watch } from 'vue';
import { Comunas, ListaRegion, ListaTotalRegion, Region } from '../../../interfaces';
import { FormatNumber, FormatFecha, diferenciaActivos, FormatDecimal } from '../../../helpers/index';
import GraficoRegion from './GraficoRegion.vue';
import { useRegionStore } from '../../../store/regionesStore';
import { useActivosRegionesStore } from '../../../store/activosRegionesStore';
import { useTotalRegionesStore } from '../../../store/totalRegionesStore';
import { useComunasStore } from '../../../store/comunasStore';
import { useComRegStore } from '../../../store/comRegStore';
import { useRouter } from 'vue-router';

const props = defineProps<{    
    id: string    
}>();


const idComReg=useComRegStore();
const router = useRouter();
const isLoaded = ref(false);
const busquedaComunas = ref('');
const listaRegionesStore = useRegionStore();
const activosRegionesStore = useActivosRegionesStore();
const totalRegionesStore = useTotalRegionesStore();
const listaComunasStore = useComunasStore();

const datosRegionSeleccionada = ref<Region>();
const totalRegionSeleccionada = ref<ListaTotalRegion>();
const totalFallecidosRegionSeleccionada = ref<ListaTotalRegion>();
const datosActivosRegionSeleccionada = ref<ListaRegion>();
const casosActivos = ref<number>(0);
const casosActivosAnt = ref<number>(0);

const comunasQuery = ref<Comunas[]>([]);
const busquedaComunasQuery = ref<Comunas[]>([]);

const updateAt = ref('');

const tasa = ref(0);

onBeforeMount(async () => {
    isLoaded.value = false;   
    
    comunasQuery.value = await listaComunasStore.getComunasByRegion(props.id);
    datosRegionSeleccionada.value = listaRegionesStore.regiones.find(region=>region.CodRegion === props.id);

    updateAt.value = FormatFecha(activosRegionesStore.activosRegiones.UpdatedAt);
    
    datosActivosRegionSeleccionada.value = activosRegionesStore.activosRegiones.Lista.find(region=>region.CodRegion === props.id);

    casosActivos.value = datosActivosRegionSeleccionada.value?.Data[datosActivosRegionSeleccionada.value?.Data.length-1].Valor!;
    casosActivosAnt.value = casosActivos.value - datosActivosRegionSeleccionada.value?.Data[datosActivosRegionSeleccionada.value?.Data.length-2].Valor!;
    tasa.value = (100000*casosActivos.value)/datosActivosRegionSeleccionada.value?.Poblacion!;
    totalRegionSeleccionada.value = totalRegionesStore.totalRegiones.Lista.find(region=>region.Region === props.id);
    totalFallecidosRegionSeleccionada.value = totalRegionesStore.totalFallecidosRegiones.Lista.find(region=>region.Region === props.id);
    isLoaded.value = true;

})

const buscarComunas = (comuna:string) =>{
    if(comuna.length>2){
        busquedaComunasQuery.value = comunasQuery.value.filter(com=>com.Comuna.toLowerCase().includes(comuna.toLowerCase()));
    } else {
        busquedaComunasQuery.value = [];
    }
}

const handleComuna = async (id:string)=>{
     
    idComReg.setComunaId(id);
    await router.push({ name: 'comuna' });
    
}


watch(()=>busquedaComunas.value,
        async(val)=>{  
            if(val.length>0){
                await handleComuna(val);
            }
        })


</script>