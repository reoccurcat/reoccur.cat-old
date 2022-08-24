import createServer from '@tomphttp/bare-server-node';
import http from 'http';
import nodeStatic from 'node-static';

import * as config from './config.json' assert { type: 'json' };

process.env.CLIENT_ID = config.GOOGLE_CLIENT_ID
process.env.CLIENT_SECRET = config.GOOGLE_CLIENT_SECRET

import passport from "passport";
import GoogleStrategy from 'passport-google-oidc';

passport.use(new GoogleStrategy({
        clientID: process.env['CLIENT_ID'],
        clientSecret: process.env['CLIENT_SECRET'],
        callbackURL: 'https://www.example.com/oauth2/redirect/google'
    },
    function(issuer, profile, cb) {
        db.get('SELECT * FROM federated_credentials WHERE provider = ? AND subject = ?', [
            issuer,
            profile.id
        ], function(err, cred) {
            if (err) { return cb(err); }
            if (!cred) {
                // The Google account has not logged in to this app before.  Create a
                // new user record and link it to the Google account.
                db.run('INSERT INTO users (name) VALUES (?)', [
                    profile.displayName
                ], function(err) {
                    if (err) { return cb(err); }

                    var id = this.lastID;
                    db.run('INSERT INTO federated_credentials (user_id, provider, subject) VALUES (?, ?, ?)', [
                        id,
                        issuer,
                        profile.id
                    ], function(err) {
                        if (err) { return cb(err); }
                        var user = {
                            id: id.toString(),
                            name: profile.displayName
                        };
                        return cb(null, user);
                    });
                });
            } else {
                // The Google account has previously logged in to the app.  Get the
                // user record linked to the Google account and log the user in.
                db.get('SELECT * FROM users WHERE id = ?', [ cred.user_id ], function(err, user) {
                    if (err) { return cb(err); }
                    if (!user) { return cb(null, false); }
                    return cb(null, user);
                });
            }
        })
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