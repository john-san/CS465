const mongoose = require("mongoose")
const Model = mongoose.model("trips")

// GET: /trips - lists all the trips
const tripsList = async (req, res) => {
  Model.find({}).exec((err, trips) => {
    if (!trips) {
      return res.status(404).json({ "message": "trips not found" })
    } else if (err) {
      return res.status(404).json(err)
    } else {
      return res.status(200).json(trips)
    }
  });
}

// GET: /trips/:tripCode - returns a single trip
const tripsFindByCode = async (req, res) => {
  Model.find({ code: req.params.tripCode }).exec((err, trip) => {
    if (!trip) {
      return res.status(404).json({ "message": "trip not found" })
    } else if (err) {
      return res.status(404).json(err)
    } else {
      return res.status(200).json(trip)
    }
  });
}

const tripsAddTrip = async (req, res) => {
  Model.create({
    code: req.body.code,
    name: req.body.name,
    length: req.body.length,
    start: req.body.start,
    resort: req.body.resort,
    perPerson: req.body.perPerson,
    image: req.body.image,
    description: req.body.description,
  }, (err, trip) => {
    if (err) {
      res.status(400).json(err) // bad request, invalid content
    } else {
      res.status(201).json(trip) // created
    }
  })
}

const tripsUpdateTrip = async (req, res) => {
  console.log(req.body);
  Model.findOneAndUpdate({ code: req.params.tripCode }, {
    code: req.body.code,
    name: req.body.name,
    length: req.body.length,
    start: req.body.start,
    resort: req.body.resort,
    perPerson: req.body.perPerson,
    image: req.body.image,
    description: req.body.description,
  }, { new: true })
  .then(trip => {
    if (!trip) {
      return res.status(404).send({
        message: "Trip not found with code " + req.params.tripCode
      });
    }
    res.send(trip);
  }).catch(err => {
    if (err.kind === 'ObjectId') {
      return res.status(404).send({
        message: "Trip not found with code " + req.params.tripCode
      });
    }
    return res.status(500).send({
      message: "Error updating trip with code " + req.params.tripCode
    });
  })

}

const tripsDeleteTrip = async (req, res) => {
	console.log("in tripsDeleteTrip API")

	Model.findOneAndDelete({ code: req.params.tripCode })
		.then((trip) => {
			if (!trip) {
				return res.status(404).send({
					message: "Trip not found with code " + req.params.tripCode,
				})
			}
			res.send(trip)
		})

		.catch((err) => {
			if (err.kind === "ObjectId") {
				return res.status(404).send({
					message: "Trip not found with code " + req.params.tripCode,
				})
			}
			return res.status(500).json(err)
		})
}


module.exports = {
  tripsList,
  tripsFindByCode,
  tripsAddTrip,
  tripsUpdateTrip,
  tripsDeleteTrip,
};