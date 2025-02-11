// freezing your object does not allow to change the object value from outside 
const ClientErrorCodes = Object.freeze({
    BAD_REQUEST: 400,
    UNAUTHORISED: 401,
    NOT_FOUND:404
})

const ServerErrorCodes = Object.freeze({
    INTERNAL_SERVER_ERROR: 500,
    NOT_IMPLEMENTED:501,
})

const SuccesCodes = Object.freeze({
    OK: 200,
    CREATED:201
})

module.exports = {
    SuccesCodes,
    ClientErrorCodes,
    SuccesCodes
} 