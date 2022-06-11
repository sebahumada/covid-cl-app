
<template>
    

    <template v-if="!isLoaded">
        Espere...
    </template>
    <template v-else>


        <!-- Modal -->
            <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                <div class="modal-header">
                    <!-- <h5 class="modal-title" id="exampleModalLabel">Búsqueda:</h5> -->
                    <input type="text" class="form-control me-2" v-model="busquedaComunaRegion" @keyup="buscarComunaRegion" @touchend="buscarComunaRegion" placeholder="Buscar Comuna o Región" />
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <!-- <p>Buscar Región o Comuna</p>  -->
                    <!-- <input type="text" class="form-control" v-model="busquedaComunaRegion" @keyup="buscarComunaRegion" placeholder="Buscar Comuna o Región" /> -->
                    
                    <template v-if="comunasQuery.length>0">
                        <p><strong>Comuna:</strong></p>
                        <hr />
                        <template v-for="com in comunasQuery">
                            <p @click="handleComuna(com.CodComuna)" class="link-click">{{ com.Comuna}}</p>
                        </template>
                    </template>

                    <template v-if="regionesQuery.length>0">
                        <p><strong>Región:</strong></p>
                        <hr />
                        <template v-for="reg in regionesQuery">
                            <p @click="handleRegion(reg.CodRegion)" class="link-click">{{ reg.Nombre}}</p>
                        </template>
                    </template>
                    
                </div>
                
                </div>
            </div>
            </div>


        <div class="fijo">



            <nav class="navbar navbar-expand-sm bg-dark navbar-dark">
                <div class="container-fluid">
                    <a class="navbar-brand" href="#">Covid en Chile</a>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#collapsibleNavbar">
                    <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="collapsibleNavbar">
                    <ul class="navbar-nav">
                        <li class="nav-item">
                        <a class="nav-link" href="#" @click="()=>{ router.push({name:'home'})}">Resumen</a>
                        </li>
                       
                    </ul>
                        <button type="button" class="ms-2 btn btn-outline-info" data-bs-toggle="modal" data-bs-target="#exampleModal" @click="reset">Buscar Comuna o Región...</button>
                    </div>
                </div>
            </nav>






            
            
            
            <div class="alert alert-white h6" role="alert">
                Datos al: 
                <span class="badge bg-primary text-white">{{ dayjs(`${resumen.UpdatedAt}`).format('DD-MM-YYYY') }} (Diario)</span>
                <span class="ms-2 badge bg-primary text-white">{{ dayjs(`${activosNacional?.UpdatedAt}`).format('DD-MM-YYYY') }} (Informe Epidem.)</span>
            </div>

            
            <hr class="text-white"/>
            
            
        </div>

        <router-view></router-view>
        
        <br/>
        <p>Datos obtenidos gracias a <a href="https://minciencia.gob.cl/covid19/" target="_blank">Base de Datos COVID-19 - Ministerio de Ciencia, Tecnología, Conocimiento e Innovación</a></p>

    </template>

    
</template>

<script lang="ts" setup>

import dayjs from 'dayjs';
import { onBeforeMount, ref } from 'vue';
import { Comunas, CovidNacional, CovidResumen, Region } from '../../../interfaces';
import { useComunasStore } from '../../../store/comunasStore';
import { useRegionStore } from '../../../store/regionesStore';
import { useResumenStore } from '../../../store/resumenStore';
import { useActivosNacionalStore } from '../../../store/activosNacionalStore';
import { reloadStore } from '../../../store/storesHelper';
import { useComRegStore } from '../../../store/comRegStore';
import { useRouter } from 'vue-router';

const router = useRouter();

const isLoaded = ref<boolean>(false);
const comunasQuery = ref<Comunas[]>([]);
const regionesQuery = ref<Region[]>([]);
const busquedaComunaRegion = ref<string>('');
const resumen = ref<CovidResumen>({UpdatedAt: '', Data: []});
const activosNacional=ref<CovidNacional>({UpdatedAt:'', Lista:[]});

const resumenHome = useResumenStore();
const activosNacionalStore = useActivosNacionalStore();
const regiones = useRegionStore();
const comunas = useComunasStore();
const idComReg=useComRegStore();




onBeforeMount(async ()=>{
    isLoaded.value = false;
    
    await reloadStore();
    resumen.value = resumenHome.resumen;
    activosNacional.value = activosNacionalStore.activosNacional;

    isLoaded.value = true;

});

const reset = ()=>{
    busquedaComunaRegion.value='';
    comunasQuery.value = [];
    regionesQuery.value = [];

}

const buscarComunaRegion = ()=>{

    if(busquedaComunaRegion.value.length>=3){
        comunasQuery.value = comunas.comunas.filter(c=>c.Comuna.toLowerCase().includes(busquedaComunaRegion.value.toLowerCase()) && c.CodComuna.length>0)
        regionesQuery.value = regiones.regiones.filter(r=>r.Nombre.toLowerCase().includes(busquedaComunaRegion.value.toLowerCase()))
    } else {
        comunasQuery.value = [];
        regionesQuery.value = [];
    }
}

const handleComuna = async(id:string)=>{
    console.log('Id Comuna =>',id);
    close();
    idComReg.setSelectedId(id);
    await router.push({ name: 'comuna' });
    
}

const handleRegion =async(id:string)=>{
    console.log('Id Region =>',id);
    close();
    idComReg.setSelectedId(id);
    await router.push({ name: 'region' });
}


const close = ()=>{
let closeCanvas = document.querySelector('[data-bs-dismiss="modal"]') as HTMLButtonElement;
    closeCanvas.click();   
    
}



</script>

<style scoped>
.link-click {
    cursor: pointer;
}


.link-click:hover{
    color: blueviolet;
}

.fijo{
    position: sticky;
    top: 0;
    z-index: 1;
    background-color: #fff;
    border-color: #fff;
}
</style>