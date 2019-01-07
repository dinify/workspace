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
        message: "The token is invalid"
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
        let uid = decodedToken.uid;
        // TODO: fetch user profile from database
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
    admin.auth().getUser(request.params.uid)
      .then(userRecord => {
        if (request.locals.user.uid === request.params.uid) response.json(userRecord);
        else response.json({
          email: userRecord.email,
          displayName: userRecord.displayName,
          photoURL: userRecord.photoURL,
          providerData: userRecord.providerData,
        });
      })
      .catch(error => {
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
