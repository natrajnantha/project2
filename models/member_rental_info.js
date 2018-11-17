module.exports = function(sequelize, DataTypes) {
  var Member_rental_info = sequelize.define("Member_rental_info", {
    date_rented: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [8]
      }
    },
    rental_status: {
      type: DataTypes.TEXT,
      allowNull: false,
      len: [15]
    }
  });

  Member_rental_info.associate = function(models) {
    Member_rental_info.belongsTo(models.Member_details, {foreignKey: 'id'});
  };

  Member_rental_info.associate = function(models) {
    Member_rental_info.belongsTo(models.Rental_book_details, {foreignKey: 'id'});
  };


  return Member_rental_info;
};
