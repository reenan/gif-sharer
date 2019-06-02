## GIF Sharer
___

Demo available [here](http://gif-sharer.surge.sh)


#### How to run locally

1. Create `client/.env` file with the following:
```
NODE_ENV=src
REACT_APP_API_URL=http://localhost:7070/api
```

2. Create `api/.env` and define these variables:
```
DB_PASS=[Database password]
DB_USER=[Database username]
DB_HOST=[Database host]
DB_NAME=[Database name]

FIREBASE_PRIVATE_KEY_ID=[Firebase project private key ID]
FIREBASE_PRIVATE_KEY=[Firebase project private key wrapped in double quotes]
FIREBASE_CLIENT_EMAIL=[Firebase client email]
FIREBASE_CLIENT_ID=[Firebase client ID
FIREBASE_CLIENT_CERT_URL[Firebase client cert URL]
FIREBASE_AUTH_PROVIDER_CERT_URL=[Firebase auth provider cert URL]
```
5. Install [FFmpeg](https://ffmpeg.org/)
6. Run `npm run dev` inside `api`
7. Run `npm start` inside `client`
