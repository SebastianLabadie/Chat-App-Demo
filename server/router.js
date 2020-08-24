const { Router } = require("express");
const router = Router();

router.route("/")
      .get((req, res) => res.send("server is up and running"));

module.exports = router;
