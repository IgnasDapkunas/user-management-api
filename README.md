## Nest.js User Management API

This project is a RESTful API developed with Nest.js, focusing on user management. It's designed with robustness in mind and has features such as user registration, authentication, profile management, and more, providing a solid foundation for any application that requires user management functionality.

## Key Features

- **User Registration & Login:** Allows users to create an account and authenticate.
- **JWT Authentication:** Uses JSON Web Tokens (JWT) for secure, token-based user authentication.
- **Bcrypt Encryption:** Safeguards user passwords by storing them in an encrypted format using Bcrypt.
- **User Management:** Provides capabilities for editing and deleting user profiles.
- **Public and Authenticated Routes:** Ensures secure access control by differentiating between public and authenticated routes.

## Endpoints Overview

- Users

**GET** `/users`: Fetch all users.

**PATCH** `/users`: Edit user details.

**DELETE** `/users/:id`: Delete a user by ID.

- Authentication

**POST** `/auth/login`: Authenticate a user and return a JWT.

**GET** `/auth`: Fetch user profile based on the provided JWT.

**POST** `/auth/register`: Register a new user.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## License

Nest is [MIT licensed](LICENSE).
