/**
 * Created by jiachenpan on 16/11/18.
 */

import store from '@/store'
const portal = require('@/utils/portal-helper')
const currentPortal = portal.currentPortal

export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}

export function guidGenerator() {
  var S4 = function () {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1)
  }
  return (
    S4() +
    S4() +
    '-' +
    S4() +
    '-' +
    S4() +
    '-' +
    S4() +
    '-' +
    S4() +
    S4() +
    S4()
  )
}
export function removeSlashes(path) {
  return path.replace(/^\/+/g, '').replace(/\/+$/g, '')
}

/**
 * Check the Authority.
 * @param {String|Array} permissions
 */
export function canAccess(permissions) {
  /**
   * Force Allow all Access
   */
  if (currentPortal.get('VUE_APP_CHECK_PERMISSION') === 'false') return true

  if (!permissions) {
    return
  }

  if (typeof permissions === 'string') {
    permissions = [permissions]
  }

  let has_access = false
  permissions.forEach(function (permission) {
    if (store.getters.permissions.indexOf(permission) !== -1) {
      has_access = true
    }
  })

  return has_access
}

export function getTimeOffset() {
  let user_timezone = new Date().getTimezoneOffset()
  let sign = user_timezone <= 0 ? '+' : '-'
  user_timezone = Math.abs(user_timezone)
  let modulus = user_timezone % 60
  let absolute_number = parseInt(user_timezone / 60)
  return (
    sign + absolute_number.pad(2) + (modulus ? ':' + modulus.pad(2) : ':00')
  )
}
export function tableAliveOnly(from, next, table_name, route_names, callback) {
  if (from && from.name && !route_names.includes(from.name)) {
    next((vm) => {
      const page_size_key = vm.$helper.getProp(
        vm.$store.state.table,
        `${table_name}.settings.page_size_key`
      )
      if (page_size_key) {
        const page_size = vm.$helper.getProp(
          vm.$store.state.form,
          `${table_name}.values.${page_size_key}`
        )
        vm.$store.commit('form/saveValues', {
          formName: table_name,
          values: { [page_size_key]: page_size },
        })
      }
      callback(vm)
    })
  } else {
    next(callback)
  }
}
