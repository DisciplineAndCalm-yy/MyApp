import * as types from './mutation-types'
import _ from "underscore"
const mutations = {
    [types.SET_USERNAME](state, data) {
        state.user = data
        state.user.headimg = data.headimg || "/public/guanwang/head/D5DF43BF-E822-45e3-AD59-06FA3B6AB06E.png"
        state.username = data.username
        state.useremail = data.useremail
        state.usertype = data.usertype
        state.headimg = "/public/guanwang/head/D5DF43BF-E822-45e3-AD59-06FA3B6AB06E.png"
    },
    [types.SET_usertype](state, data) {
        state.usertype = data.data
    },
    [types.SET_KTALL](state, data) {
        data = _.sortBy(data, 'paixu')
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
    [types.SET_MEDALS] (state, data) {
        state.medals = data
    }

}
export default mutations