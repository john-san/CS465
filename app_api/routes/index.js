const express = require("express");
const router = express.Router();

const tripsController = require("../controllers/trips");

// router.get("/trips", tripsController.tripsList);
router
  .route('/trips')
  .get(tripsController.tripsList)
  .post(tripsController.tripsAddTrip);

// router.get("/trips/:tripCode", tripsController.tripsFindByCode);
router
  .route('/trips/:tripCode')
  .get(tripsController.tripsFindByCode)
  .put(tripsController.tripsUpdateTrip)
  .delete(tripsController.tripsDeleteTrip)

module.exports = router;