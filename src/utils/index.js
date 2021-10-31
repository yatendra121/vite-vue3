/**
 * Created by jiachenpan on 16/11/18.
 */

import store from "@/store";
import { currentPortal } from "@/utils/portal-helper";

export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path);
}

export function guidGenerator() {
  var S4 = function () {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
  };
  return (
    S4() +
    S4() +
    "-" +
    S4() +
    "-" +
    S4() +
    "-" +
    S4() +
    "-" +
    S4() +
    S4() +
    S4()
  );
}
export function removeSlashes(path) {
  return path.replace(/^\/+/g, "").replace(/\/+$/g, "");
}

/**
 * Check the Authority.
 * @param {String|Array} permissions
 */
export function canAccess(permissions) {
  /**
   * Force Allow all Access
   */
  if (currentPortal.get("VUE_APP_CHECK_PERMISSION") === "false") return true;

  if (!permissions) {
    return;
  }

  if (typeof permissions === "string") {
    permissions = [permissions];
  }

  let has_access = false;
  permissions.forEach(function (permission) {
    if (store.getters.permissions.indexOf(permission) !== -1) {
      has_access = true;
    }
  });

  return has_access;
}

export function getTimeOffset() {
  return new Date().getTimezoneOffset();
}
export function tableAliveOnly(from, next, table_name, route_names, callback) {
  if (from && from.name && !route_names.includes(from.name)) {
    next((vm) => {
      const page_size_key = vm.$helper.getProp(
        vm.$store.state.table,
        `${table_name}.settings.page_size_key`
      );
      if (page_size_key) {
        const page_size = vm.$helper.getProp(
          vm.$store.state.form,
          `${table_name}.values.${page_size_key}`
        );
        vm.$store.commit("form/saveValues", {
          formName: table_name,
          values: { [page_size_key]: page_size },
        });
      }
      callback(vm);
    });
  } else {
    next(callback);
  }
}
