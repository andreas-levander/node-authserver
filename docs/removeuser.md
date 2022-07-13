# Remove User

Removes the user with the username provided

**URL** : `/v1/api/admin/removeuser`

**Method** : `POST`  
**Content-Type** : `application/json`  
**Authentication required** : Yes  
**Role required** : Admin  

Request body should have username in json format

**Example**
```json
{
    "username": "valid-username"
}
```

## Success Response

**Code** : `200 OK`

**Example**

```json
{
    "message": "Removed user: valid-username"
}
```

## Error Responses

### If you are not logged in as admin or token is invalid

**Code** : `401 Unauthorized`

**Response** :

```json
{
    "error": "unauthorized"
}
```



### If don't send a token in Authorization header

**Code** : `401 Unauthorized`

**Response** :

```json
{
    "error": "no auth token in request"
}
```


### If input validation fails

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
                "missingProperty": "username"
            },
            "message": "must have required property 'username'"
        }
    ]
}
```