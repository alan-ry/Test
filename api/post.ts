import { kv } from '../src/utils/kv'
import type { VercelRequest, VercelResponse } from '@vercel/node'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const { title, content } = req.body
  if (!title || !content) return res.status(400).json({ error: 'Invalid data' })

  const key = `post:${title}`
  await kv.set(key, content)

  return res.status(200).json({ message: 'Saved' })
}

