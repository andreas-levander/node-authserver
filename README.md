
# Role Based Authentication Server

Authentication server created with Node.js and MongoDB to be used for Role Based Authentication (RBAC)

## Table of Contents

[Features](#features)
[Endpoints](#endpoints)

## Features

- Asymmetric key generation
- Input validation
- Password generation
- Public key endpoint to let services verify token
- Login Api to serve authorized users a Json Web Token
- Admin Api to create/remove users

## Endpoints

#### Login

`/v1/api/public/login`

Request should have json body with username and password

Example

    {
        "username": "your-username",
        "password": "your-password"
    }


