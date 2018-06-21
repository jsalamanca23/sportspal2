module.exports = function(sequelize, DataTypes) {
  var Events = sequelize.define("Events", {
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    location: DataTypes.STRING,
    time: DataTypes.BIGINT
  });

  Events.associate = (models) => {
    Events.belongsToMany(models.Events, {
      as: "Events",
      through: {model: models.UsersEvents}
    });
  }

  return Events;
}
