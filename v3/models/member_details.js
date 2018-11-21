module.exports = function (sequelize, DataTypes) {
  var Member_details = sequelize.define("Member_details", {
    first_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [1, 50],
          msg: 'Please enter a valid First Name'
        },
      }
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [1, 50],
          msg: 'Please enter a valid Last Name'
        },
      }
    },
    date_of_birth: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      validate: {
        len: {
          args: [1, 10],
          msg: 'Please enter a valid Date of birth'
        },
      }
    },
    address_line1: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [1, 150],
          msg: 'Please enter a valid Address line 1'
        },
      }
    },
    address_line2: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        len: {
          args: [0, 150],
          msg: 'Please enter a valid Address line 2'
        },
      }
    },
    address_line3: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        len: {
          args: [0, 100],
          msg: 'Please enter a valid Address line 3'
        },
      }
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [1, 50],
          msg: 'Please enter a valid City Name'
        },
      }
    },
    state: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [1, 2],
          msg: 'Please select a valid state code'
        },
      }
    },
    zipcode: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [1, 9],
          msg: 'Please enter a valid zipcode'
        },
      }
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        len: {
          args: [0, 10],
          msg: 'Please enter a valid Phone number'
        },
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        len: {
          args: [0, 50],
          msg: 'Please enter a valid email id'
        },
      }
    },
    date_of_join: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      validate: {
        len: {
          args: [1, 10],
          msg: 'Please enter a valid join date'
        },
      }
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      len: [15],
    }
  },{
    freezeTableName: true
  });

  Member_details.associate = function (models) {
    Member_details.hasMany(models.Member_rental_info);
  };

  return Member_details;
};
