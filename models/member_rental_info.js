module.exports = function (sequelize, DataTypes) {
  var Member_rental_info = sequelize.define("Member_rental_info", {
    date_rented: {
      type: DataTypes.DATE,
      allowNull: false,
    },

    date_returned: {
      type: DataTypes.DATE,
      allowNull: false,
    },

    return_due_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },

    rental_extension_count: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    rental_status: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [1, 15],
          msg: "Enter a valid rental status"
        },
      }
    } 
  }, {
    freezeTableName: true
  });

  Member_rental_info.associate = function (models) {
    Member_rental_info.belongsTo(models.Member_details);
    Member_rental_info.belongsTo(models.Rental_book_details);
  };


  return Member_rental_info;
};