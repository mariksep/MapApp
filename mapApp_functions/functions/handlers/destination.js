/* eslint-disable promise/always-return */
const { db } = require("../util/admin");

// get all destinations
exports.getAllDestinations = (req, res) => {
  db.collection("destination")
    .get()
    .then((data) => {
      let destination = [];
      data.forEach((doc) => {
        destination.push({
          destinationId: doc.id,
          handle: doc.data().handle,
          coords: doc.data().coords,
          destinationName: doc.data().destinationName,
        });
      });
      return res.json(destination);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: err.code });
    });
};

// get one destinations
exports.getDestination = (req, res) => {
  let destinationData = {};
  db.doc(`/destination/${req.params.destinationId}`)
    .get()
    .then((doc) => {
      if (!doc.exists) {
        return res.status(404).json({ error: "destination not found" });
      }
      destinationData = doc.data();
      destinationData.destinationId = doc.id;
      return db
        .collection("attraction")
        .where("destinationId", "==", req.params.destinationId)
        .get();
    })
    .then((data) => {
      destinationData.attractions = [];
      data.forEach((doc) => {
        destinationData.attractions.push(doc.data());
      });
      return res.json(destinationData);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: err.code });
    });
};
//post destination
exports.postOneDestination = (req, res) => {
  const newDestination = {
    coords: req.body.coords,
    handle: req.user.handle,
    destinationName: req.body.destinationName,
  };
  db.collection("destination")
    .add(newDestination)
    .then((data) => {
      const resDestination = newDestination;
      resDestination.destinationId = data.id;
      res.json(resDestination);
    })
    .catch((err) => {
      res.status(500).json({ error: "something went wrong" });
      console.error(err);
    });
};
//posting attraction
exports.attractionOnDestination = (req, res) => {
  const newAttraction = {
    type: req.body.type,
    address: req.body.address,
    name: req.body.name,
    coords: req.body.coords,
    destinationId: req.params.destinationId,
  };
  db.doc(`/destination/${req.params.destinationId}`)
    .get()
    .then((doc) => {
      if (!doc.exists) {
        return res.status(404).json({ error: "Destination not found" });
      }
    })
    .then(() => {
      res.json(newAttraction);
    })
    .then(() => {
      return db.collection("attraction").add(newAttraction);
    })
    .then(() => {
      res.json(newAttraction);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: "Something went wrong" });
    });
};
