import {postRequest} from '../../utils/reqUtils';
import {mergeRoutes} from "../../router";
import {setItem,removeItem} from "../../utils/catch";

// const {postRequest} = require("../../utils/reqUtils");

const auth = {
    state: {
        staffInfo: {}, //操作员信息
        routes: [], // 路由（菜单）信息
        menus: [] // 可用菜单信息
    },

    mutations: {
        SET_AUTHINFO: (state, authInfo) => {
            state.staffInfo = authInfo.staffInfo
            state.routes = authInfo.routes
            state.menus = authInfo.menus
            setItem('authInfo', JSON.stringify(authInfo))
        },
        RESET_AUTHINFO: (state) => {
            state.staffInfo = []
            state.routes = []
            state.menus = []
            removeItem('authInfo')
        }
    },

    actions: {
        // 登录操作
        async Login ({commit, state}, loginForm) {
            let res = await postRequest('/g4/auth/f100101',{
                // 'grant_type': 'password',
                // 'scope': 'all',
                'staffAcc': loginForm.staffAcc,
                'password': loginForm.password
            })

            if (parseInt(res.data.errorNo) === 0) {
                let authInfo = res.data.resultLst[0];
                // console.log('accessToken is: ' + userInfo.accessToken)
                // let accessToken = userInfo.accessToken
                // let refreshToken = userInfo.refreshToken.value
                // console.log(userInfo)
                // localStorage.setItem('authInfo', JSON.stringify(authInfo));
                // setItem('authInfo',JSON.stringify(authInfo));
                commit('SET_AUTHINFO', authInfo);
                mergeRoutes(authInfo.routes);
                // setToken(accessToken) // 保存登录令牌，打上登录标识
                // setRefreshToken(refreshToken) // 保存刷新令牌
                // setItem('userInfo', JSON.stringify(userInfo)) // 将用户信息存入localStorage
                // let routes = mergeRoutes(userInfo.routes)
                // await store.dispatch('GenerateRoutes', routes)

                // router.addRoutes(store.getters.addRouters)
                // router.options.routes.push(store.getters.addRouters)
                return res.data;
            } else {
                // removeToken()
                // removeRefreshToken()
                return res.data;
            }
        },

        //退出登录
        async LogOut ({commit}) {
            commit('RESET_AUTHINFO');
            removeToken();
            // removeItem('authInfo');
        }
    }
}

export default auth
