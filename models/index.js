const Traveller = require("./Traveller");
const Location = require("./Location");
const Trip = require("/Tips");

Traveller.belongsToMany(Location, {
  through: {
    model: Trip,
    unique: false,
  },
  as: "planned_trips",
});

Location.belongsToMany(Traveller, {
  through: {
    model: Trip,
    unique: false,
  },
  as: "location_travellers",
});

module.exports = { Traveller, Location, Trip };
