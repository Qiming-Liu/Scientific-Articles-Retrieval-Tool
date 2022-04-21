const { Neo4jQuery } = require('@services/Public');

export default async (req, res) => {
  const { keyword } = req.query;
  const data = await Neo4jQuery('1000', keyword);
  res.statusCode = 200;
  res.json(data.data);
};
