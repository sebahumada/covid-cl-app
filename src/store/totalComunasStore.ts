import { defineStore } from 'pinia';
import { getTotalComunas } from '../api/querys';
import { TotalComuna } from '../interfaces';


export type RootState = {
    totalComunas: TotalComuna
}

export const useTotalComunasStore = defineStore({
    id: 'totalComunas',

    state:()=>({
        totalComunas: {UpdatedAt: '', Lista: [] }
    } as RootState),

    actions:{
        async getTotalComunas(){
           this.totalComunas = await getTotalComunas();
        }
    }


})