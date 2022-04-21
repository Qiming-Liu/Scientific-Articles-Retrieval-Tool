const mesh = require('./mesh.json');

export default async (req, res) => {
  const { keyword } = req.query;
  res.statusCode = 200;
  res.json(mesh[keyword]);
};
