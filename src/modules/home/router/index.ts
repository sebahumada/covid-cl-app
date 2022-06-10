

export default {

    name:'home',
    component: ()=> import('../layouts/HomeLayout.vue'),
    children: [
        {
            path:'/',
            name:'resumen',
            component: ()=> import('../views/HomeView.vue')           

        },
        {
            path:'/region',
            name:'region',
            component: ()=> import('../views/RegionView.vue')           

        },
        {
            path:'/comuna',
            name:'comuna',
            component: ()=> import('../views/ComunaView.vue')           

        },
    ]


}