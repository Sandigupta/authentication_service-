const { User} = require("../models/index");
const {Role} = require("../models/index");


class userRepository{

    async create(data) {
        try {
            const user = await User.create(data);
            return user;
        } catch (error) {
            console.log("Something went wrong at User repository lavel");
            throw error;
        }
    }
    
    async destroy(userId) {
          try {
              await User.destroy({
                  where: {
                      id: userId
                  }
              });
              return true;
          } catch (error) {
              console.log("Something went wrong at Users repository level");
              throw error;
          }
    }

    async getById(userId) {
        try {
            const user=await User.findByPk(userId, {
                attributes: ['email', 'id']
            });
            return user;
        } catch (error) {
            console.log("Something went wrong at the repository level");
            throw error;
        }
    }

    async getByEmail(userEmail) {
          try {
              const user = await User.findOne({
                  where: {
                      email: userEmail
                  }
              });
              return user;
          } catch (error) {
            console.log("Something went wrong at the repository in getByEmail level");
            throw error;
          }
    }

    async isAdmin(id) {
        try {
            const user =await User.findByPk(id);
            // console.log(user);
            const adminRole = await Role.findOne({
                where: {
                    name: 'ADMIN'
                }
            });
            // console.log(adminRole);
            const responce =await user.hasRole(adminRole);
            return responce;
        } catch (error) {
            console.log("Something went wrong at the repository in isAdmin level");
            throw error; 
        }
    }
    
}


module.exports = userRepository;