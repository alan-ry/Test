import { kv } from '../src/utils/kv'
import type { VercelRequest, VercelResponse } from '@vercel/node'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const { title } = req.query
  if (!title) return res.status(400).json({ error: 'No title provided' })

  await kv.del(`post:${title}`)
  res.status(200).json({ message: 'Deleted' })
}
