const app = require('express');
const router = app.Router();
const {handleRefreshtoken} = require("../controllers/refreshTokencontroller")
router.get("/refreshtoken", handleRefreshtoken);
module.exports = router;