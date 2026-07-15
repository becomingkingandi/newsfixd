export default function handler(req, res) {
  const { email, name, source } = req.body || {};

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'POST only' });
  }
  if (!email) {
    return res.status(400).json({ error: 'email required' });
  }

  // Log to Vercel console
  const entry = {
    email,
    name: name || '',
    source: source || 'newsfixd',
    ip: req.headers['x-forwarded-for'] || req.socket.remoteAddress,
    timestamp: new Date().toISOString()
  };
  console.log('SIGNUP:', JSON.stringify(entry));

  // Try internal webhook (non-blocking)
  const https = require('https');
  const data = JSON.stringify(entry);
  const req2 = https.request({
    hostname: '100.121.100.78',
    port: 8088,
    path: '/signup',
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Content-Length': data.length },
    timeout: 3000
  }, (r) => console.log('WEBHOOK:', r.statusCode));
  req2.on('error', () => {}); // silently fail — internal webhook may be unreachable
  req2.write(data);
  req2.end();

  res.status(200).json({ ok: true });
}
