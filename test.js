import { ApiRequest, ApiResponse } from '../types';
import { BlocklistRepository, Blocklist } from '../repository';

export async function getAllBlocklists(repo: BlocklistRepository, res: ApiResponse) {
  const all = await repo.getAll();
  return res.json(all);
}

export async function getBlocklistById(id: string, repo: BlocklistRepository, res: ApiResponse) {
  const found = await repo.getById(id);
  if (!found) return res.status(404).send();
  return res.json(found);
}

export async function createBlocklist(body: any, repo: BlocklistRepository, res: ApiResponse) {
  if (!body?.id || !body?.name || !Array.isArray(body?.ips)) {
    return res.status(400).json({ error: 'Missing or invalid fields' });
  }

  const newBlocklist: Blocklist = {
    id: body.id,
    name: body.name,
    ips: body.ips,
  };

  const created = await repo.create(newBlocklist);
  return res.json(created);
}

export async function updateBlocklist(id: string, body: any, repo: BlocklistRepository, res: ApiResponse) {
  const existing = await repo.getById(id);
  if (!existing) return res.status(404).send();

  const merged: Blocklist = {
    ...existing,
    ...body,
    ips: Array.from(new Set([...(existing.ips || []), ...(Array.isArray(body.ips) ? body.ips : [])])),
  };

  const updated = await repo.updateById(id, merged);
  return res.json(updated);
}

export async function deleteBlocklist(id: string, repo: BlocklistRepository, res: ApiResponse) {
  const found = await repo.getById(id);
  if (!found) return res.status(404).send();

  await repo.deleteById(id);
  return res.status(200).send();
}


**************
	import { ApiRequest, ApiResponse } from './types';
import { BlocklistRepository } from './repository';
import {
  getAllBlocklists,
  getBlocklistById,
  createBlocklist,
  updateBlocklist,
  deleteBlocklist
} from './handlers/blocklistHandlers';

export function createHandler(blockListRepository: BlocklistRepository) {
  return async function handler(req: ApiRequest, res: ApiResponse) {
    const { method, params = {}, body = {} } = req;
    const id = params.id;

    try {
      switch (method) {
        case 'GET':
          return id
            ? getBlocklistById(id, blockListRepository, res)
            : getAllBlocklists(blockListRepository, res);

        case 'POST':
          return createBlocklist(body, blockListRepository, res);

        case 'PUT':
          if (!id) return res.status(400).json({ error: 'Missing ID for PUT' });
          return updateBlocklist(id, body, blockListRepository, res);

        case 'DELETE':
          if (!id) return res.status(400).json({ error: 'Missing ID for DELETE' });
          return deleteBlocklist(id, blockListRepository, res);

        default:
          return res.status(405).json({ error: 'Method Not Allowed' });
      }
    } catch (err) {
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  };
}
