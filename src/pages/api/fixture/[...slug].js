export default async function handler(req, res) {
  const [owner, repo] = req.query.slug;

  const json = await import(`./data/${owner}_${repo}.json`);
  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Cache-Control', 'public, max-age=86400, s-maxage=86400');
  res.send(JSON.stringify(json));
}
