const express = require("express");
const UserController  = require("../../controllers/user-controller");
const {AuthRequestValidator} = require('../../middlewares/index')

const router = express.Router();

router.post('/signup', AuthRequestValidator.validateUserAuth, UserController.create);
router.post('/signin', AuthRequestValidator.validateUserAuth, UserController.signIn);
router.post('/isAuthenticated', UserController.isAuthanticated);
router.get('/isAuthorisation', AuthRequestValidator.validateAdminAuth, UserController.isAuthorisation);
router.get('/dummy', (req, res) => {
    return res.status(200).json({ message: "OK" });
})


module.exports = router

