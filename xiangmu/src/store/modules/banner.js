import { bannerList } from '../../util/request'

const state = {
    list: []
}
const mutations = {
    changeList(state, arr) {
        state.list = arr
    }
}
const actions = {
    requsetList(context) {
        bannerList().then((res) => {
            context.commit('changeList', res.data.list)
        })
    }
}
const getters = {
    list(state) {
        return state.list
    }
}


export default {
    state,
    actions,
    mutations,
    getters,
    namespaced: true
}