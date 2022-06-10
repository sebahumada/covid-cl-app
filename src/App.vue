<script setup lang="ts">
import { onBeforeMount } from 'vue';
import { reloadStore } from './store/storesHelper';

onBeforeMount(async()=>{
  await reloadStore();
})




</script>

<template>
  <router-view></router-view>
</template>

<style>
#app {

  font-family: 'Akshar', sans-serif;
}
</style>
