module.exports = function (sequelize, DataTypes) {
    var Category = sequelize.define("Category", {
        id: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [10]
            }
        },
        category_description: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
            len: {
                args: [1, 15],
                msg: "Enter a valid rental status"
              },
            }
        },
    });

    Category.associate = function (models) {
        Category.hasMany(models.Member_rental_info);
    };

    return Category;
};
            

        