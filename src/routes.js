import { randomUUID } from 'node:crypto';
import { Database } from './database.js';
import { buildRoutePath } from './utils/build-route-path.js';
import { format } from 'date-fns';

const database = new Database();

export const routes = [
  {
    method: 'POST',
    path: buildRoutePath('/tasks'),
    handler: (req, res) => {
      const { title, description } = req.body;

      const user = {
        id: randomUUID(),
        title,
        description,
        completed_at: null,
        created_at: format(new Date(), 'yyyy-MM-dd HH:mm:ss.SSS'),
        updated_at: null,
      };

      database.insert('tasks', user);

      return res.writeHead(201).end();
    },
  },
  {
    method: 'GET',
    path: buildRoutePath('/tasks'),
    handler: (req, res) => {
      const { search } = req.query;

      const paramsSearch = search
        ? {
            title: search,
            description: search,
          }
        : null;

      const tasks = database.select('tasks', paramsSearch);
      return res.end(JSON.stringify(tasks));
    },
  },
  {
    method: 'PUT',
    path: buildRoutePath('/tasks/:id'),
    handler: (req, res) => {
      const { id } = req.params;
      const { title, description } = req.body;

      database.update('tasks', id, {
        title,
        description,
        updated_at: format(new Date(), 'yyyy-MM-dd HH:mm:ss.SSS'),
      });

      return res.writeHead(204).end();
    },
  },
  {
    method: 'DELETE',
    path: buildRoutePath('/tasks/:id'),
    handler: (req, res) => {
      const { id } = req.params;
      database.delete('tasks', id);
      return res.writeHead(204).end();
    },
  },
  {
    method: 'PATCH',
    path: buildRoutePath('/tasks/:id/complete'),
    handler: (req, res) => {
      const { id } = req.params;
      // const { completed_at } = req.body;

      database.update('tasks', id, {
        completed_at: format(new Date(), 'yyyy-MM-dd HH:mm:ss.SSS'),
      });

      return res.writeHead(204).end();
    },
  },
];
