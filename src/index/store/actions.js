import * as types from './mutation-types'
import * as api from '../../plugins/api'

export const session = async function ({ commit }) {
  try {
    let data = await api.session()
    commit(types.SET_USERNAME, data)
    return data
  } catch (err) {
    throw(err)
  }
}

export const login = async function ({ commit }, datas) {
  try {
    let data = await api.asynclogin(datas)
    commit(types.SET_USERNAME, data)
    return data
  } catch (err) {
    throw(err)
  }
}

export const getkcAll = async function ({ commit }) {
  try {
    let data = await api.getallcourse()
    commit(types.SET_KTALL, data)
    return data
  } catch (err) {
    return err
  }
}

