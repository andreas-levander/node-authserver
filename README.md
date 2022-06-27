
# Role Based Authentication Server

Authentication server created with Node.js and MongoDB to be used for Role Based Authentication (RBAC)

## Table of Contents

- [Features](#features)
- [Setup](#setup)
- [API Endpoints](#API-Endpoints)
    - [Public](#Public)
    - [Private](#Private)

## Features

- Asymmetric key generation
- Input validation
- Password generation
- Public key endpoint to let services verify token
- Login Api to serve authorized users a Json Web Token
- Admin Api to create/remove users

## Setup

### Using Docker

Quick start using docker  
`docker compose up`

#### Requirements

- Docker
- Docker compose

#### Configuration

Todo


### Without Docker using Npm

#### Requirements

- npm & Node.js 16
- Mongodb

#### Installation

1. Setup your database
2. Add your MONGODB_URI in an .env file in /authserver directory or in /authserver/utils/config.js
3. Install dependencies `cd authserver && npm install --omit=dev`
4. Start server `npm start`


## API Endpoints

### Public

- [Login](/docs/login.md) : `POST /v1/api/public/login`
- [Validate](/docs/validate.md) : `GET /v1/api/public/validate`

### Private

- [Create User](/docs/createuser.md) : `POST /v1/api/admin/createuser`


