module.exports = (sequelize, DataTypes) => {
	let Band = sequelize.define("Band", {
		//timestamps: false,
		bandName: {
			type: DataTypes.STRING,
			unique: true
		},
	});

    Band.associate = function(models) {
        Band.belongsTo(models.User, {
            foreignKey: {
                allowNull: false
            }
        });
    };

	return Band;
}