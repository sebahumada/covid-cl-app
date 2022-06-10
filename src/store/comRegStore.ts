import { defineStore } from 'pinia';


export const useComRegStore = defineStore({
    id: 'comReg',

    state:()=>({
        selectedId:''
    }),

    actions:{
        setSelectedId(id:string){
            this.selectedId = id;
        }
    }
})