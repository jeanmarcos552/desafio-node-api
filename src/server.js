import http from 'node:http';
import { json } from './middlewares/json.js';
import { routes } from './routes.js';
import { extractQueryParam } from './utils/extract-query-param.js';

const server = http.createServer((req, res) => {
  const { url, method } = req;

  json(req, res);

  const currentRoute = routes.find((route) => {
    return route.method === method && route.path.test(url);
  });

  if (currentRoute) {
    const paramsRoute = req.url.match(currentRoute.path);
    const { query, ...params } = paramsRoute.groups;

    req.query = query ? extractQueryParam(query) : {};
    req.params = params;

    return currentRoute?.handler(req, res);
  }
  return res.writeHead(404).end();
});

server.listen(3333);
