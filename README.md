# **Node.js Authentication API**

This is a Node.js project that provides user authentication functionalities using Express.js. It includes APIs for user signup, signin, authentication checks, and admin verification.

## Prerequisites

Ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v14 or later recommended)
- [npm](https://www.npmjs.com/) (comes with Node.js)
- [MySQL](https://www.mysql.com/) (for database support)

## Installation

1. Clone the repository:
   ```sh
   git clone <your-repository-url>
   cd <your-project-folder>
   ```

2. Install dependencies:
   ```sh
   npm install
   ```

3. Set up environment variables:
   - Create a `.env` file in the root directory and add the following details:
     ```env
     PORT=3001
     JWT_SECRET=YourNewSecretValue
     userEmail=sandeep.iiit2022@gmail.com
     pass=ocet lxgh euej zace
     DB_SYNC=true
     ```

4. Start the server:
   ```sh
   npm start
   ```

   The server will run on `http://localhost:3001`

## API Endpoints

### 1. User Signup
- **Endpoint:** `POST /api/v1/signup`
- **Description:** Creates a new user account.
- **Request Body:**
  ```json
  {
    "email": "user@example.com",
    "password": "securepassword"
  }
  ```
- **Response:**
  ```json
  {
    "message": "User created successfully"
  }
  ```

### 2. User Signin
- **Endpoint:** `POST /api/v1/signin`
- **Description:** Logs in an existing user.
- **Request Body:**
  ```json
  {
    "email": "user@example.com",
    "password": "securepassword"
  }
  ```
- **Response:**
  ```json
  {
    "token": "your_jwt_token"
  }
  ```

### 3. Check Authentication
- **Endpoint:** `POST /api/v1/isAuthenticated`
- **Description:** Verifies if the user is authenticated.
- **Response:**
  ```json
  {
    "authenticated": true
  }
  ```

### 4. Check Admin Status
- **Endpoint:** `GET /api/v1/isAdmin`
- **Description:** Checks if the user has admin privileges.
- **Headers:**
  ```json
  {
    "Authorization": "Bearer your_jwt_token"
  }
  ```
- **Response:**
  ```json
  {
    "admin": true
  }
  ```

### 5. Dummy API
- **Endpoint:** `GET /api/v1/dummy`
- **Description:** Returns a simple OK message.
- **Response:**
  ```json
  {
    "message": "OK"
  }
  ```

## Project Structure
```
.
├── controllers
│   ├── user-controller.js
├── middlewares
│   ├── index.js
├── routes
│   ├── v1
│   │   ├── user-routes.js
├── .env
├── src
│   ├── index.js
├── server.js
├── package.json
```
----
----

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
```
```
# **Sequelize Associations**

Sequelize provides robust support for defining relationships between models using **associations**. Associations help in structuring related data effectively and enable powerful query capabilities.

## Types of Associations
Sequelize supports the following types of associations:

1. **One-to-One (`hasOne` & `belongsTo`)**
2. **One-to-Many (`hasMany` & `belongsTo`)**
3. **Many-to-Many (`belongsToMany`)**

---

## Defining Associations
### 1. One-to-One
Used when one record in a table is associated with only one record in another table.
```javascript
// Example: A User has one Profile
User.hasOne(Profile);
Profile.belongsTo(User);
```

### 2. One-to-Many
Used when one record in a table is associated with multiple records in another table.
```javascript
// Example: A User has many Posts
User.hasMany(Post);
Post.belongsTo(User);
```

### 3. Many-to-Many
Used when multiple records in a table are related to multiple records in another table.
```javascript
// Example: A Student belongs to many Courses
Student.belongsToMany(Course, { through: 'StudentCourses' });
Course.belongsToMany(Student, { through: 'StudentCourses' });
```

---

## Association Options
Sequelize provides several options to customize associations:
- **foreignKey**: Specifies a custom foreign key.
- **as**: Defines an alias for the association.
- **onDelete & onUpdate**: Controls behavior when associated records are deleted/updated.
- **through**: Specifies the join table for many-to-many relationships.

Example:
```javascript
User.hasOne(Profile, { foreignKey: 'userId', onDelete: 'CASCADE' });
```

---

## Eager & Lazy Loading
- **Eager Loading**: Load associated models using `include`.
  ```javascript
  User.findAll({ include: Profile });
  ```
- **Lazy Loading**: Load associations on demand.
  ```javascript
  const user = await User.findByPk(1);
  const profile = await user.getProfile();
  ```

---

## Querying with Associations
Sequelize provides built-in methods to query associated data:
```javascript
const user = await User.findOne({
  where: { id: 1 },
  include: [
    { model: Profile, as: 'profile' },
    { model: Post, as: 'posts' }
  ]
});
```

---

## Learn More
For a detailed guide on Sequelize associations, refer to the official documentation:  
🔗 [Sequelize Associations Documentation](https://sequelize.org/docs/v6/core-concepts/assocs/)
🔗 [Sequelize Associations median very usefull](https://medium.com/@tavilesa12/dealing-with-many-to-many-associations-in-sequelize-bddc34201b80)

```
```

--- 

# **Many-to-Many Associations in Sequelize**

## Introduction
Many-to-Many (M:N) relationships occur when multiple records in one table are associated with multiple records in another table. In Sequelize, this is managed using a junction (through) table that contains foreign keys referencing both tables.

## Setting Up Many-to-Many Associations
To create an M:N association in Sequelize, you need three tables:
1. **Two main tables** (e.g., `Students` and `Courses`)
2. **A junction table** (e.g., `StudentCourses`) that holds references to both tables

### Example: Students and Courses
A student can enroll in multiple courses, and a course can have multiple students. This forms a Many-to-Many relationship.

### Model Definitions
#### Student Model
```javascript
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class Student extends Model {}

Student.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false }
  },
  { sequelize, modelName: 'Student' }
);

module.exports = Student;
```

#### Course Model
```javascript
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class Course extends Model {}

Course.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    title: { type: DataTypes.STRING, allowNull: false }
  },
  { sequelize, modelName: 'Course' }
);

module.exports = Course;
```

### Defining the Association
The association is defined using Sequelize's `belongsToMany` method. A junction table (`StudentCourses`) will be created automatically.

```javascript
const Student = require('./models/Student');
const Course = require('./models/Course');

Student.belongsToMany(Course, { through: 'StudentCourses' });
Course.belongsToMany(Student, { through: 'StudentCourses' });
```

## Working with Many-to-Many Associations

### Adding Associations
To associate a student with a course:
```javascript
const student = await Student.create({ name: 'John Doe' });
const course = await Course.create({ title: 'Mathematics' });
await student.addCourse(course);
```

### Retrieving Associated Data
#### Fetch courses for a student
```javascript
const student = await Student.findOne({
  where: { name: 'John Doe' },
  include: Course
});
console.log(student.Courses);
```

#### Fetch students enrolled in a course
```javascript
const course = await Course.findOne({
  where: { title: 'Mathematics' },
  include: Student
});
console.log(course.Students);
```

## Advanced Many-to-Many Associations

### Custom Junction Table with Additional Attributes
Instead of a simple string (`through: 'StudentCourses'`), you can define a custom model for the junction table if additional attributes (e.g., `enrollmentDate`) are needed.

#### StudentCourse Model
```javascript
const StudentCourse = sequelize.define('StudentCourse', {
  enrollmentDate: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  }
});

Student.belongsToMany(Course, { through: StudentCourse });
Course.belongsToMany(Student, { through: StudentCourse });
```

#### Using Additional Attributes
```javascript
await student.addCourse(course, { through: { enrollmentDate: new Date() } });
```

## Further Reading
For more details, refer to the official Sequelize documentation: [Advanced Many-to-Many Associations](https://sequelize.org/docs/v6/advanced-association-concepts/advanced-many-to-many/)
```
```
# **Sequelize Model Synchronization**

Sequelize is a powerful ORM for Node.js that facilitates the management of relational databases. A key feature of Sequelize is model synchronization, which ensures that your JavaScript model definitions align with the corresponding tables in your database. This process is particularly useful during development to keep your database schema in sync with your application models.

## Synchronizing a Single Model

To synchronize a model with its corresponding table in the database, use the `sync` method provided by Sequelize. This method is asynchronous and returns a Promise.

```javascript
await User.sync();
console.log('The table for the User model was just (re)created!');
```

The `sync` method can be configured with various options:

- **`User.sync()`**: Creates the table if it doesn't exist; does nothing if it already exists.

- **`User.sync({ force: true })`**: Drops the table if it exists and then creates a new one. **Warning**: This will result in data loss if the table already contains data.

- **`User.sync({ alter: true })`**: Examines the current state of the table in the database (e.g., columns, data types) and performs the necessary changes to make it match the model.

```javascript
await User.sync({ force: true });
console.log('The table for the User model was just (re)created!');
```

## Synchronizing All Models

To synchronize all defined models at once, use the `sequelize.sync()` method:

```javascript
await sequelize.sync({ force: true });
console.log('All models were synchronized successfully.');
```

This approach is convenient during development to ensure that all models are in sync with the database.

## Dropping Tables

Sequelize provides methods to drop tables:

- **Drop a specific model's table**:

  ```javascript
  await User.drop();
  console.log('User table dropped!');
  ```

- **Drop all tables**:

  ```javascript
  await sequelize.drop();
  console.log('All tables dropped!');
  ```

## Database Safety Check

The `sync` and `drop` operations can be destructive. To add a layer of safety, Sequelize accepts a `match` option, which takes a regular expression to match against the database name. This ensures that such operations are only performed on intended databases.

```javascript
// This will run .sync() only if the database name ends with '_test'
await sequelize.sync({ force: true, match: /_test$/ });
```

## Caution in Production

While `sync()` is a valuable tool during development, it is not designed for use in production environments. Using its `alter` or `force` options may lead to data loss. For production, it's recommended to use migrations to manage database schema changes. Migrations provide a safer and more controlled way to evolve your database schema over time.

For more detailed information, refer to the [Sequelize documentation on model synchronization](https://sequelize.org/docs/v7/models/model-synchronization/). 

```
```

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

