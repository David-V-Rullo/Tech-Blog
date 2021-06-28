const seedPostData = require('./post-seeds');

const sequelize = require('../config/config');

const seedAll = async () => {
  await sequelize.sync({ force: true });
  console.log('\n----- DATABASE SYNCED -----\n');
  await seedPostData();
  console.log('\n----- Favorite SEEDED -----\n');
  

  process.exit(0);
};

seedAll();