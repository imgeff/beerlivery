const brandingsService = require('../services/brandingsService');

const getAll = async (_req, res) => {
  try {
    const allBrandings = await brandingsService.getAll();
    return res.status(200).json(allBrandings);
  } catch (error) {
    return res.status(500).json(err);
  }
}

module.exports = {
  getAll,
}
