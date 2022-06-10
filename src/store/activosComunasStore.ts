import { defineStore } from 'pinia';
import { getActivosComunas } from '../api/querys';
import { ActivosComuna } from '../interfaces';


export type RootState = {
    activosComunas: ActivosComuna
}

export const useActivosComunasStore = defineStore({
    id: 'activosComunas',

    state:()=>({
        activosComunas: {UpdatedAt: '', Lista: []}
    } as RootState),

    actions:{
        async getActivosComunas(){
           this.activosComunas = await getActivosComunas();
        }
    }


})