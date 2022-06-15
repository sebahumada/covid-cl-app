import { defineStore } from 'pinia';
import { getTotalRegiones } from '../api/querys';
import { TotalRegion } from '../interfaces';


export type RootState = {
    totalRegiones: TotalRegion
}

export const useTotalRegionesStore = defineStore({
    id: 'totalRegiones',

    state:()=>({
        totalRegiones: {UpdatedAt: '', Lista: [] }
    } as RootState),

    actions:{
        async getTotalRegiones(){
           this.totalRegiones = await getTotalRegiones();
        }
    }


})