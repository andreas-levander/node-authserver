
# Role Based Authentication Server

Authentication server created with Node.js and MongoDB to be used for Role Based Authentication (RBAC)

## Table of Contents

- [Features](#features)
- [API Endpoints](#API-Endpoints)
    * [Login](#login)

## Features

- Asymmetric key generation
- Input validation
- Password generation
- Public key endpoint to let services verify token
- Login Api to serve authorized users a Json Web Token
- Admin Api to create/remove users

## API Endpoints

- [Login](/docs/login.md) : `POST /api/login/`

