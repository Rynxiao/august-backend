'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('sense_type', [
      {
        "id" : "82fef430-65fb-4602-bf97-8c75f66b7a46",
        "title" : "生活",
        "createdAt" : "2023-06-05T15:14:06.924Z",
        "updatedAt" : "2023-06-05T15:14:06.924Z"
      },
      {
        "id" : "8d13332b-4656-45e1-b227-9acb2e921a75",
        "title" : "养生",
        "createdAt" : "2023-06-05T15:18:01.975Z",
        "updatedAt" : "2023-06-05T15:18:01.975Z"
      },
      {
        "id" : "6c991995-db50-4657-b872-e3162621d35b",
        "title" : "女人",
        "createdAt" : "2023-06-05T15:22:02.314Z",
        "updatedAt" : "2023-06-05T15:22:02.314Z"
      },
      {
        "id" : "c12d961b-f831-441e-aad5-72d74729d862",
        "title" : "健康",
        "createdAt" : "2023-06-05T15:23:09.201Z",
        "updatedAt" : "2023-06-05T15:23:09.201Z"
      },
      {
        "id" : "d1483344-887a-4882-bc23-e3056ede3991",
        "title" : "急救",
        "createdAt" : "2023-06-05T15:47:42.663Z",
        "updatedAt" : "2023-06-05T15:47:42.663Z"
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('sense_type', null, {});
  }
};
