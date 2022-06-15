import { defineStore } from 'pinia';
import { getTotalComunas, getTotalesFallecidosComuna } from '../api/querys';
import { TotalComuna } from '../interfaces';


export type RootState = {
    totalComunas: TotalComuna,
    totalFallecidosComuna: TotalComuna
}

export const useTotalComunasStore = defineStore({
    id: 'totalComunas',

    state:()=>({
        totalComunas: {UpdatedAt: '', Lista: [] } ,   
        totalFallecidosComuna: {UpdatedAt: '', Lista: [] }
    } as RootState),

    actions:{
        async getTotalComunas(){
           this.totalComunas = await getTotalComunas();
        },
        async getTotalFallecidosComuna(){
            this.totalFallecidosComuna = await getTotalesFallecidosComuna();
        }
    }


})