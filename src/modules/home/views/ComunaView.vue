

<script lang="ts" setup>
import { onBeforeMount, ref, watch } from 'vue';
import { useComRegStore } from '../../../store/comRegStore';
import Comuna from '../components/Comuna.vue';

const id = useComRegStore();
const isLoaded = ref(false);
const idSelected = ref('');


onBeforeMount(async()=>{
    isLoaded.value = false;
    
    idSelected.value = id.selectedId;

    isLoaded.value = true;
});

watch(async()=> id.selectedId,
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
    <template>
        Espere...
    </template>
</template>