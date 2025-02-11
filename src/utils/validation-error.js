const AppError = require('./error-handler');
const { StatusCodes } = require('http-status-codes');

class ValidationError extends AppError{
    constructor(error) {
        let errorName = error.name;
        let explanation = [];
        error.errors.forEach((err) => {
            explanation.push(err.message);
        });
        
        super(
            errorName,
            'NOt able to validate the data sent in the request',
            explanation,
            StatusCodes.BAD_REQUEST
        )
      }
}

module.exports = ValidationError;


/**
  error: Validation len on password failed
    at InstanceValidator._validate (D:\Sanket Singh\AUTHSERVICE_\node_modules\sequelize\lib\instance-validator.js:50:13)
    at process.processTicksAndRejections (node:internal/process/task_queues:95:5)
    at async InstanceValidator._validateAndRunHooks (D:\Sanket Singh\AUTHSERVICE_\node_modules\sequelize\lib\instance-validator.js:60:7)
    at async InstanceValidator.validate (D:\Sanket Singh\AUTHSERVICE_\node_modules\sequelize\lib\instance-validator.js:54:12)
    at async User.save (D:\Sanket Singh\AUTHSERVICE_\node_modules\sequelize\lib\model.js:2426:7)
    at async User.create (D:\Sanket Singh\AUTHSERVICE_\node_modules\sequelize\lib\model.js:1362:12)
    at async userRepository.create (D:\Sanket Singh\AUTHSERVICE_\src\repository\user-repository.js:9:26)
    at async UserService.create (D:\Sanket Singh\AUTHSERVICE_\src\services\user-service.js:15:30)
    at async create (D:\Sanket Singh\AUTHSERVICE_\src\controllers\user-controller.js:8:22) {
  errors: [
    ValidationErrorItem {
      message: 'Validation isEmail on email failed',
      type: 'Validation error',
      path: 'email',
      value: 'sandeep7809@',
      origin: 'FUNCTION',
      instance: [User],
      path: 'email',
      value: 'sandeep7809@',
      origin: 'FUNCTION',
      instance: [User],
      value: 'sandeep7809@',
      origin: 'FUNCTION',
      instance: [User],
      origin: 'FUNCTION',
      instance: [User],
      instance: [User],
      validatorKey: 'isEmail',
      validatorKey: 'isEmail',
      validatorName: 'isEmail',
      validatorName: 'isEmail',
      validatorArgs: [Array],
      validatorArgs: [Array],
      original: [Error]
    },
    ValidationErrorItem {
    ValidationErrorItem {
      message: 'Validation len on password failed',
      type: 'Validation error',
      message: 'Validation len on password failed',
      type: 'Validation error',
      type: 'Validation error',
      path: 'password',
      path: 'password',
      value: '8',
      origin: 'FUNCTION',
      instance: [User],
      validatorKey: 'len',
      validatorName: 'len',
      validatorArgs: [Array],
      original: [Error]
    }
  ]
}

 
 */


/**
 
 
    "message": "Something went wrong",
    "data": {},
    "success": false,
    "err": {
        "name": "SequelizeValidationError",
        "errors": [
            {
                "message": "Validation isEmail on email failed",
                "type": "Validation error",
                "path": "email",
                "value": "sandeep7809@",
                "origin": "FUNCTION",
                "instance": {
                    "id": null,
                    "email": "sandeep7809@",
                    "password": "8",
                    "updatedAt": "2025-02-10T19:45:15.627Z",
                    "createdAt": "2025-02-10T19:45:15.627Z"
                },
                "validatorKey": "isEmail",
                "validatorName": "isEmail",
                "validatorArgs": [
                    {
                        "allow_display_name": false,
                        "allow_underscores": false,
                        "require_display_name": false,
                        "allow_utf8_local_part": true,
                        "require_tld": true,
                        "blacklisted_chars": "",
                        "ignore_max_length": false,
                        "host_blacklist": [],
                        "host_whitelist": []
                    }
                ],
                "original": {
                    "validatorName": "isEmail",
                    "validatorArgs": [
                        {
                            "allow_display_name": false,
                            "allow_underscores": false,
                            "require_display_name": false,
                            "allow_utf8_local_part": true,
                            "require_tld": true,
                            "blacklisted_chars": "",
                            "ignore_max_length": false,
                            "host_blacklist": [],
                            "host_whitelist": []
                        }
                    ]
                }
            },
            {
                "message": "Validation len on password failed",
                "type": "Validation error",
                "path": "password",
                "value": "8",
                "origin": "FUNCTION",
                "instance": {
                    "id": null,
                    "email": "sandeep7809@",
                    "password": "8",
                    "updatedAt": "2025-02-10T19:45:15.627Z",
                    "createdAt": "2025-02-10T19:45:15.627Z"
                },
                "validatorKey": "len",
                "validatorName": "len",
                "validatorArgs": [
                    2,
                    100
                ],
                "original": {
                    "validatorName": "len",
                    "validatorArgs": [
                        2,
                        100
                    ]
                }
            }
        ]
    }

 
 */