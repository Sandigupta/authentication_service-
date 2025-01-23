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
        res.status(500).json({
            message: `Something went wrong`,
            data: {},
            success: false,
            err: error
        });
    }
   
}

const des=async (req, res) => {
    try {
        const responce = userService.destroy(req.params);
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
    des
}