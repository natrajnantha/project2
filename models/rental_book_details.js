module.exports = function (sequelize, DataTypes) {
    var Rental_book_details = sequelize.define("Rental_book_details", {
        isbn: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [30]
            }
        },
        title: {
            type: DataTypes.TEXT,
            allowNull: false,
            len: [50]
        },
        book_summary: {
            type: DataTypes.TEXT,
            allowNull: false,
            len: [300]
        },

        edition_number: {
            type: DataTypes.TEXT,
            allowNull: false,
            len: [5]
        },

        rack_location: {
            type: DataTypes.STRING,
            allowNull: false,
            len: [50]
        },
        stock_status: {
            type: DataTypes.STRING,
            allowNull: false,
            len: [50]
        },
        category: {
            type: DataTypes.STRING,
            allowNull: false,
            len: [50]
        }

    });

    Rental_book_details.associate = function (models) {
        Rental_book_details.hasMany(models.Member_rental_info);
    };

    return Rental_book_details;
};
