module.exports = function(sequelize, DataTypes) {
    var Users = sequelize.define("Users", {
      username: DataTypes.STRING,
      password: DataTypes.STRING
    });
  
    Users.associate = (models) => {
      Users.belongsToMany(models.Events, {
        through: {model: models.UsersEvents}
      });
    }
  
    return Users;
  }
  