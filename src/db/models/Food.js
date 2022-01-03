const { Model, DataTypes } = require("sequelize");

//using extending Model to init
module.exports = (sequelize) => {
  class Food extends Model { }

  Food.init(
    {
      // Model attributes(屬性) are defined here
      foodId: {
        field: "food_id",
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      type: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      createdAt: {
        field: "created_at",
        defaultValue: DataTypes.NOW,
        type: DataTypes.DATE,
        allowNull: false,
      },
      updatedAt: {
        field: "updated_at",
        defaultValue: DataTypes.NOW,
        type: DataTypes.DATE,
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: "foods",
      modelName: "Food",
      //createdAt: "created_at",
      //updatedAt: "updated_at",
    }
  );

  return Food;
};
