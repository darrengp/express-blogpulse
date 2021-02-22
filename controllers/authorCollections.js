// instantiate the express router
const router = require("express").Router();
// require models
const db = require("../models");

// routes should be mounted on the router here

// export the router so we can require in server.js
module.exports = router;
