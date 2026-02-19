export default async function handler(req, res) {
  const code = req.query.code;
  if (!code) {
    return res.status(400).send('Missing code parameter');
  }

  const response = await fetch('https://github.com/login/oauth/access_token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify({
      client_id: process.env.GITHUB_CLIENT_ID,
      client_secret: process.env.GITHUB_CLIENT_SECRET,
      code
    })
  });

  const data = await response.json();
  const token = data.access_token;
  const provider = 'github';

  const body = `<!DOCTYPE html><html><body><script>
(function() {
  function receiveMessage(e) {
    window.opener.postMessage(
      'authorization:${provider}:success:${JSON.stringify({ token, provider })}',
      e.origin
    );
    window.removeEventListener("message", receiveMessage, false);
  }
  window.addEventListener("message", receiveMessage, false);
  window.opener.postMessage("authorizing:${provider}", "*");
})();
</script></body></html>`;

  res.status(200).setHeader('Content-Type', 'text/html').send(body);
}
