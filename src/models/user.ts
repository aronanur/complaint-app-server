"use strict";
import { Model, Sequelize } from "sequelize";
import { encryptPassword } from "../utils/Encrypt";

module.exports = (sequelize: Sequelize, DataTypes: any) => {
  class User extends Model {}

  User.init(
    {
      fullname: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      ipUser: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      role: {
        type: DataTypes.ENUM(["admin", "user"]),
        defaultValue: "admin",
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isValidLength(value: string) {
            if (value.length < 6)
              throw new Error("Username minimal 6 karakter");
          },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isValidLength(value: string) {
            if (value.length < 8)
              throw new Error("Password minimal 8 karakter");
          },
        },
      },
    },
    {
      sequelize,
      modelName: "User",
    }
  );

  /** Handle beforeCreate hook to handle user password */
  User.addHook("beforeCreate", (user: User) => {
    const hashedPassword = encryptPassword(user.getDataValue("password"));
    user.setDataValue("password", hashedPassword);
  });

  /** Handle beforeUpdate hook to handle user password */
  User.addHook("beforeUpdate", async (user: User) => {
    if (user.getDataValue("password")) {
      const hashedPassword = encryptPassword(user.getDataValue("password"));
      user.setDataValue("password", hashedPassword);
    }
  });

  return User;
};
