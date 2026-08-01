const jsonHeaders = {
  'content-type': 'application/json;charset=UTF-8',
  'access-control-allow-origin': '*',
  'access-control-allow-headers': 'content-type',
};

const indexHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Our Event Website</title>
  <style>
    :root {
      --primary: #2563eb;
      --background: #f8fafc;
      --text: #1e293b;
      --card-bg: #ffffff;
      --accent: #ef4444;
    }
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      background-color: var(--background);
      color: var(--text);
      line-height: 1.6;
      margin: 0;
      padding: 20px;
    }
    .container {
      max-width: 700px;
      margin: 0 auto;
    }
    header {
      text-align: center;
      padding: 40px 0 20px;
    }
    h1 { margin-bottom: 10px; color: #0f172a; }
    .date { font-weight: bold; color: var(--primary); font-size: 1.2rem; }
    .updates-box {
      background-color: #fef2f2;
      border-left: 5px solid var(--accent);
      padding: 15px 20px;
      border-radius: 4px;
      margin-bottom: 30px;
    }
    .updates-box h3 { margin: 0 0 5px 0; color: var(--accent); }
    .updates-box p { margin: 0; font-size: 0.95rem; }
    .update-time { font-size: 0.8rem; color: #64748b; display: block; margin-top: 5px; }
    .card {
      background: var(--card-bg);
      padding: 25px;
      border-radius: 8px;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
      margin-bottom: 30px;
    }
    form {
      display: grid;
      gap: 1rem;
    }
    label {
      display: block;
      font-weight: 600;
      margin-bottom: 0.35rem;
    }
    input,
    textarea,
    button {
      width: 100%;
      padding: 0.95rem 1rem;
      border-radius: 8px;
      border: 1px solid #cbd5e1;
      font: inherit;
      box-sizing: border-box;
    }
    textarea {
      resize: vertical;
    }
    fieldset {
      border: 1px solid #e2e8f0;
      border-radius: 8px;
      padding: 1rem;
    }
    legend {
      font-weight: 700;
      padding: 0 0.5rem;
    }
    .radio-group {
      display: flex;
      gap: 1rem;
      flex-wrap: wrap;
    }
    button {
      background-color: var(--primary);
      color: white;
      border: none;
      cursor: pointer;
      transition: background-color 0.2s ease;
    }
    button:hover {
      background-color: #1d4ed8;
    }
    .response-message {
      margin-top: 1rem;
      font-weight: 600;
    }
    .response-message.success {
      color: #166534;
    }
    .response-message.error {
      color: #b91c1c;
    }
    h2 { border-bottom: 2px solid #e2e8f0; padding-bottom: 10px; margin-top: 0; }
    iframe { width: 100%; border: none; border-radius: 4px; }
  </style>
</head>
<body>
  <div class="container">
    <header>
      <h1>🎉 Welcome to Our Event!</h1>
      <p class="date">Saturday, October 17th @ 6:00 PM</p>
      <p>123 Event Street, Cityville</p>
    </header>

    <div class="updates-box">
      <h3>📢 Latest Update:</h3>
      <p><strong>Rain Location Confirmed!</strong> We will be moving indoors to the main hall if it rains. Parking is free on-site.</p>
      <span class="update-time">Updated: July 31, 2026</span>
    </div>

    <div class="card">
      <h2>About the Event</h2>
      <p>We are so excited to gather our close friends for a night of celebration, food, and great music. Space is limited to 20 people, so please let us know if you can make it by filling out the RSVP form below!</p>
    </div>

    <div class="card">
      <h2>Event Schedule</h2>
      <iframe src="https://google.com" style="border: 0" width="100%" height="400" frameborder="0" scrolling="no"></iframe>
    </div>

    <div class="card">
      <h2>RSVP Here</h2>
      <p>Please let us know whether you can join us and any dietary needs.</p>
      <form id="rsvp-form">
        <label for="name">Full name</label>
        <input type="text" id="name" name="name" required placeholder="Your full name">

        <label for="email">Email address</label>
        <input type="email" id="email" name="email" required placeholder="you@example.com">

        <fieldset>
          <legend>Will you attend?</legend>
          <div class="radio-group">
            <label><input type="radio" name="attending" value="yes" checked> Yes</label>
            <label><input type="radio" name="attending" value="no"> No</label>
          </div>
        </fieldset>

        <label for="guests">Guest count</label>
        <input type="number" id="guests" name="guests" min="0" max="5" value="0">

        <label for="dietary">Dietary restrictions</label>
        <input type="text" id="dietary" name="dietary" placeholder="e.g. vegetarian, nut allergy">

        <label for="message">Message</label>
        <textarea id="message" name="message" rows="4" placeholder="Any additional notes"></textarea>

        <button type="submit">Send RSVP</button>
      </form>
      <div id="rsvp-message" class="response-message" aria-live="polite"></div>
    </div>
  </div>

  <script>
    const form = document.getElementById('rsvp-form');
    const feedback = document.getElementById('rsvp-message');

    form.addEventListener('submit', async (event) => {
      event.preventDefault();
      feedback.textContent = 'Sending your RSVP...';
      feedback.className = 'response-message';

      const formData = {
        name: form.name.value.trim(),
        email: form.email.value.trim(),
        attending: form.attending.value,
        guests: Number(form.guests.value || 0),
        dietary: form.dietary.value.trim(),
        message: form.message.value.trim(),
      };

      try {
        const response = await fetch('/api/rsvp', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });

        const result = await response.json();
        if (!response.ok) throw new Error(result.error || 'Unable to submit RSVP');

        feedback.textContent = 'Thanks! Your RSVP has been recorded.';
        feedback.classList.add('success');
        form.reset();
      } catch (error) {
        feedback.textContent = error.message || 'An unexpected error occurred.';
        feedback.classList.add('error');
      }
    });
  </script>
</body>
</html>`;

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

    if (request.method === 'GET') {
      if (url.pathname === '/' || url.pathname === '/index.html') {
        return new Response(indexHtml, {
          status: 200,
          headers: {
            'content-type': 'text/html;charset=UTF-8',
          },
        });
      }
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
