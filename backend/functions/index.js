require('dotenv').config();

const functions = require('firebase-functions');
const admin = require('firebase-admin');

const serviceAccount = require('./serviceAccount');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://insta-clone-57141.firebaseio.com"
});

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
                // res.json({confirmation: 'Success!', data: doc });
                // res.json({confirmation: 'Success!', });
                // console.log(newUser.email + ' ' + newUser.password);
                console.log('Success');
                return firebase.auth().createUserWithEmailAndPassword(newUser.email, newUser.password);
            }
        })
        .then(data => {
            userID = data.user.uid;
            res.json({confirmation: 'Success!' });
            return data.user.getIdToken();
        })
        .then((idToken) => {
            token = idToken;
            const userCredentials = {
                password: newUser.password,
                createdAt: new Date().toISOString(),
                userID
            };
            // returns a promise and sets user
            return db.doc(`/users/${newUser.email}`).set(userCredentials);
        })
        .then(() => {
            return res.status(201).json( { token } );
        })
        .catch(error => {
            console.error(error.message);  
            res.status(500).json({ error: 'something went wrong' });
        })
});

app.post('/login', (req, res) => {
    const user = {
        email: req.body.email,
        password: req.body.password,
    };

    const { valid , errors } = validateLoginData(user);
    if (!valid) return res.status(400).json(errors);
    
    firebase.auth().signInWithEmailAndPassword(user.email, user.password)
        .then(data => {
            res.json({confirmation: 'Success!' });
            return data.user.getIdToken();
        })
        .then(token => {
            return res.json({token});
        }) 
        .catch(error => {
            console.log(error);
            // can implement auth/wrong-password & auth/user-not-user
            return res.status(403).json({ error: "Wrong username/password, please try again" });
        });
})

exports.api = functions.https.onRequest(app);