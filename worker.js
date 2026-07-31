const jsonHeaders = {
  'content-type': 'application/json;charset=UTF-8',
  'access-control-allow-origin': '*',
  'access-control-allow-headers': 'content-type',
};

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (request.method === 'OPTIONS' && url.pathname === '/api/rsvp') {
      return new Response(null, {
        status: 204,
        headers: {
          ...jsonHeaders,
          'access-control-allow-methods': 'POST, OPTIONS',
        },
      });
    }

    if (request.method === 'POST' && url.pathname === '/api/rsvp') {
      return await handleRsvp(request, env.RSVP_DB);
    }

    return new Response(JSON.stringify({ error: 'Not found' }), {
      status: 404,
      headers: jsonHeaders,
    });
  },
};

async function handleRsvp(request, db) {
  if (!db) {
    return new Response(JSON.stringify({ error: 'Database binding not configured' }), {
      status: 500,
      headers: jsonHeaders,
    });
  }

  let payload;
  try {
    payload = await request.json();
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Invalid JSON payload' }), {
      status: 400,
      headers: jsonHeaders,
    });
  }

  const name = String(payload.name || '').trim();
  const email = String(payload.email || '').trim();
  const attending = String(payload.attending || '').trim().toLowerCase();
  const guests = Number(payload.guests || 0);
  const dietary = String(payload.dietary || '').trim();
  const message = String(payload.message || '').trim();

  if (!name || !email || (attending !== 'yes' && attending !== 'no')) {
    return new Response(JSON.stringify({ error: 'Missing required RSVP fields' }), {
      status: 400,
      headers: jsonHeaders,
    });
  }

  const createdAt = new Date().toISOString();
  const id = crypto.randomUUID?.() ?? `${Date.now()}-${Math.random().toString(16).slice(2)}`;

  try {
    await db.prepare(
      `INSERT INTO rsvps (id, name, email, attending, guests, dietary, message, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`
    )
      .bind(id, name, email, attending, guests, dietary, message, createdAt)
      .run();
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to save RSVP' }), {
      status: 500,
      headers: jsonHeaders,
    });
  }

  return new Response(JSON.stringify({ success: true }), {
    status: 201,
    headers: jsonHeaders,
  });
}
