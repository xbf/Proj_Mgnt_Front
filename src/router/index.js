// import {, createWebHashHistory} from "vue-router";
import {createRouter, createWebHistory} from "vue-router";
import Home from "../views/Home.vue";
import { useStore } from "vuex";
import {getItem} from "../utils/catch";

const routes = [
    // {
    //     path: '/',
    //     redirect: '/dashboard'
    // },
    {
        path: "/login",
        name: "Login",
        meta: {
            title: '登录'
        },
        component: () => import ( /* webpackChunkName: "login" */ "../views/Login.vue")
    }
    , {
        path: "/",
        name: "home",
        component: Home,
        children: []
    }
];

const router = createRouter({
    // history: createWebHashHistory(),
    history: createWebHistory(),
    routes
});

router.beforeEach((to, from, next) => {
    document.title = `${to.meta.title} | vue-manage-system`;
    const store = useStore();
    let staffInfo = store.state.staffInfo;
    if (!staffInfo) {
        let authInfo = JSON.parse(getItem('authInfo'))
        if (!authInfo) {
            next('/login');
        } else {
            staffInfo = authInfo.staffInfo;
        }
    } else {
        next();
    }

    // const role = localStorage.getItem('ms_username');
    const role = localStorage.getItem('authInfo');
    if (!role && to.path !== '/login') {
        next('/login');
    } else if (to.meta.permission) {
        // 如果是管理员权限则可进入，这里只是简单的模拟管理员权限而已
        role === 'admin'
            ? next()
            : next('/403');
    } else {
        //这里需要解决刷新路由的问题
        // let authInfo = getItem('authInfo');
        // commit('SET_AUTHINFO', authInfo);
        // mergeRoutes(authInfo.routes);
        next();
    }
});

/**
 * @author 许白峰
 * @param routes
 * @returns {*}
 * 动态插入子路由
 */
export function mergeRoutes (routes) {
    if (routes) {
        const modules = import.meta.glob('../../views/*.vue')
        for (let i = 0; i < routes.length; i++) {
            let temp = {
                path: '/' + routes[i].path,
                name: routes[i].name,
                component: modules[routes[i].component],
                meta: {
                    title: routes[i].meta.title
                }
            }
            router.addRoute('home', temp) //添加子路由时需要将父路由节点的名称作为第一个参数
        }
    }
    return routes
};

export default router;
