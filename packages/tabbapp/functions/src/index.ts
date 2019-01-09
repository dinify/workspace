import { Strategy as BearerStrategy } from "passport-http-bearer";
import { AuthedRequest } from "./request";
import * as passport from "passport";
import * as cors from "cors";
import * as bodyParser from "body-parser";
import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import * as express from "express";

admin.initializeApp(functions.config().firebase);

const db = admin.firestore();

const app: express.Application = express();

const auth = (req, res, next) => {
  passport.authenticate("bearer", {session: false}, (err, user, info) => {
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
}

app.use(cors())
app.use(bodyParser.urlencoded({ extended: true, limit:"50mb" }))
app.use(bodyParser.json({ limit: "50mb"}))
app.use(passport.initialize())

passport.use(new BearerStrategy(
  (token, done) => {
    admin.auth().verifyIdToken(token)
      .then(decodedToken => {
        return done(null, decodedToken, { scope: "all" });
      }).catch(err => {
        return done(err);
      });
  }
));

app.get("/", (request, response) => {
  response.sendStatus(200);
})

app.get("/user/:uid",
  (req, res, next) => {
    auth(req, res, next);
  },
  (request: AuthedRequest, response) => {
    if (!request.params.uid) response.sendStatus(400);
    let uid = request.params.uid === 'me' ? request.locals.user.uid : request.params.uid;
    admin.auth().getUser(uid)
      .then(userRecord => {
        db.collection('profiles').doc(uid).get().then(snapshot => {
          let data;
          if (snapshot.exists) data = snapshot.data();
          if (request.locals.user.uid === request.params.uid ||
              request.params.uid === 'me') response.json({
            profile: data,
            ...userRecord
          });
          else response.json({
            profile: data,
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
  }
)
app.post("/user/me",
  (req, res, next) => {
    auth(req, res, next);
  },
  (request: AuthedRequest, response) => {
    const uid = request.locals.user.uid;
    db.collection('profiles').doc(uid).set(request.body).then(writeResult => {
      response.sendStatus(200);
    }).catch(error => {
      response.status(400).json(error);
    });
  }
)
app.use((request, response) => {
  response.status(404).json({code: "not-found", message: "Endpoint not found", path: request.path});
})

/**
* API cloud function
* Note: the name of this variable determines the route of the function
* In this case: /api
*/
export const api = functions.https.onRequest((req, res) => {
	// https://tabb-global.cloudfunctions.net/api
	// without trailing "/" will have req.path = null, req.url = null
	// which won"t match to your app.get("/", ...) route

	if (!req.path) {
		// prepending "/" keeps query params, path params intact
		req.url = `/${req.url}`
	}
  if (req.path.startsWith("/api")) req.url = req.url.slice(4)
	return app(req, res)
});
