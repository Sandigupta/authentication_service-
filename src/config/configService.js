const bcrypt = require("bcrypt");
const saltRound = 10;

module.exports = {
    PORT: process.env.PORT || 3001,
    SALT: bcrypt.genSaltSync(saltRound)
}