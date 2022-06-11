

<script lang="ts" setup>
import { onBeforeMount, ref, watch } from 'vue';
import { useComRegStore } from '../../../store/comRegStore';
import Region from '../components/Region.vue';

const id = useComRegStore();
const isLoaded = ref(false);
const idSelected = ref('');


onBeforeMount(async()=>{
    isLoaded.value = false;
    
    idSelected.value = id.regionId;
    console.log(idSelected.value);
    
    isLoaded.value = true;
});

watch(async()=> id.regionId,
    async(val)=>{
        isLoaded.value = false;      
        
        idSelected.value =await val;

        isLoaded.value = true;
    }
);



</script>
<template>
    <template v-if="isLoaded">
        <Region :id="idSelected"/>
    </template>
    <template>
        Espere...
    </template>
</template>