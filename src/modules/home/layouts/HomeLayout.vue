
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
                    
                    <input type="text" class="form-control me-2" v-model="busquedaComunaRegion" placeholder="Buscar Comuna o Región" />
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    
                    
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
                        <a class="nav-link" href="#"  @click="()=>{ router.push({name:'home'})}">Resumen</a>
                        </li>
                        <li class="nav-item">
                        <a class="nav-link" data-bs-toggle="modal" data-bs-target="#exampleModal" @click="reset">Buscar Comuna o Región</a>
                        </li>
                       
                    </ul>
                        <!-- <button type="button" class="btn btn-outline-info" data-bs-toggle="modal" data-bs-target="#exampleModal" @click="reset">Buscar Comuna o Región...</button> -->
                    </div>
                </div>
            </nav>
            

            
            <hr class="text-white"/>
            
            
        </div>

        <router-view></router-view>
        
        <br/>
        <p>Datos obtenidos gracias a <a href="https://minciencia.gob.cl/covid19/" target="_blank">Base de Datos COVID-19 - Ministerio de Ciencia, Tecnología, Conocimiento e Innovación</a></p>

    </template>

    
</template>

<script lang="ts" setup>


import { onBeforeMount, ref, watch } from 'vue';
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

const buscarComunaRegion = (valor:string)=>{

    if(valor.length>=3){
        comunasQuery.value = comunas.comunas.filter(c=>c.Comuna.toLowerCase().includes(valor.toLowerCase()) && c.CodComuna.length>0)
        regionesQuery.value = regiones.regiones.filter(r=>r.Nombre.toLowerCase().includes(valor.toLowerCase()))
    } else {
        comunasQuery.value = [];
        regionesQuery.value = [];
    }
}

const handleComuna = async(id:string)=>{
    close();        
    idComReg.setComunaId(id);
    await router.push({ name: 'comuna' });
    
}

const handleRegion =async(id:string)=>{
    close();    
    idComReg.setRegionId(id);
    await router.push({ name: 'region' });
}


const close = ()=>{
    let closeCanvas = document.querySelector('[data-bs-dismiss="modal"]') as HTMLButtonElement;
    closeCanvas.click();   
    
}

watch(()=>busquedaComunaRegion.value,
        (val)=>{           
            //console.log({val, prev});
            
            buscarComunaRegion(val);
        })



</script>

<style scoped>
.link-click, .nav-link {
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