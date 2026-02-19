export default function handler(req, res) {
  const clientId = process.env.GITHUB_CLIENT_ID;
  const authUrl = `https://github.com/login/oauth/authorize?client_id=${clientId}&scope=repo`;
  res.redirect(302, authUrl);
}
