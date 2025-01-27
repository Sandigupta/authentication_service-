# Node.js Project Initialization and Setup

This guide provides step-by-step instructions to initialize and set up a Node.js project with essential dependencies and folder structure. Follow the steps below to build a well-structured backend application.

---

## **Project Initialization**

1. **Initialize the Project**

   ```bash
   npm init
   ```

   This will create a `package.json` file.

2. **Install Required Dependencies**

   ```bash
   npm install express
   npm install nodemon
   npm install dotenv
   npm install body-parser
   npm install jsonwebtoken
   npm install
   ```

---

## **Create File and Folder Structure**

Create the following files and folders to organize your project:

```plaintext
.env
.gitignore
src
 |- config
 |   |- configService.js
 |   |- config.json   // Move this file after initializing Sequelize
 |- middleware
 |- routes
 |- repository
 |- services
 |- utils
 |- controllers
```

---

## **Install Sequelize and Database Prototype**

1. Install Sequelize and Sequelize CLI:

   ```bash
   npm install sequelize sequelize-cli
   ```

2. Install the chosen database prototype (MySQL):

   ```bash
   npm install mysql2
   ```

---

## **Initialize Sequelize**

Run the following command to set up Sequelize in your project:

```bash
npx sequelize init
```

This command will generate the following folder structure:

```plaintext
models
migrations
seeders
config
 |- config.json
```

Move the `config.json` file into the `src/config` directory as specified in the folder structure.

---

## **Set the username, Password of Database and Databse Name**

Setup the config.json file 

```
{
  "development": {
    "username": "root",               //set the username:
    "password": "Sandeep@7809",       //set the password: 
    "database": "AUTH_DB_DEV",        //set the database name: "AUTH_DB_DEV"
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "test": {
    "username": "root",
    "password": null,
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "production": {
    "username": "root",
    "password": null,
    "database": "database_production",
    "host": "127.0.0.1",
    "dialect": "mysql"
  }
}

```
---

---
## **Now create the same data base as we named in confing.json file in our local divice**

```
npx sequelize db:create

```
#
---

---
## Creating User model and migration file.

```
npx sequelize model: generate --name User --attributes email:string,password:string
    
```
# afetr creating the user model and migration file 

```
npm sequelize db:migrate

```
# we map the model file with the migration that define the schema where model help use to connect with other directory like repository.
---



---

## **Password hashing using: bcrypt**

**bcrypt** is a library for hashing and comparing passwords securely using the bcrypt algorithm. It provides an easy-to-use interface for safeguarding sensitive user data in Node.js applications.

## Installation

Install the package via npm:

```bash
npm install bcrypt
```

## Usage

### Hashing a Password

```javascript
const bcrypt = require('bcrypt');

// Number of salt rounds (higher is more secure but slower)
const saltRounds = 10; 
const plainPassword = 'yourPassword123';

bcrypt.hash(plainPassword, saltRounds, (err, hash) => {
  if (err) {
    console.error('Error hashing password:', err);
    return;
  }
  console.log('Hashed password:', hash);
});
```

### Comparing a Password

```javascript
const hashedPassword = '$2b$10$XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX'; // Example hash

bcrypt.compare('yourPassword123', hashedPassword, (err, result) => {
  if (err) {
    console.error('Error comparing passwords:', err);
    return;
  }

  if (result) {
    console.log('Password matches!');
  } else {
    console.log('Password does not match.');
  }
});
```

## Synchronous Methods

For simplicity in smaller scripts or where performance is not a concern, bcrypt also offers synchronous methods:

### Hashing Synchronously

```javascript
const hash = bcrypt.hashSync(plainPassword, saltRounds);
console.log('Hashed password:', hash);
```

### Comparing Synchronously

```javascript
const isMatch = bcrypt.compareSync('yourPassword123', hashedPassword);
console.log('Password match:', isMatch);
```

## Best Practices

1. Use a minimum of **10 salt rounds** (more rounds improve security but may slow down performance).
2. Always store the hashed password, never the plain text.
3. Use environment variables to store sensitive configurations.

## Documentation

