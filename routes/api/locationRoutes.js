const router = require("express").Router();
const { Traveller, Trip, Location } = require("../../models");

router.get("/", async (req, res) => {
  try {
    const locations = await Location.findAll();
    res.status(200).json(locations);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const location = await Location.findByPk(req.params.id, {
      include: [{ model: Traveller, as: "location_travellers" }],
    });

    if (!location) {
      res.status(404).json({ message: "No location found for this id" });
      return;
    }

    res.status(200).json(location);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/", async (req, res) => {
  try {
    const newLocation = await Location.create(req.body);
    res.status(200).json(newLocation);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const deletedLocationCount = await Location.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (deletedLocationCount) {
      res.status(200).json(deletedLocationCount);
    } else {
      res.status(404).json({ message: "No location was found with this ID" });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
