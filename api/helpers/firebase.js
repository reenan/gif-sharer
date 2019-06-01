const admin = require("firebase-admin");
const uuid4 = require('uuid4');

const projectID = 'gif-sharer';

// Setup firebase admin
admin.initializeApp({
  credential: admin.credential.cert({
    type: 'service_account',
    project_id: projectID,
    private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
    private_key: process.env.FIREBASE_PRIVATE_KEY,
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

const uploadGIF = (filePath) => {
  return new Promise((resolve, reject) => {
    const fileName = uuid4();

    console.log('Will upload to firebase');
    // Upload new file to firebase
    bucket.upload(filePath, {
      destination: fileName,
      public: true,
      metadata: { contentType: 'image/gif' }
    }, (err) => {
      if (err) reject(err);

      console.log('Pploaded successfully');
      // Generate a public signed URL with expiration date
      const file = bucket.file(fileName);
      const config = { action: 'read', expires: '03-01-2500' };

      file.getSignedUrl(config, (err, url) => {
        if (err) reject(err);

        resolve(url);
      });
    });
  })
}

module.exports = {
  uploadGIF
}