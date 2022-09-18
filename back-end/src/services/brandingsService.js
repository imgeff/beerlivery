const { branding }  = require('../database/models');

const getAll = async () => {
  const allBrandings = await branding.findAll();
  return allBrandings;
}

module.exports = {
  getAll,
}
