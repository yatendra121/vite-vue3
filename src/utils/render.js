import {
  getToken,
  myProfile,
  removeToken,
  getRefreshToken,
  setTokens,
  generateToken,
  removeRefreshToken,
} from '@/utils/auth'
import helper from 'vuejs-object-helper'
const portal = require('./portal-helper')
const currentPortal = portal.currentPortal

import store from '../store'

export default (layoutName, router, main) => {
  router.beforeEach((to, from, next) => {
    if (from && from.query.developer && !to.query.developer) {
      to.query.developer = 'yes'
      next(to)
      return
    }
    const user_id = helper.getProp(store.getters, 'authProfile.id')
    if (!helper.getProp(to, 'meta.isPublic', false) && !user_id) {
      if (to.path === '/' || to.path === '/auth') {
        next()
      } else {
        next('/')
      }
    } else {
      next()
    }
  })

  // Add the login index in url, if portal allows the multi login feature
  const login_index = window.location.toString().match(/\/u\/[0-9]+\/?/g)
  if (!login_index && currentPortal.isMultiLogin()) {
    window.location.href = currentPortal.getLandingUrl(0)
  } else if (getToken()) {
    myProfile()
      .then((response) => {
        document.querySelector('.pace').remove()
        store.dispatch('profile/set', { data: response.data.user })
        main({ layout: layoutName }, router)
      })
      .catch(() => {
        const refreshToken = getRefreshToken()
        if (refreshToken) {
          generateToken({ refresh_token: refreshToken })
            .then((response) => {
              const { device, token } = response.data
              const login_index = device.login_index
              const url = new URL(currentPortal.getLandingUrl(login_index))
              document.querySelector('.pace').remove()
              setTokens(token, url.pathname, url.hostname)
              store.dispatch('profile/set', { data: response.data.user })
              main({ layout: layoutName }, router)
            })
            .catch(() => {
              document.querySelector('.pace').remove()
              removeToken()
              removeRefreshToken()
              main({ layout: layoutName }, router)
            })
        } else {
          document.querySelector('.pace').remove()
          removeToken()
          main({ layout: layoutName }, router)
        }
      })
  } else {
    document.querySelector('.pace').remove()
    main({ layout: layoutName }, router)
  }
}
