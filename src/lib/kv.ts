const BASE = import.meta.env.UPSTASH_REST_URL;
const TOKEN = import.meta.env.UPSTASH_REST_TOKEN;

async function kvFetch(path: string, opts: any = {}) {
  const headers = {
    Authorization: `Bearer ${TOKEN}`,
    'Content-Type': 'application/json',
    ...(opts.headers || {})
  };
  const res = await fetch(`${BASE}${path}`, { ...opts, headers });
  return res.json();
}

export async function getPost(slug: string) {
  const { result } = await kvFetch(`/get/${slug}`);
  return result;
}

export async function listPosts() {
  const { result } = await kvFetch(`/keys`);
  return result || [];
}

export async function getPage(page: string) {
  const { result } = await kvFetch(`/get/page:${page}`);
  return result;
}
