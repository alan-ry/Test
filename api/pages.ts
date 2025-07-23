export const config = { runtime: 'edge' };

export default async function handler(req: Request) {
  const url = new URL(req.url);
  const page = url.searchParams.get('page');

  const kvURL = process.env.UPSTASH_REST_URL!;
  const kvToken = process.env.UPSTASH_REST_TOKEN!;

  if (!page) return new Response('Missing page param', { status: 400 });

  if (req.method === 'GET') {
    const res = await fetch(`${kvURL}/get/page:${page}`, {
      headers: { Authorization: `Bearer ${kvToken}` }
    });
    const data = await res.json();
    return Response.json(data.result || null);
  }

  if (req.method === 'POST') {
    const { title, content } = await req.json();
    return fetch(`${kvURL}/set/page:${page}`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${kvToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ title, content })
    });
  }

  return new Response('Unsupported', { status: 405 });
}
