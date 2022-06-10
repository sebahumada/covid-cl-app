import { defineStore } from 'pinia';
import { getRegiones } from '../api/querys';
import { Region } from '../interfaces';


export type RootState = {
    regiones: Region[]
}

export const useRegionStore = defineStore({
    id: 'regiones',

    state:()=>({
        regiones: []
    } as RootState),

    actions: {
        async getRegiones(){
            this.regiones = await getRegiones();
        }
    }
})
