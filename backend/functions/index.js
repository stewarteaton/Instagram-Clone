require('dotenv').config();

const functions = require('firebase-functions');
const admin = require('firebase-admin');

const adminConfig = {
    credential: admin.credential.cert({
        "type": "service_account",
        "project_id": "insta-clone-57141",
        "private_key_id": process.env.PRIVATE_KEY_ID,
        "private_key": process.env.PRIVATE_KEY,
        "client_email": process.env.CLIENT_EMAIL,
        "client_id": process.env.CLIENT_ID,
        "auth_uri": process.env.AUTH_URI,
        "token_uri": process.env.TOKEN_URI,
        "auth_provider_x509_cert_url": process.env.AUTH_PROVIDER,
        "client_x509_cert_url": process.env.CLIENT_CERT
      }),
      databaseURL: "https://socialweb-4fb98.firebaseio.com"
}
admin.initializeApp(adminConfig);

const db = admin.firestore();


const firebase = require('firebase');
var firebaseConfig = {
    apiKey: process.env.API_KEY,
    authDomain: process.env.AUTH_DOMAIN,
    databaseURL: process.env.DATABASE_URL,
    projectId: process.env.PROJECT_ID,
    storageBucket: process.env.STORAGE_BUCKET,
    messagingSenderId: process.env.MESSAGE_SENDER_ID,
    appId: process.env.APP_ID
  };
firebase.initializeApp(firebaseConfig);

const express = require('express');
const app = express();


const { validateSignupData, validateLoginData, reduceUserDetails } = require('./validators');


app.post('/signup', (req, res) => {
    if (req.body.email.trim() === '') {
        return res.status(400).json({ body: 'Body must not be empty'});
    }

    const newUser = {
        email: req.body.email,
        password: req.body.password
    };

    const { valid , errors } = validateSignupData(newUser);
    if (!valid) return res.status(400).json(errors);


        let token, userID;
        db.doc(`/users/${newUser.email}`).get()
        .then(doc => {
            if(doc.exists){
                return res.status(400).json({ error: "This email is already in use" });
            } else {
                res.json({confirmation: 'Success!', data: doc });
                return firebase.auth().createUserWithEmailAndPassword(newUser.email, newUser.password);
            }
        })
        .then(data => {
            userID = data.user.uid;
            return data.user.getIdToken();
        })
        .then((idToken) => {
            token = idToken;
            const userCredentials = {
                password: newUser.password,
                userID
            };
            // returns a promise and sets user
            return db.doc(`/users/${newUser.email}`).set(userCredentials);
        })
        // r
        .then(() => {
            return res.status(201).json( { token } );
        })
        .catch(error => {
            res.status(500).json({ error: 'something went wrong' });
            console.error(error.message);  
        })
});

exports.api = functions.https.onRequest(app);