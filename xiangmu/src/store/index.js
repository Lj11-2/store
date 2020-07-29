import vue from 'vue'
import vuex from 'vuex'
vue.use(vuex)

import {state,mutations,getters} from './mutations'
import actions from './actions'
import menu from './modules/menu'
import role from './modules/role'
import kind from './modules/kind'
import spec from './modules/spec'
import member from './modules/member'
import manager from './modules/manager'
import banner from './modules/banner'
import shopmanage from './modules/shopmanage'
import seckill from './modules/seckill'



export default new vuex.Store({
     state,
     mutations,
     getters,
     actions,
     modules:{
        menu,
        role,
        manager,
        kind,
        spec,
        member,
        banner,
        shopmanage,
        seckill
    }
})