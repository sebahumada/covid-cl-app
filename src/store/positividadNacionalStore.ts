import { defineStore } from 'pinia';
import { getPositividadNacional } from '../api/querys';
import { Positividad } from '../interfaces';

export type RootState = {
    positividad: Positividad
}

export const usePositividadNacionalStore = defineStore({
    id: 'positividad',

    state:()=>({
        positividad: {UpdatedAt: '', Lista: []}
    } as RootState),

    actions:{
        async getPositividadNacional(){
           this.positividad = await getPositividadNacional();
        }
    }


})