const model = require('../models/indexmodel');
const controller = {};


controller.retrieveAll = async (req, res) => {
    try {
      const dosen = await model.lecturers.findAll();
      res.json(dosen);
    } catch (error) {
      res.json({ message: error.message });
    }
  };

module.exports = controller;