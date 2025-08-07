import { ApiRequest, ApiResponse } from "./types";
import { BlocklistRepository, Blocklist } from "./repository";

export function createHandler(blockListRepository: BlocklistRepository) {
  /**
   * Handles requests to /api/blocklists/
   * 
   * @param {ApiRequest} req - incoming request
   * @param {ApiResponse} res - response object
   * 
   * @returns {void|Promise<void>}
   */
  async function handler(req: ApiRequest, res: ApiResponse) {
    const { method, params = {}, body = {} } = req;
    const id = params.id;

    try {
      switch (method) {
        case 'GET':
          if (id) {
            const blocklist = await blockListRepository.getById(id);
            if (!blocklist) return res.status(404).send();
            return res.json(blocklist);
          } else {
            const all = await blockListRepository.getAll();
            return res.json(all);
          }

        case 'POST':
          if (!body.id) {
            body.id = `${Date.now()}`
          }
          if (!body.id || !body.name || !Array.isArray(body.ips)) {
            return res.status(400).json({ error: 'Missing or invalid fields' });
          }

          const newBlocklist: Blocklist = {
            id: body.id,
            name: body.name,
            ips: body.ips,
          };

          const created = await blockListRepository.create(newBlocklist);
          return res.status(201).json(created);

        case 'PUT':
          const found = await blockListRepository.getById(params.id);
          if (!found) return res.status(404).json({})
          const merged = {
            ...found,
            ips: Array.from(new Set([...found.ips, ...(body.ips || [])]))
          }
          const updated = await blockListRepository.updateById(params.id, merged);
          return res.json(updated);


        case 'DELETE':
          if (!id) return res.status(400).json({ error: 'Missing ID for delete' });

          const toDelete = await blockListRepository.getById(id);
          if (!toDelete) return res.status(404).send();

          await blockListRepository.deleteById(id);
          return res.status(200).send();

        default:
          return res.status(405).json({ error: 'Method Not Allowed' });
      }
    } catch (err) {
      return res.status(500).json({ error: 'Internal Server Error' })
    }
  }

  return handler;
}
