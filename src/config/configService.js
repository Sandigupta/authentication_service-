const bcrypt = require("bcrypt");
const saltRound = 10;
const dotenv = require('dotenv');
dotenv.config();

function getSalt() {
    return bcrypt.genSaltSync(saltRound);
}

module.exports = {
    PORT: process.env.PORT || 3001,
    SALT: getSalt(),
    JWT_SECRET: process.env.JWT_SECRET || 'YourNewSecretValue',
    user: process.env.userEmail,
    pass: process.env.pass,
    DB_SYNC:process.env.DB_SYNC

}