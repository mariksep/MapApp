const functions = require("firebase-functions");
const app = require("express")();
const cors = require("cors");

const FBAuth = require("./util/fbAuth");

app.use(cors());

const { signUp, logIn, getAuthenticatedUser } = require("./handlers/users");
const {
  getAllDestinations,
  getDestination,
  postOneDestination,
  attractionOnDestination,
  deleteAttraction,
} = require("./handlers/destination");

/*USER routes*/

//singup
app.post("/signup", signUp);
//login
app.post("/login", logIn);
//get own users info
app.get("/user", FBAuth, getAuthenticatedUser);

/*DESTINATION routes */

//get all destinations
app.get("/destinations", getAllDestinations);
//get one destination
app.get("/destination/:destinationId", getDestination);
//post one scream
app.post("/destination", FBAuth, postOneDestination);
//post attraction
app.post(
  "/destination/:destinationId/attraction",
  FBAuth,
  attractionOnDestination
);

exports.api = functions.region("europe-west1").https.onRequest(app);
