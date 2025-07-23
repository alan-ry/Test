export const config = { runtime: 'edge' };

export default async function handler(req: Request) {
  const url = new URL(req.url);
  const slug = url.searchParams.get('slug');

  const kvURL = process.env.UPSTASH_REST_URL!;
  const kvToken = process.env.UPSTASH_REST_TOKEN!;

  if (req.method === 'GET') {
    if (slug) {
      const res = await fetch(`${kvURL}/get/${slug}`, {
        headers: { Authorization: `Bearer ${kvToken}` }
      });
      const data = await res.json();
      return Response.json(data.result || null);
    } else {
      const res = await fetch(`${kvURL}/keys`, {
        headers: { Authorization: `Bearer ${kvToken}` }
      });
      const data = await res.json();
      return Response.json(data.result || []);
    }
  }

  if (req.method === 'POST') {
    const { title, slug, content } = await req.json();
    return fetch(`${kvURL}/set/${slug}`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${kvToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ title, content })
    });
  }

  if (req.method === 'DELETE' && slug) {
    return fetch(`${kvURL}/del/${slug}`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${kvToken}` }
    });
  }

  return new Response('Unsupported', { status: 405 });
}
