import { kv } from '../src/utils/kv'
import type { VercelRequest, VercelResponse } from '@vercel/node'

export default async function handler(_: VercelRequest, res: VercelResponse) {
  const keys = await kv.keys('post:*')
  res.status(200).json({ posts: keys.map(k => k.replace('post:', '')) })
}
