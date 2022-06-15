import { defineStore } from 'pinia';
import { getTotalRegiones, getTotalesFallecidosRegion } from '../api/querys';
import { TotalRegion } from '../interfaces';


export type RootState = {
    totalRegiones: TotalRegion,
    totalFallecidosRegiones: TotalRegion
}

export const useTotalRegionesStore = defineStore({
    id: 'totalRegiones',

    state:()=>({
        totalRegiones: {UpdatedAt: '', Lista: [] },
        totalFallecidosRegiones: {UpdatedAt: '', Lista: [] },
    } as RootState),

    actions:{
        async getTotalRegiones(){
           this.totalRegiones = await getTotalRegiones();
        },
        async getTotalesFallecidosRegion(){
            this.totalFallecidosRegiones = await getTotalesFallecidosRegion();
        }
    }


})