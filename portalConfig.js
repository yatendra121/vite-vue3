const fs = require("fs");
const dotenv = require("dotenv");
if (!fs.existsSync(__dirname + "/.env")) {
  throw Error(".env File is not present");
}
const environment = fs
  .readFileSync(__dirname + "/.env", "utf8")
  .toString()
  .trim();

function getPortalConfig(portal, environment) {
  // Geting environment Veriables
  const environment_buff = fs.readFileSync(
    __dirname + "/.env." + environment,
    "utf8"
  );
  const environment_veriables = dotenv.parse(environment_buff);

  // const args = minimist(process.argv.slice(2));
  // const portal = args.portal;
  const envFileName = portal
    ? ".env." + portal + "." + environment
    : ".env." + environment;

  if (!fs.existsSync(__dirname + "/" + envFileName)) {
    throw Error(envFileName + " File is not present");
  }

  // Geting Portal environment Veriables
  const portal_environment_buff = fs.readFileSync(
    __dirname + "/" + envFileName,
    "utf8"
  );
  const portal_environment_veriables = dotenv.parse(portal_environment_buff);

  return {
    ...environment_veriables,
    ...portal_environment_veriables,
  };
}

fs.readdir("./portals", function (err, files) {
  let configs = {};
  //handling error
  if (err) {
    return console.log("Unable to scan directory: " + err);
  }

  //listing all files using forEach
  files.forEach(function (file) {
    let portal = file.split(".").slice(0, -1).join(".");
    if (file !== "index.js") {
      const portal_config = require("./portals/" + file);
      const portal_environment_config = getPortalConfig(portal, environment);
      configs[portal] = {
        ...portal_environment_config,
        ...portal_config,
      };
    }
  });
  fs.writeFile(
    "./portals/index.js",
    "const data = " + JSON.stringify(configs) + "\n export default data;",
    "utf8",
    function () {}
  );
});
