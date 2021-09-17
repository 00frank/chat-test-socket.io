const fs = require("fs");
const pathJoiner = require("path").join;
const ip = require("ip");

function setPlaceToHost (value) {
  let Host = {LOCALHOST: "localhost", IPV4: ip.address()}
  let path = pathJoiner(__dirname, "..", "public", "chat.js");

  let file = fs.readFileSync(path).toString().split("\r\n");
  let firstLine = file[0];

  if (value == Host.LOCALHOST) {
    file[0] = firstLine.replace(Host.IPV4, Host.LOCALHOST);
    console.log(`Setting host in: http://${Host.LOCALHOST}:2006`);
  } else if (value == "ipv4") {
    file[0] = firstLine.replace(Host.LOCALHOST, Host.IPV4);
    console.log(`Setting host in: http://${Host.IPV4}:2006`);
  }
  file = file.join("\r\n");
  fs.writeFileSync(path, file);
}

module.exports = {
  init: function () {
    let cfg = fs.readFileSync(__dirname + "/.config").toString().split("\r\n");
    cfg = cfg.filter(l => l[0] !== "*" && l[0] !== undefined && l[0] !== "");
    cfg = cfg.map(c => {
      let property = c.split("=")[0].trim();
      let value = c.split("=")[1].trim();
      return { [property]: value }
    })

    if ("OPEN_SERVER_IN" in cfg[0]) setPlaceToHost(cfg[0].OPEN_SERVER_IN)
  }
}