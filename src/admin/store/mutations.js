import * as types from './mutation-types'

const mutations = {
    [types.SET_USERNAME](state, data) {
        state.user = data
    },
    [types.SET_usertype](state, data) {
        state.usertype = data.data
    },
    [types.SET_KTALL](state, data) {
        state.ktTuijian = data
        state.ktAll = data
    },
    [types.SET_KTUSER](state, data) {
        state.ktUser = data
    },
    [types.SET_KTTUIJIAN](state, data) {
        state.ktTuijian = data
    },
    [types.SET_FREE](state, data) {
        state.free = data
    },
    [types.ADD_BARRAGE](state, data) {
        state.barrage.push(data)
    },
    [types.DEL_BARRAGE](state) {
        state.barrage.shift()
    },
    [types.SET_VIDEO] (state, data) {
        state.video = data
    },
    [types.SET_LESSION] (state, data) {
        state.lession = data
    },
    [types.SET_OSSIMGLIST] (state, data) {
        state.ossImglist = data
    },
    [types.SET_AUTH] (state, data) {
        state.auth = data
    },
    [types.SET_USERAUTH] (state, data) {
        state.userauth = data
    },
    [types.SET_ROLE] (state, data) {
        state.role = data
    },

}
export default mutations