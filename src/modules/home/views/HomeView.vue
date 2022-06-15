<template>
    <template v-if="isLoaded">
        <Resumen></Resumen>
    </template>
    <template v-else>
        <div class="spinner-border text-dark" role="status">
            <span class="visually-hidden">Espere...</span>
        </div>
    </template>
</template>

<script lang="ts" setup>
import { reloadStore } from '../../../store/storesHelper';
import Resumen from '../components/Resumen.vue';
import { onBeforeMount, ref } from 'vue';

const isLoaded = ref(false);

onBeforeMount(async()=>{
    isLoaded.value = false;
    await reloadStore();
    isLoaded.value = true;
})

</script>