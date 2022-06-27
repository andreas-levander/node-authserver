# Validate

Returns the public key to let services validate a token

**URL** : `/v1/api/public/validate`

**Method** : `GET`  
**Authentication required** : No  

## Success Response

**Code** : `200 OK`

**Example**

```json
{
    "keys":[{"crv":"Ed25519","x":"qHQHmJqv6YcWdTFakO89kJGWzmQ6k0oRyks_F1XwBAQ","kty":"OKP","kid":"891609bc-3442-41a1-90c8-f285e0a9c3c3"}]
}
```