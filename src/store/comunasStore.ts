import { defineStore } from 'pinia';
import { getComunas } from '../api/querys';
import { Comunas } from '../interfaces';

export type RootState = {
    comunas: Comunas[]
}


export const useComunasStore = defineStore({
    id: 'comunas',

    state:()=>({
        comunas: []
    } as RootState),

    actions:{
        async getComunas(){
            this.comunas = await getComunas();
        }
    }

})