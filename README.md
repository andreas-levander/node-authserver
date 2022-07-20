# Role Based Authentication Server <!-- omit in toc -->

Authentication server created with Node.js, MongoDB and Redis to be used for Role Based Authentication (RBAC)

## Table of Contents <!-- omit in toc -->

- [Features](#features)
- [Setup](#setup)
  - [Using Docker](#using-docker)
    - [Requirements](#requirements)
  - [Without Docker using Npm](#without-docker-using-npm)
    - [Requirements](#requirements-1)
    - [Installation](#installation)
  - [MongoDB](#mongodb)
  - [Redis](#redis)
- [Configuration](#configuration)
  - [Environmental variables](#environmental-variables)
- [API Endpoints](#api-endpoints)
  - [Public](#public)
  - [Private](#private)

## Features

- Asymmetric key generation and rotation
- Input validation
- Password generation
- Basic logging
- Public key endpoint to let services verify token
- Login Api to serve authorized users a Json Web Token
- Admin Api to create/remove users

## Setup

### Using Docker

Quick start using docker

```
docker compose up
```

#### Requirements

- Docker
- Docker compose

### Without Docker using Npm

#### Requirements

- npm & Node.js 16
- Mongodb
- Redis

#### Installation

1. Setup your database
2. Add your MONGODB_URI in an .env file
3. Add your REDIS_URI in .env file
4. Install dependencies `npm install`
5. Start server `npm start`

### MongoDB

Initialization script location: `/mongodb/docker-entrypoint-initdb.d`

When starting MongoDB for the first time it will run the initialization script if it is mounted in the mongodb container as done by default in the docker [compose](compose.yaml).

You should configure the script with the username and password used by the authserver.

Also you should change the root username and password in the [compose](compose.yaml).

### Redis

Redis is used to store the asymmetric keys in memory. You can also enable redis [persistance](https://redis.io/docs/manual/persistence/) storage to save them to disk unencrypted.

Restarting redis without persistance storage enabled will cause encryption keys to be regenerated which means all tokens in use will be invalidated.

## Configuration

You can configure the authserver by setting environmental variables.

### Environmental variables

`PORT` default=4000  
`MONGODB_URI` set your mongodb uri here  
`USERNAME_MINLENGTH` minimum required username length. default=5  
`KEY_GEN_ALG` algorithm used for generating json web tokens. default=EdDSA  
`REDIS_URI` set your redis uri here  
`KEY_TTL` how long the asymmetric keys used for encryption will last until renewed in seconds. default=2592000 (30 days)  
`TOKEN_TTL` how long a issued token is valid in minutes. default=15

## API Endpoints

### Public

- [Login](/docs/login.md) : `POST /v1/api/public/login`
- [Validate](/docs/validate.md) : `GET /v1/api/public/validate`

### Private

- [Create User](/docs/createuser.md) : `POST /v1/api/admin/createuser`
- [Remove User](/docs/removeuser.md) : `POST /v1/api/admin/removeuser`
