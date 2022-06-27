
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

### Login

**URL** : `/v1/api/public/login`

**Method** : `POST`
**Content-Type** : `application/json`
**Auth required** : No

Request body should have username and password in json format

**Example**
```json
    {
        "username": "valid-username",
        "password": "valid-password"
    }
```

#### Success Response

**Code** : `200 OK`

**Example**

```json
{
    "token": "93144b288eb1fdccbe46d6fc0f241a51766ecd3d"
}
```

#### Error Response

**Condition** : If 'username' and 'password' combination is wrong.

**Code** : `401 Unauthorized`

**Content** :

```json
{
    "error": "invalid username or password"
}
```