For more details, check out the [bcrypt documentation](https://www.npmjs.com/package/bcrypt).
---

# **The validation feature in Sequelize:**

---

## Sequelize Validations

Sequelize provides built-in validation methods to ensure data integrity before saving it to the database. Custom validations can also be added for flexibility.

## Built-in Validations

Sequelize includes several built-in validations, such as:

- **`isEmail`**: Ensures the value is a valid email.
- **`notEmpty`**: Ensures the value is not empty.
- **`len`**: Validates the length of a string.
- **`isInt`**, **`isFloat`**, etc.: Ensure the value is a valid number.

### Example

```javascript
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('sqlite::memory:');

const User = sequelize.define('User', {
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isEmail: true, // Validates email format
    },
  },
  username: {
    type: DataTypes.STRING,
    validate: {
      notEmpty: true, // Ensures value is not empty
      len: [3, 20],   // Ensures length is between 3 and 20 characters
    },
  },
});

(async () => {
  await sequelize.sync({ force: true });
  try {
    await User.create({ email: 'invalidEmail', username: '' });
  } catch (error) {
    console.error('Validation errors:', error.errors.map(e => e.message));
  }
})();
```

## Custom Validations

Custom validations can be added using functions:

```javascript
username: {
  type: DataTypes.STRING,
  validate: {
    isEvenLength(value) {
      if (value.length % 2 !== 0) {
        throw new Error('Username length must be even.');
      }
    },
  },
}
```

## Additional Resources

For detailed documentation, visit the official [Sequelize Validations Guide](https://sequelize.org/docs/v6/core-concepts/validations-and-constraints/).

---

## **Sequelize Hooks**

Sequelize Hooks are lifecycle callbacks that allow you to execute custom logic at specific stages of a model's lifecycle. They can be used globally or at the model level.

## Types of Hooks

### Common Hooks
- **Before/After Validation**: `beforeValidate`, `afterValidate`
- **Before/After Save**: `beforeSave`, `afterSave`
- **Before/After Create**: `beforeCreate`, `afterCreate`
- **Before/After Update**: `beforeUpdate`, `afterUpdate`
- **Before/After Destroy**: `beforeDestroy`, `afterDestroy`
- **Before/After Find**: `beforeFind`, `afterFind`

## Adding Hooks

### Model-Level Hooks

```javascript
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('sqlite::memory:');

const User = sequelize.define('User', {
  username: DataTypes.STRING,
});

User.addHook('beforeCreate', (user) => {
  user.username = user.username.toLowerCase();
});
```

### Global Hooks

```javascript
sequelize.addHook('beforeSave', (instance) => {
  console.log('Saving:', instance);
});
```

## Using Inline Hooks

```javascript
User.beforeUpdate((user) => {
  console.log('Before update:', user.username);
});
```

## More Information

For a complete list of hooks and usage examples, visit the [Sequelize Hooks Documentation](https://sequelize.org/docs/v6/other-topics/hooks/).

--- 

This provides a compact overview of Sequelize Hooks. 
---

# **JSON Web Tokens (JWT) with the `jsonwebtoken` library:**

---

## *JSON Web Token (JWT)*

**jsonwebtoken** is a library for creating and verifying JSON Web Tokens, commonly used for authentication and securely transmitting information between parties.

## Installation

Install the package via npm:

```bash
npm install jsonwebtoken
```

## Usage

### Generating a Token

```javascript
const jwt = require('jsonwebtoken');

const payload = { userId: 123 }; // Data to encode
const secret = 'yourSecretKey'; // Keep this secure!
const options = { expiresIn: '1h' }; // Token expiration time

const token = jwt.sign(payload, secret, options);
console.log('Generated Token:', token);
```

### Verifying a Token

```javascript
jwt.verify(token, secret, (err, decoded) => {
  if (err) {
    console.error('Token verification failed:', err.message);
  } else {
    console.log('Decoded Token:', decoded);
  }
});
```

### Decoding a Token (Without Verification)

```javascript
const decoded = jwt.decode(token);
console.log('Decoded Token:', decoded);
```

## Best Practices

1. **Secure the Secret**: Store the secret key in an environment variable.
2. **Use Expiry**: Always set an expiration time for tokens.
3. **Avoid Sensitive Data**: Do not store sensitive information in the token payload.

## More Information

For detailed documentation, visit the [jsonwebtoken GitHub Repository](https://github.com/auth0/node-jsonwebtoken).

--- 

---
## **Final Notes**

- Use `nodemon` for running the application during development to enable automatic restarts on file changes.
- Store sensitive information, such as database credentials, in the `.env` file.
- Add the following entries to `.gitignore` to protect sensitive data and node modules:
  ```plaintext
  node_modules/
  .env
  config/config.json
  ```
- Follow best practices for organizing your code into separate folders for routes, controllers, services, and utilities.

---

### **Happy Coding!** 🎉

