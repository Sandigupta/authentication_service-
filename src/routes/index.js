const express = require('express');

const ApiV1router = require("./v1/index");

const router = express.Router();

// This line specifies that all routes starting with /v1 should be handled by the ApiV1router
router.use('/v1', ApiV1router)

module.exports = router;