/* eslint-disable promise/always-return */
const { admin, db } = require("../util/admin");
const firebase = require("firebase");
const config = require("../util/config");
firebase.initializeApp(config);

const { validateSignupData, validateLoginData } = require("../util/validators");

//signup user

exports.signUp = (req, res) => {
  const newUser = {
    email: req.body.email,
    password: req.body.password,
    confirmPassword: req.body.confirmPassword,
    username: req.body.username,
  };
  const { valid, errors } = validateSignupData(newUser);
  if (!valid) return res.status(400).json(errors);

  let token, userId;
  db.doc(`/users/${newUser.username}`)
    .get()
    .then((doc) => {
      if (doc.exists) {
        return res.status(400).json({ username: "this handle already taken" });
      } else {
        return firebase
          .auth()
          .createUserWithEmailAndPassword(newUser.email, newUser.password);
      }
    })
    .then((data) => {
      userId = data.user.uid;
      return data.user.getIdToken();
    })
    .then((idToken) => {
      token = idToken;
      const userInfo = {
        handle: newUser.username,
        email: newUser.email,
        created: new Date().toISOString(),

        userId,
      };
      return db.doc(`/users/${newUser.username}`).set(userInfo);
    })
    .then(() => {
      return res.status(201).json({ token });
    })

    .catch((err) => {
      console.error(err);
      if (err.code === "auth/email-already-in-use") {
        return res.status(400).json({ message: "Email is already in use" });
      } else {
        return res
          .status(500)
          .json({ message: "Something went wrong, plese try again" });
      }
    });
};

//log in user

exports.logIn = (req, res) => {
  const user = {
    email: req.body.email,
    password: req.body.password,
  };
  const { valid, errors } = validateLoginData(user);
  if (!valid) return res.status(400).json(errors);
  firebase
    .auth()
    .signInWithEmailAndPassword(user.email, user.password)
    .then((data) => {
      return data.user.getIdToken();
    })
    .then((token) => {
      return res.json({ token });
    })
    .catch((err) => {
      console.error(err);

      return res
        .status(403)
        .json({ general: "Something went wrong please try again" });
    });
};

//Get own user details
exports.getAuthenticatedUser = (req, res) => {
  let userData = {};
  db.doc(`/users/${req.user.handle}`)
    .get()
    .then((doc) => {
      if (doc.exists) {
        userData.credentials = doc.data();
        return db
          .collection("destination")
          .where("handle", "==", req.user.handle)
          .get();
      }
    })
    .then((data) => {
      userData.destination = [];
      data.forEach((doc) => {
        userData.destination.push({
          coords: doc.data().coords,
          destinationId: doc.id,
          destinationName: doc.data().destinationName,
          handle: doc.data().handle,
        });
      });
      return res.json(userData);
    })

    .catch((err) => {
      console.error(err);
      return res.status(500).json({ error: err.code });
    });
};
