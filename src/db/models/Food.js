const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  class Food extends Model {}

  Food.init(
    {
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
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  );

  return Food;
};
