import { Redis } from '@upstash/kv'

export const kv = new Redis({
  url: import.meta.env.UPSTASH_REST_URL!,
  token: import.meta.env.UPSTASH_REST_TOKEN!,
})
