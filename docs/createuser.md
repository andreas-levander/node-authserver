# Create User

Creates new user with the username and roles provided and returns a the new user with a generated password

**URL** : `/v1/api/admin/createuser`

**Method** : `POST`  
**Content-Type** : `application/json`  
**Authentication required** : Yes
**Role required** : Admin  

Request body should have username and roles in json format

**Example**
```json
{
    "username": "valid-username",
    "roles" : ["role1", "role2"]
}
```

## Success Response

**Code** : `200 OK`

**Example**

```json
{
    "message": "new user created",
    "newuser": {
        "username": "valid-username",
        "password": "vC0uLvIsj9",
        "roles": [
            "role1",
            "role2"
        ]
    }
}
```

## Error Response

**Condition** : If you are not logged in as admin or token is invalid.

**Code** : `401 Unauthorized`

**Content** :

```json
{
    "error": "unauthorized"
}
```

**Condition** : If don't send a token in Authorization header

**Code** : `401 Unauthorized`

**Content** :

```json
{
    "error": "no auth token in request"
}
```

**Condition** : if user already exists

**Code** : `400 Bad Request`

**Content** :

```json
{
    "error": "username must be unique"
}
```

**Condition** : if input validation fails

**Code** : `400 Bad Request`

**Example** :

```json
{
    "message": "Incorrect input",
    "error": [
        {
            "instancePath": "",
            "schemaPath": "#/required",
            "keyword": "required",
            "params": {
                "missingProperty": "roles"
            },
            "message": "must have required property 'roles'"
        }
    ]
}
```