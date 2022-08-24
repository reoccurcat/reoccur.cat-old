import createServer from '@tomphttp/bare-server-node';
import http from 'http';
import nodeStatic from 'node-static';

import * as config from './config.json';

process.env.CLIENT_ID = config.GOOGLE_CLIENT_ID
process.env.CLIENT_SECRET = config.GOOGLE_CLIENT_SECRET

import express from "express";
import bodyParser from "body-parser";
import ejs from "ejs";
import mongoose from "mongoose";
import session from 'express-session';
import passport from "passport";
import passportLocalMongoose from "passport-local-mongoose";
import GoogleStrategy from 'passport-google-oauth20';
import findOrCreate from 'mongoose-findorcreate';

passport.serializeUser(function(user, done) {
    done(null, user.id);
});passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
        done(err, user);
    });
});


const userSchema = new mongoose.Schema ({

    googleId: String
});
userSchema.plugin(findOrCreate);const User = new mongoose.model("User", userSchema);
passport.use(new GoogleStrategy.Strategy({
        clientID: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        callbackURL: "http://localhost:3000/callback/url",
        userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo"
    },
    function(accessToken, refreshToken, profile, cb) {
        console.log(profile);User.findOrCreate({ googleId: profile.id }, function (err, user) {
            return cb(err, user);
        });
    }
));

const bare =  createServer('/bare/');
const serve = new nodeStatic.Server('public/');

const server = http.createServer();

server.on('request', (req, res) => {
    console.log(req['url'])
    if (bare.shouldRoute(req)) {
        bare.routeRequest(req, res).then();
    } else if (req.url === '/auth') {
        passport.authenticate('google', { scope: ['profile'] })
    } else {
        serve.serve(req, res);
    }
});

server.on('upgrade', (req, socket, head) => {
    if (bare.shouldRoute(req, socket, head)) {
        bare.routeUpgrade(req, socket, head).then();
    }else{
        socket.end();
    }
});

server.listen({
    port: process.env.PORT || 8090,
});