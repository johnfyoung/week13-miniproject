const router = require("express").Router();
const { Traveller, Trip, Location } = require("../../models");

router.post("/", async (req, res) => {
  try {
    const newTrip = await Trip.create(req.body);
    res.status(200).json(newTrip);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const deletedTripCount = await Trip.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (deletedTripCount) {
      res.status(200).json(deletedTripCount);
    } else {
      res.status(404).json({ message: "No trip was found with this ID" });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
