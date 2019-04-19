import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

exports = module.exports = functions
.region('europe-west1')
.https.onRequest((req, res) => {
    if (req.body.roles !== null && req.body.roles !== undefined && req.body.user_id) {
        return admin.auth().setCustomUserClaims(req.body.user_id, {
            roles: req.body.roles
        })
        .then((response) => {
          return res.status(200).send(response);
        })
        .catch((err) => {
          return res.status(400).send({
              code: "assign-error",
              message: "Role assignment failed",
              error: err
          });
        });
    }
    return res.status(400).send({
        code: "required-missing",
        message: "Required request body parameters: roles"
    });
});
