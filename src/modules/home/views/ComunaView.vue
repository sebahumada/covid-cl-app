

<script lang="ts" setup>
import { onBeforeMount, ref, watch } from 'vue';
import { useComRegStore } from '../../../store/comRegStore';
import Comuna from '../components/Comuna.vue';
import { reloadComunaRegionStore } from '../../../store/storesHelper';

const id = useComRegStore();
const isLoaded = ref(false);
const idSelected = ref('');


onBeforeMount(async()=>{
    isLoaded.value = false;
    
    await reloadComunaRegionStore();
    idSelected.value = id.comunaId;
    
    isLoaded.value = true;
});

watch(async()=> id.comunaId,
    async(val)=>{
        isLoaded.value = false;
        
        idSelected.value =await val;

        isLoaded.value = true;
    }
);



</script>
<template>
    <template v-if="isLoaded">
        <Comuna :id="idSelected"/>
    </template>
    <template v-else>
        <div class="spinner-border text-dark" role="status">
            <span class="visually-hidden">Espere...</span>
        </div>
    </template>
</template>