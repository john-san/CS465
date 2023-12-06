const express = require("express");
const router = express.Router();
const { expressjwt: jwt } = require("express-jwt");
const auth = jwt({
  secret: process.env.JWT_SECRET,
  algorithms: ["HS256"],
  userProperty: "payload",
});

const authController = require("../controllers/authentication");
const tripsController = require("../controllers/trips");


router
  .route("/login")
  .post(authController.login);

router
  .route("/register")
  .post(authController.register);

// router.get("/trips", tripsController.tripsList);
router
  .route('/trips')
  .get(tripsController.tripsList)
  .post(auth, tripsController.tripsAddTrip);

// router.get("/trips/:tripCode", tripsController.tripsFindByCode);
router
  .route('/trips/:tripCode')
  .get(tripsController.tripsFindByCode)
  .put(auth, tripsController.tripsUpdateTrip)
  .delete(auth, tripsController.tripsDeleteTrip)

module.exports = router;