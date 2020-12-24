# WhatsApp Clone Backend

### Login Object Structure

```
{
    "userDetails":{
        "mobile":"1234567890",
        "password":"xxxxxxxxxx"
    }
}
```
### Register Object Structure

```
{
    "userDetails":{
        "mobile":"1234567890",
        "name": "XXXXXXXXXXXX",
        "password":"xxxxxxxxxx"
    }
```
}
### AuthResponse Object Structure

```
authResponse = {
    user: {},
    message: '',
    authStatus: false,
    jwtToken: null
}
```