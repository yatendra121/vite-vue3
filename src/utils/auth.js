import Cookies from "js-cookie";
import store from "@/store";

import { _axios } from "@/plugins/axios";
import { removeSlashes } from "@/utils";
import { currentPortal } from "@/utils/portal-helper";
const prefix = currentPortal.get("VUE_APP_COOKIE_PREFIX")
  ? currentPortal.get("VUE_APP_COOKIE_PREFIX")
  : "";

const TokenKey = prefix + "X-TOKEN";
const RefreshTokenKey = prefix + "X-REFRESH-TOKEN";
const DeviceIdKey = "DEVICE-ID";

/**
 * To get the Authentication token
 */
export function getToken() {
  return Cookies.get(TokenKey);
}

/**
 * To Get the Refresh Token
 */
export function getRefreshToken() {
  return Cookies.get(RefreshTokenKey);
}
/**
 * To get the device token
 */
export function getDeviceId() {
  return Cookies.get(DeviceIdKey);
}

export function setToken(token, path, domain) {
  return Cookies.set(TokenKey, token, { expires: 30, path, domain });
}

export function setRefreshToken(token, path, domain) {
  return Cookies.set(RefreshTokenKey, token, { expires: 45, path, domain });
}

export function setDeviceId(deviceId) {
  return Cookies.set(DeviceIdKey, deviceId, { expires: 200000 });
}

export function removeToken() {
  return Cookies.remove(TokenKey);
}

export function removeRefreshToken() {
  return Cookies.remove(RefreshTokenKey);
}

export function removeDeviceId() {
  return Cookies.remove(DeviceIdKey);
}

export function setTokens(token, path, domain) {
  removeToken();
  removeRefreshToken();
  path = "/" + removeSlashes(path);
  setToken(token.access_token, path, domain);
  setRefreshToken(token.refresh_token, path, domain);
}
/**
 * To logout the user and redirect to login page.
 */
export function logOutUser(vue, socket_id) {
  return _axios({
    url: "logout",
    method: "POST",
    data: { socket_id },
  })
    .then(() => {
      removeToken();
      removeRefreshToken();
      store.dispatch("profile/delete");
      if (vue) {
        vue.$router.push("/");
      } else {
        window.location.href = currentPortal.getPortalUrl();
      }
    })
    .catch((error) => {
      console.log("error", error);
      removeToken();
      removeRefreshToken();
      store.dispatch("profile/delete");
      if (vue) {
        vue.$router.push("/");
      } else {
        window.location.href = currentPortal.getPortalUrl();
      }
    });
}
export function myProfile() {
  return _axios({
    url: "my-profile",
    method: "GET",
  });
}
export function generateToken() {
  return _axios({
    url: "generate-token",
    method: "POST",
  });
}
