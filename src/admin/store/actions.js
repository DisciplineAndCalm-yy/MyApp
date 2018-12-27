import * as api from "../../plugins/api.js"
import * as types from './mutation-types'

export const session = async function ({
  commit
}) {
  try {
    let data = await api.session()
    if (data.usertype != "Admin") {
      data = false
      return data
    } else {
      commit(types.SET_USERNAME, data)
      return true
    }
  } catch (err) {
    return false
  }
}

export const login = async function ({
  commit
}, datas) {
  try {
    let data = await api.asynclogin(datas)
    commit(types.SET_USERNAME, data)
    return data
  } catch (err) {
    throw (err)
  }
}

export const selectCourse = async function ({
  commit
}) {
  try {
    let data = await api.getallcourse()
    commit(types.SET_KTALL, data)
  } catch (err) {
    throw (err)
  }
}

export const asyncauth = async function ({
  commit
}) {
  try {
    let data = await api.asyncselectAuth()
    commit(types.SET_AUTH, data)
  } catch (err) {
    throw (err)
  }
}

export const asyncuserauth = async function ({
  commit
}, datas) {
  try {
    let data = await api.asyncgetUserRole(datas)
    commit(types.SET_USERAUTH, data)
  } catch (err) {
    throw (err)
  }
}

export const asyncrole = async function ({
  commit
}) {
  try {
    let data = await api.asyncselectRole()
    commit(types.SET_ROLE, data)
  } catch (err) {
    throw (err)
  }
}