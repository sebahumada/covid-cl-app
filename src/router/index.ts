import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import homeRouter from '../modules/home/router'


const routes: RouteRecordRaw[] = [
    
    {
        path:'/',        
        ...homeRouter
    }
]

const router = createRouter({ 
    history: createWebHistory(),
    routes
});


export default router;