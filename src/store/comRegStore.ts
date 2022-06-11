import { defineStore } from 'pinia';


export const useComRegStore = defineStore({
    id: 'ComReg',

    state:()=>({
        comunaId:'',
        regionId:''
        
    }),

    actions:{
        setComunaId(id:string){
            this.comunaId = id;
        },
        setRegionId(id:string){
            this.regionId = id;
        }
    }
})