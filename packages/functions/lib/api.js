"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const passport_http_bearer_1 = require("passport-http-bearer");
const passport = require("passport");
const cors = require("cors");
const bodyParser = require("body-parser");
const express = require("express");
exports.default = (admin) => {
    const db = admin.firestore();
    const app = express();
    const auth = (req, res, next) => {
        passport.authenticate("bearer", { session: false }, (err, user, info) => {
            if (err || !user) {
                return res.status(401).json({
                    code: "unauthorized",
                    message: "The token is invalid",
                    error: err
                });
            }
            if (user && user.uid) {
                req.locals = { user };
                next();
            }
        })(req, res, next);
    };
    app.use(cors());
    app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
    app.use(bodyParser.json({ limit: "50mb" }));
    app.use(passport.initialize());
    passport.use(new passport_http_bearer_1.Strategy((token, done) => {
        admin.auth().verifyIdToken(token)
            .then(decodedToken => {
            return done(null, decodedToken, { scope: "all" });
        }).catch(err => {
            return done(err);
        });
    }));
    app.get("/", (request, response) => {
        response.sendStatus(200);
    });
    app.get("/user/:uid", (req, res, next) => {
        auth(req, res, next);
    }, (request, response) => {
        if (!request.params.uid)
            response.sendStatus(400);
        const uid = request.params.uid === 'me' ? request.locals.user.uid : request.params.uid;
        admin.auth().getUser(uid)
            .then(userRecord => {
            db.collection('profiles').doc(uid).get().then(snapshot => {
                let data;
                if (snapshot.exists)
                    data = snapshot.data();
                if (request.locals.user.uid === request.params.uid ||
                    request.params.uid === 'me')
                    response.json(Object.assign({ profile: data }, userRecord));
                else
                    response.json({
                        profile: data,
                        uid: userRecord.uid,
                        email: userRecord.email,
                        displayName: userRecord.displayName,
                        photoURL: userRecord.photoURL,
                        providerData: userRecord.providerData,
                    });
            });
        })
            .catch(error => {
            response.status(400).json(error);
        });
    });
    app.post("/user/me", (req, res, next) => {
        auth(req, res, next);
    }, (request, response) => {
        const uid = request.locals.user.uid;
        db.collection('profiles').doc(uid).set(request.body).then(writeResult => {
            response.sendStatus(200);
        }).catch(error => {
            response.status(400).json(error);
        });
    });
    app.use((request, response) => {
        response.status(404).json({ code: "not-found", message: "Endpoint not found", path: request.path });
    });
    return app;
};
//# sourceMappingURL=api.js.map