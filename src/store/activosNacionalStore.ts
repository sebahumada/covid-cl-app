import { defineStore } from 'pinia';
import { getActivosNacional } from '../api/querys';
import { CovidNacional } from '../interfaces/index';

export type RootState = {
    activosNacional: CovidNacional
}


export const useActivosNacionalStore = defineStore({
    id: 'activosNacional',

    state:()=>({
        activosNacional: {UpdatedAt: '', Lista: []}
    } as RootState),

    actions:{
        async getActivosNacional(){
           this.activosNacional = await getActivosNacional();
        }
    }


})