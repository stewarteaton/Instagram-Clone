const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp();

const express = require('express');
const app = express();

const db = admin.firestore();


app.post('/signup', (req, res) => {
    if (req.body.login.trim() === '') {
        return res.status(400).json({ body: 'Body must not be empty'});
    }

    const newUser = {
        login: req.body.login,
        password: req.body.password
    };

    db.collection('users').add(newUser)
        .then(doc => {
            const response = newUser;
            // you can edit a key in a const, but cannot change data type
            response.ID = doc.id;
            res.json({confirmation: 'Success!', data: doc });
        })
        .catch(error => {
            res.status(500).json({ error: 'something went wrong' });
            console.error(error.message);  
        })
});

exports.api = functions.https.onRequest(app);