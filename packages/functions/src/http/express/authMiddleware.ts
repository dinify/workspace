import * as passport from "passport";

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
};

export default auth;
