var port =
  process.env.OPENSHIFT_NODEJS_PORT ||
  process.env.VCAP_APP_PORT ||
  process.env.PORT ||
  process.argv[2] ||
  9000;
var express = require("express");
var Gun = require("gun");
require("gun-level");

const levelup = require("levelup");
const leveldown = require("leveldown");

// Create a new level instance which saves
// to the `data/` folder.
const levelDB = levelup("data", {
  db: leveldown
});

var app = express();
app.use(Gun.serve);

var server = app.listen(port);

Gun({
  level: levelDB,
  file: false,
  web: server
});

console.log("Server started on port " + port + " with /gun");
