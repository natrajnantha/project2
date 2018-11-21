module.exports = function (sequelize, DataTypes) {
    var Rental_book_details = sequelize.define("Rental_book_details", {
        isbn: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: {
                    args: [1, 30],
                    msg: 'Please enter a valid isbn'
                },
            }
        },
        title: {
            type: DataTypes.TEXT,
            allowNull: false,
            validate: {
                len: {
                    args: [1, 50],
                    msg: 'Please enter a valid book title'
                },
            }
        },
        book_summary: {
            type: DataTypes.TEXT,
            allowNull: false,
            validate: {
                len: {
                    args: [1, 300],
                    msg: 'Please enter a valid book summary'
                },
            }
        },

        edition_number: {
            type: DataTypes.TEXT,
            allowNull: false,
            validate: {
                len: {
                    args: [1, 5],
                    msg: 'Please enter a valid edition number'
                },
            }
        },

        rack_location: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: {
                    args: [1, 5],
                    msg: 'Please enter a valid book rack location'
                },
            }
        },
        stock_status: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: {
                    args: [1, 10],
                    msg: 'Please enter a valid book stock status'
                },
            }
        },
        category: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: {
                    args: [1, 50],
                    msg: 'Please enter a valid book category'
                },
            }
        }
    },{
        freezeTableName: true
      });

    Rental_book_details.associate = function (models) {
        Rental_book_details.hasMany(models.Member_rental_info);
    };

    return Rental_book_details;
};