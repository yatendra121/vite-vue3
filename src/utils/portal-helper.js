const portals_configs = require("../../portals");

function removeSlashes(path) {
  return path.replace(/^\/+/g, "").replace(/\/+$/g, "");
}

function portal(portalName) {
  this.portalName = portalName;
  this.configs = portals_configs[portalName];

  this.getBaseUrl = function () {
    return this.configs.VUE_APP_BASE_URL;
  };
  this.getAssetsUrl = function () {
    return this.configs.VUE_APP_ASSETS_URL
      ? this.configs.VUE_APP_ASSETS_URL
      : this.configs.VUE_APP_DOMAIN_PREFIX;
  };
  this.getDomianPrefix = function () {
    return this.configs.VUE_APP_DOMAIN_PREFIX;
  };
  this.getOutputDir = function () {
    return this.configs.VUE_APP_OUTPUT_DIR;
  };
  this.getIndexFilePath = function () {
    return this.configs.VUE_APP_INDEX_PATH;
  };
  this.isMultiLogin = function () {
    return this.configs.VUE_APP_MULTI_LOGIN;
  };
  this.getEntry = function () {
    return this.configs.VUE_APP_ENTRY;
  };
  this.getApiBaseUrl = function () {
    return this.configs.VUE_APP_API_BASE_URL;
  };
  this.getWebBaseUrl = function () {
    return this.configs.VUE_APP_WEB_BASE_URL;
  };
  this.get = function (key) {
    return this.configs[key];
  };
  this.getPort = function () {
    return this.configs.VUE_APP_PORT;
  };
  this.getStorageUrl = function () {
    return this.configs.VUE_APP_STORAGE_URL;
  };
  this.getClientId = function () {
    return this.configs.VUE_APP_CLIENT_ID;
  };
  this.getPortalUrl = function (uri) {
    let landing_page = [removeSlashes(this.getBaseUrl())];
    let domain_prefix = removeSlashes(this.getDomianPrefix());
    if (domain_prefix) {
      landing_page.push(domain_prefix);
    }
    if (uri) {
      landing_page.push(removeSlashes(uri));
    }
    return landing_page.join("/");
  };
  this.getLandingUrl = function (login_index, uri) {
    return login_index && this.isMultiLogin()
      ? this.getPortalUrl("u/" + login_index)
      : this.getPortalUrl(uri);
  };
  this.getRouterBaseUri = function () {
    const login_index = window.location.toString().match(/\/u\/[0-9]+\/?/g);
    let prefix = [];
    if (this.getDomianPrefix()) {
      prefix.push(removeSlashes(this.getDomianPrefix()));
    }
    if (login_index && this.isMultiLogin()) {
      prefix.push(removeSlashes(login_index[0]));
    }
    return removeSlashes(prefix.filter((f) => f).join("/")) + "/";
  };
}
const currentPortal = new portal("admin");
module.exports = {
  currentPortal: currentPortal,
  portal: portal,
};
