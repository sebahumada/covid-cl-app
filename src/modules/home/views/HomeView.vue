<template>
    <Resumen></Resumen>
</template>

<script lang="ts" setup>
import { reloadStore } from '../../../store/storesHelper';
import Resumen from '../components/Resumen.vue';
import { onBeforeMount } from 'vue';

onBeforeMount(async()=>{
    await reloadStore();
})

</script>