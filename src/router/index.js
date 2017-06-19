import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home'
import Rank from '@/views/Rank'
import Canvas from '@/views/Canvas'
import Detail from '@/views/Detail'
import Zone from '@/views/Zone'
import Prize from '@/views/Prize'
import Success from '@/views/success'
Vue.use(Router)

export default new Router({
    // mode: 'history',
    routes: [
        {
            path: '/',
            name: 'Home',
            component: Home
        },
        {
            path: '/Canvas',
            name: 'Canvas',
            component: Canvas
        },
        {
            path: '/Rank',
            name: 'Rank',
            component: Rank
        },
        {
            path: '/Detail',
            name: 'Detail',
            component: Detail
        },
        {
            path: '/Zone',
            name: 'Zone',
            component: Zone
        },
        {
            path: '/Prize',
            name: 'Prize',
            component: Prize
        },
        {
            path: '/Success',
            name: 'Success',
            component: Success
        }
    ]
})
