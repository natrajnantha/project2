module.exports = function (sequelize, DataTypes) {
  var Member_rental_info = sequelize.define("Member_rental_info", {
    date_rented: {
      type: TimeStamped,
      allowNull: false,
      validate: {
        len: {
          args: [1, 8],
        },
      }
    },

    date_returned: {
      type: TimeStamped,
      allowNull: false,
      validate: {
        len: {
          args: [1, 8],
        },
      }
    },

    return_due_date: {
      type: Date,
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
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        len: {
          args: [1, 15],
          msg: "Enter a valid rental status"
        },
      }
    },

    id: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [1, 15],
        },
      }
    },

    book_id: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [1, 8],
        },
      }
    },
  });

  Member_rental_info.associate = function (models) {
    Member_rental_info.belongsTo(models.Member_details, { foreignKey: 'id' });
  };

  Member_rental_info.associate = function (models) {
    Member_rental_info.belongsTo(models.Rental_book_details, { foreignKey: 'id' });
  };


  return Member_rental_info;
};
