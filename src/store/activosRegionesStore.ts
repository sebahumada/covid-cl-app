import { defineStore } from 'pinia';
import { getActivosRegiones } from '../api/querys';
import { ActivosRegion } from '../interfaces';


export type RootState = {
    activosRegiones: ActivosRegion
}

export const useActivosRegionesStore = defineStore({
    id: 'activosRegiones',

    state:()=>({
        activosRegiones: {UpdatedAt: '', Lista: []}
    } as RootState),

    actions:{
        async getActivosRegiones(){
           this.activosRegiones= await getActivosRegiones();
        }
    }


})