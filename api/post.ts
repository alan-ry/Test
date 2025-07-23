import { kv } from '../src/utils/kv.ts';
import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') return res.status(405).end();

  const { title, content } = req.body;
  if (!title || !content) return res.status(400).json({ error: 'Invalid data' });

  await kv.set(`post:${title}`, content);
  res.status(200).json({ message: 'Saved' });
}

