const { resumeData } = require('../../data');

const getData = (req, res) => {
  try {
    res.json(resumeData);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching data', error: error.message });
  }
};

module.exports = { getData };