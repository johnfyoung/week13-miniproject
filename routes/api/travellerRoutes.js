const router = require("express").Router();
const { Traveller, Trip, Location } = require("../../models");

router.get("/", async (req, res) => {
  try {
    const travellers = await Traveller.findAll();
    res.status(200).json(travellers);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const traveller = await Traveller.findByPk(req.params.id, {
      include: [{ model: Location, as: "planned_trips" }],
    });

    if (!traveller) {
      res.status(404).json({ message: "No traveller found for this id" });
      return;
    }

    res.status(200).json(traveller);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/", async (req, res) => {
  try {
    const newTraveller = await Traveller.create(req.body);
    res.status(200).json(newTraveller);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const deletedTraveller = await Traveller.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (deletedTraveller) {
      res.status(200).json(deletedTraveller);
    } else {
      res.status(404).json({ message: "No traveller was found with this ID" });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
