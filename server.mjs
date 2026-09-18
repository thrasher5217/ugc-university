import http from 'node:http';
import { readFile } from 'node:fs/promises';

const page = await readFile(new URL('./dist/index.html', import.meta.url));
const port = Number(process.env.PORT || 3000);
http.createServer((req, res) => {
  const path = new URL(req.url, 'http://localhost').pathname;
  if (path !== '/' && path !== '/index.html') {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    return res.end('Not found');
  }
  if (req.method !== 'GET' && req.method !== 'HEAD') {
    res.writeHead(405, { Allow: 'GET, HEAD' });
    return res.end();
  }
  res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
  res.end(req.method === 'HEAD' ? undefined : page);
}).listen(port, '0.0.0.0', () => console.log('Website listening on port ' + port));
