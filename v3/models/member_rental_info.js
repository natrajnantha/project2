module.exports = function (sequelize, DataTypes) {
  var Member_rental_info = sequelize.define("Member_rental_info", {
    date_rented: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        len: {
          args: [1, 8],
        },
      }
    },

    date_returned: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        len: {
          args: [1, 8],
        },
      }
    },

    return_due_date: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        len: {
          args: [1, 8],
          msg: 'Please enter a valid return date'
        },
      }
    },

    rental_extension_count: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [1, 2],
        },
      }
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
    // Member_rental_info.belongsTo(models.Member_details, { foreignKey: 'id' });
    Member_rental_info.belongsTo(models.Member_details);
    Member_rental_info.belongsTo(models.Rental_book_details);
  };

  // Member_rental_info.associate = function (models) {
    // Member_rental_info.belongsTo(models.Rental_book_details, { foreignKey: 'id' });
  //   Member_rental_info.belongsTo(models.Rental_book_details);
  // };


  return Member_rental_info;
};