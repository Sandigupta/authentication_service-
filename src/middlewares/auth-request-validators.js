const validateUserAuth = (req, res, next)=>{
      if (!req.body.email || !req.body.password) {
          return res.status(400).json({
              succes: "false",
              data: {},
              messege: "Something went wrong",
              err: "Email and password is missing in the request",
          });
    }
    next();
}

module.exports = {
    validateUserAuth
}