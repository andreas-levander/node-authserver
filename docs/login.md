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
    "token": "eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCIsImtpZCI6IjBkN2M0MWFmLTY2NTUtNGE5NS05MjMzLTY3M2ZhOGVlYmJhMyJ9.eyJyb2xlcyI6WyJhZG1pbiJdLCJzdWIiOiJhZG1pbiIsImlhdCI6MTY2MTI0Njc0NiwiaXNzIjoiYXV0aHNlcnZlciIsImV4cCI6MTY2MTI0NzY0Nn0.pLvXl3uQvGxAqxY5JNa4miqyHdb6etM0xZX5-_Aj2wrcuv8aEF2xA8wANl4MUup3ZT9oWbGWg2xRUuWkAAnLDg"
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