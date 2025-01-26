const { use } = require("../routes/v1");
const UserService = require("../services/user-service");

const userService = new UserService();

const create = async (req, res) => {
    try {
        const user = userService.create({
            email: req.body.email,
            password:req.body.password 
        });
        return res.status(201).json({
            data: user,
            message:`Succesfully created a new user`,
            success: true,
            err:{}
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: `Something went wrong`,
            data: {},
            success: false,
            err: error
        });
    }
   
}

const signIn = async (req, res) => {
    try {
        const responce = await userService.signIn(req.body.password, req.body.email);
        return res.status(200).json({
            data: responce,
            message: "Succesfully signIn in",
            success: true,
            err:{}
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Something went wrong ",
            data: {},
            success: false,
            err: error
        });
    }
}

const isAuthanticated = async (req,res) => {
      try {
          const token = req.headers['x-access-token'];
          const responce = await userService.authanticate(token);
          return res.status(200).json({
              data: responce,
              message: "User is Succesfully authorised",
              success: true,
              err:{}
          })
      } catch (error) {
          console.log(error);
          return res.status(500).json({
              message: "Something went wrong ",
              data: {},
              success: false,
              err:error
        })
      }
}

const des=async (req, res) => {
    try {
        const responce =await userService.destroy(req.params);
        return res.status(201).json({
            data: responce,
            message: "Succefully deleted the user",
            success: true,
            err:{}
        })
    } catch (error) {
        console.log("Something went wrong at the user controlle level");
        throw error;
    }
}

module.exports = {
    create,
    des,
    signIn,
    isAuthanticated
}