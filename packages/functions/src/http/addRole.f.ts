import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

const db = admin.firestore();

exports = module.exports = functions
.region('europe-west1')
.https.onRequest((req, res) => {
  const { role, user_id } = req.body;
    if (role !== undefined && user_id !== undefined) {
      const uid = req.body.user_id;
      const newRole: any = req.body.role;
      admin.auth().getUser(uid)
        .then((userRecord: any) => {
          const claims: any = userRecord.customClaims;
          if (claims) {
            let roles: any[] = [];
            if (claims.roles !== undefined && claims.roles.length > 0) roles = claims.roles;

            roles.push(newRole);

            admin.auth().setCustomUserClaims(uid, {
              ...claims,
              roles
            })
            .then((response) => {
              res.status(200).send({
                ...claims,
                roles
              });
            })
            .catch((err) => {
              res.status(400).send({
                code: "role-error",
                message: "Role addition failed",
                error: err
              });
            });
          }
        }).catch(error => {
          res.status(400).json(error);
        });
    }
    else res.status(400).send({
      code: "required-missing",
      message: "Required request body parameters: role"
    });
});
