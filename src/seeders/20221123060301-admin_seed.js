"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Users",
      [
        {
          fullname: "Arona Nur Tetulis",
          ipUser: "127.0.0.1",
          role: "admin",
          username: "aronatetulis123",
          password:
            "$2a$12$CpjgaWqWrSBS9U4XXnCHM.XqD58X/TpT.FIyohu2DuhNYtXddlo16", // admin123
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("Users", null, {});
  },
};
