const admin = require('firebase-admin');
const uuid4 = require('uuid4');

const projectID = 'gif-sharer';

// For some reason, heroku needs JSON.parse,
// local throws SyntaxError with same .env value ¯\_(ツ)_/¯
let privateKey;

try {
  privateKey = JSON.parse(process.env.FIREBASE_PRIVATE_KEY);
} catch(err) {
  privateKey = process.env.FIREBASE_PRIVATE_KEY;
}

// Setup firebase admin
admin.initializeApp({
  credential: admin.credential.cert({
    type: 'service_account',
    project_id: projectID,
    private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
    private_key: privateKey,
    client_email: process.env.FIREBASE_CLIENT_EMAIL,
    client_id: process.env.FIREBASE_CLIENT_ID,
    auth_provider_x509_cert_url: process.env.FIREBASE_AUTH_PROVIDER_CERT_URL,
    client_x509_cert_url: process.env.FIREBASE_CLIENT_CERT_URL,

    token_uri: 'https://oauth2.googleapis.com/token',
    auth_uri: 'https://accounts.google.pcom/o/oauth2/auth',
  }),

  storageBucket: `${projectID}.appspot.com`
});

// Get firebase bucket reference
const bucket = admin.storage().bucket();

const uploadGIF = (file) => {
  return new Promise((resolve, reject) => {
    const fileName = uuid4();
    console.log('Will upload to firebase');

    // Upload new file to firebase
    bucket.upload(file, {
      destination: fileName,
      public: true,
      metadata: { contentType: 'image/gif' }
    }, (err) => {
      if (err) reject(err);

      console.log('Uploaded successfully');
      const baseURL = 'https://storage.googleapis.com/';

      resolve(`${baseURL}${bucket.id}/${fileName}`);
    });
  })
}

module.exports = {
  uploadGIF
}