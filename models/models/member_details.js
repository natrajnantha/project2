module.exports = function(sequelize, DataTypes) {
  var Member_details = sequelize.define("Member_details", {
    first_name: DataTypes.STRING, 
        validate: {
          len: [50],
        },
    last_name: DataTypes.STRING,
         validate: {
          len: [50],
    },
    date_of_birth: Date,
        validate: {
          len: [8],
    },
    address_line1: DataTypes.STRING,
        validate: {
          len: [100],
    },      
    address_line2: DataTypes.STRING,
        validate: {
          len: [100],
},         
    address_line3: DataTypes.STRING,
         validate: {
          len: [100],
},      
    city: DataTypes.STRING,
          validate: {
            len: [50],
},      
    state: DataTypes.STRING,
           validate: {
            len: [20],
},    
    zipcode: DataTypes.STRING,
           validate: {
             len: [9],
},    
    phone: DataTypes.STRING,
            validate: {
              len: [10],
},    
    email: DataTypes.STRING,
            validate: {
                len: [25],
},    
    date_of_join: Date,
            validate: {
               len: [8],
},    
    status: DataTypes.STRING,
            validate: {
              len: [.15],
},    


  });

  Member_details.associate = function(models) {
    Member_details.hasMany(models.Member_rental_info);
  };

  return Member_details;
};
