import { defineStore } from 'pinia';
import { getResumenHome } from '../api/querys';
import { CovidResumen } from '../interfaces';


export type RootState = {
    resumen: CovidResumen
}


export const useResumenStore = defineStore({
    id:'resumen',

    state:()=>({
        resumen: {UpdatedAt: '', Data: []}
    } as RootState),

    actions:{
        async getResumenHome(){
            this.resumen = await getResumenHome();
        }
    }
})