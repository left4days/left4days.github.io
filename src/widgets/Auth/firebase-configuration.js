import React from 'react';
import firebase from 'firebase';
import { Redirect } from 'react-router-dom';
import { getAllUrlParams } from './helpers';

const PROVIDERS = {
    google: new firebase.auth.GoogleAuthProvider(),
    facebook: new firebase.auth.FacebookAuthProvider(),
    twitter: new firebase.auth.TwitterAuthProvider(),
};

export function registerUser(login, email, password, registerBy) {
    return firebase.auth().createUserWithEmailAndPassword(email, password);
}

export function loginUser(email, password) {
    return firebase.auth().signInWithEmailAndPassword(email, password);
}

export function signOutUser() {
    return firebase.auth().signOut();
}

export function resetUser(email) {
    return firebase.auth().sendPasswordResetEmail(email);
}

export function signWithSocial(type) {
    console.log(type);
    if (type === 'vk') {
        return signInWithVK();
    }
    firebase.auth().signInWithPopup(PROVIDERS[type]);
}

export function signInWithVK() {
    const clientId = '6916700';
    const redirectUri = 'localhost:3000';
    const url = `https://oauth.vk.com/authorize?client_id=${clientId}&scope=email&redirect_uri=${redirectUri}&response_type=token`;

    const newWin = window.open(url, 'vk-login', 'width=665,height=370');
    newWin.onload = function() {
        let hash = newWin.location.hash;
        const { access_token } = getAllUrlParams(hash);
        if (access_token) {
            return firebase.auth().signInWithCustomToken(access_token);
        }
    };
}
