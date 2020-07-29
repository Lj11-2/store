import { managerList,managerNum } from '../../util/request'

const state = {
    list: [],
    size:2,
    num:0,
    page:1
}
const mutations = {
    changeList(state, arr) {
        state.list = arr
    },
    changeNum(state,num){
        state.num = num
    },
    requestPage(state,page){
        state.page = page
    }
}
const actions = {
    requestList(context) {
        const params = {
            page:context.state.page,
            size:context.state.size
        }
        managerList(params).then((res) => {
            context.commit('changeList', res.data.list)
        })
    },
    managerCount(context){
        managerNum().then((res)=>{
            context.commit('changeNum',res.data.list[0].total)
        })
    },
    changePage(context,page){
        context.commit('requestPage',page)
    }
}
const getters = {
    list(state) {
        return state.list
    },
    num(state){
        return state.num
    },
    size(state){
        return state.size
    }
}
export default {
    state,
    mutations,
    actions,
    getters,
    namespaced: true
}