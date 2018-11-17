module.exports = function(sequelize, DataTypes) {
  var Member_details = sequelize.define("Member_details", {
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING
  });

  Member_details.associate = function(models) {
    Member_details.hasMany(models.Member_rental_info);
  };

  return Member_details;
};
