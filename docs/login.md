# Login

**URL** : `/v1/api/public/login`

**Method** : `POST`  
**Content-Type** : `application/json`  
**Authentication required** : No  

Request body should have username and password in json format

**Example**
```json
{
    "username": "valid-username",
    "password": "valid-password"
}
```

## Success Response

**Code** : `200 OK`

**Example**

```json
{
    "token": "93144b288eb1fdccbe46d6fc0f241a51766ecd3d"
}
```

## Error Response

**Condition** : If 'username' and 'password' combination is wrong.

**Code** : `401 Unauthorized`

**Content** :

```json
{
    "error": "invalid username or password"
}
```