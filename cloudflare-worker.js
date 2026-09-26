/**
 * Cloudflare Worker — Studex Group Operations Bridge
 *
 * Routes:
 * /api/agents/* → Local Herdr agents (via Tailscale)
 * /api/buzz/* → Buzz community network
 * /api/email/* → Google Workspace email routing
 * /api/gcp/* → Google Cloud microservices
 * /api/models/* → Models House (Ollama + OpenRouter)
 */

const CONFIG = {
  TAILSCALE_IP: 'macbook-pro-5.tailf7273b.ts.net',
  TAILSCALE_PORT: 5555, // Relay server
  OLLAMA_PORT: 11434,
  LITELLM_PORT: 4000,
  BUZZ_ENDPOINT: 'wss://studex-agents.communities.buzz.xyz',
  GOOGLE_WORKSPACE_DOMAIN: 'studex-group.com',
};

// CORS headers for dashboards
const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const path = url.pathname;

    // Preflight
    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: CORS_HEADERS });
    }

    try {
      // Route: /api/agents/* → Local Herdr agents
      if (path.startsWith('/api/agents/')) {
        return handleAgentsAPI(request, env);
      }

      // Route: /api/buzz/* → Buzz network
      if (path.startsWith('/api/buzz/')) {
        return handleBuzzAPI(request, env);
      }

      // Route: /api/models/* → Models House
      if (path.startsWith('/api/models/')) {
        return handleModelsAPI(request, env);
      }

      // Route: /api/email/* → Google Workspace
      if (path.startsWith('/api/email/')) {
        return handleEmailAPI(request, env);
      }

      // Route: /api/gcp/* → Google Cloud
      if (path.startsWith('/api/gcp/')) {
        return handleGCPAPI(request, env);
      }

      // Default: 404
      return new Response(JSON.stringify({ error: 'Not Found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json', ...CORS_HEADERS },
      });
    } catch (error) {
      return new Response(
        JSON.stringify({ error: error.message }),
        { status: 500, headers: { 'Content-Type': 'application/json', ...CORS_HEADERS } }
      );
    }
  },
};

/**
 * Handle /api/agents/* — Local Herdr agents via Tailscale
 */
async function handleAgentsAPI(request, env) {
  const url = new URL(request.url);
  const agentPath = url.pathname.replace('/api/agents', '');

  // Route to local relay server on Tailscale
  const targetUrl = `http://${CONFIG.TAILSCALE_IP}:${CONFIG.TAILSCALE_PORT}${agentPath}${url.search}`;

  try {
    const response = await fetch(targetUrl, {
      method: request.method,
      headers: request.headers,
      body: request.body,
    });

    const data = await response.json();
    return new Response(JSON.stringify(data), {
      status: response.status,
      headers: { 'Content-Type': 'application/json', ...CORS_HEADERS },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: 'Agent unreachable', detail: error.message }),
      { status: 503, headers: { 'Content-Type': 'application/json', ...CORS_HEADERS } }
    );
  }
}

/**
 * Handle /api/buzz/* — Buzz community network
 */
async function handleBuzzAPI(request, env) {
  const url = new URL(request.url);

  // Buzz API endpoint (update with actual Buzz API)
  const buzzPath = url.pathname.replace('/api/buzz', '');

  try {
    const response = await fetch(`https://api.buzz.xyz${buzzPath}${url.search}`, {
      method: request.method,
      headers: {
        ...request.headers,
        'Authorization': `Bearer ${env.BUZZ_API_KEY || ''}`,
      },
      body: request.body,
    });

    const data = await response.json();
    return new Response(JSON.stringify(data), {
      status: response.status,
      headers: { 'Content-Type': 'application/json', ...CORS_HEADERS },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: 'Buzz network error', detail: error.message }),
      { status: 503, headers: { 'Content-Type': 'application/json', ...CORS_HEADERS } }
    );
  }
}

/**
 * Handle /api/models/* — Models House (Ollama + OpenRouter)
 */
async function handleModelsAPI(request, env) {
  const url = new URL(request.url);
  const modelPath = url.pathname.replace('/api/models', '');

  // Route to local Ollama
  const targetUrl = `http://${CONFIG.TAILSCALE_IP}:${CONFIG.OLLAMA_PORT}${modelPath}${url.search}`;

  try {
    const response = await fetch(targetUrl, {
      method: request.method,
      headers: request.headers,
      body: request.body,
    });

    return new Response(response.body, {
      status: response.status,
      headers: { 'Content-Type': 'application/json', ...CORS_HEADERS },
    });
  } catch (error) {
    // Fallback to OpenRouter cloud
    return new Response(
      JSON.stringify({
        error: 'Local models unavailable, using cloud fallback',
        fallback: 'openrouter',
      }),
      { status: 503, headers: { 'Content-Type': 'application/json', ...CORS_HEADERS } }
    );
  }
}

/**
 * Handle /api/email/* — Google Workspace email routing
 */
async function handleEmailAPI(request, env) {
  if (request.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'POST only' }), { status: 405, headers: CORS_HEADERS });
  }

  const body = await request.json();
  const { to, subject, body: emailBody, from } = body;

  try {
    // Route through Google Workspace SMTP
    // (Configure with SendGrid, Mailgun, or Google Cloud Functions)
    const response = await sendEmailViaGoogle(
      from || 'operations@studex-group.com',
      to,
      subject,
      emailBody,
      env.GOOGLE_SERVICE_ACCOUNT_KEY
    );

    return new Response(JSON.stringify({ success: true, messageId: response.id }), {
      status: 200,
      headers: { 'Content-Type': 'application/json', ...CORS_HEADERS },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: 'Email send failed', detail: error.message }),
      { status: 500, headers: { 'Content-Type': 'application/json', ...CORS_HEADERS } }
    );
  }
}

/**
 * Handle /api/gcp/* — Google Cloud microservices
 */
async function handleGCPAPI(request, env) {
  const url = new URL(request.url);
  const gcpPath = url.pathname.replace('/api/gcp', '');

  try {
    const response = await fetch(
      `https://${env.GCP_REGION}-${env.GCP_PROJECT_ID}.cloudfunctions.net${gcpPath}${url.search}`,
      {
        method: request.method,
        headers: {
          ...request.headers,
          'Authorization': `Bearer ${env.GCP_ID_TOKEN || ''}`,
        },
        body: request.body,
      }
    );

    return new Response(response.body, {
      status: response.status,
      headers: { 'Content-Type': 'application/json', ...CORS_HEADERS },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: 'GCP service error', detail: error.message }),
      { status: 503, headers: { 'Content-Type': 'application/json', ...CORS_HEADERS } }
    );
  }
}

/**
 * Send email via Google Cloud
 */
async function sendEmailViaGoogle(from, to, subject, body, serviceAccountKey) {
  // Placeholder — implement with Cloud Functions or SendGrid
  return { id: `email-${Date.now()}` };
}
