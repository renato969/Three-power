// Worker do Treino Diario — Tres Poderes
//
// Serve o app estatico (pasta public) e expoe a rota POST /api/claude,
// que fala com a API da Anthropic usando a chave guardada no ambiente.
// A chave nunca chega ao navegador.

const MODEL_PADRAO = 'claude-sonnet-5';
const MAX_PROMPT = 8000;

function json(obj, status = 200) {
  return new Response(JSON.stringify(obj), {
    status,
    headers: { 'content-type': 'application/json; charset=utf-8' }
  });
}

async function handleClaude(request, env) {
  if (request.method !== 'POST') {
    return json({ error: 'use POST' }, 405);
  }

  if (!env.ANTHROPIC_API_KEY) {
    return json({ error: 'ANTHROPIC_API_KEY nao configurada nas variaveis do Worker' }, 500);
  }

  let body;
  try {
    body = await request.json();
  } catch (e) {
    return json({ error: 'corpo invalido' }, 400);
  }

  // o app usa isso so para saber se o backend esta de pe
  if (body.ping) return json({ ok: true });

  const prompt = typeof body.prompt === 'string' ? body.prompt.trim() : '';
  if (!prompt) return json({ error: 'prompt ausente' }, 400);
  if (prompt.length > MAX_PROMPT) return json({ error: 'prompt longo demais' }, 413);

  try {
    const res = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'x-api-key': env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: env.CLAUDE_MODEL || MODEL_PADRAO,
        max_tokens: 1000,
        messages: [{ role: 'user', content: prompt }]
      })
    });

    const data = await res.json();

    if (!res.ok) {
      const msg = (data && data.error && data.error.message) || 'falha na API da Anthropic';
      return json({ error: msg }, res.status);
    }

    return json({ content: data.content });
  } catch (e) {
    return json({ error: 'falha ao contatar a API' }, 502);
  }
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname === '/api/claude') {
      return handleClaude(request, env);
    }

    // qualquer outra rota cai nos arquivos estaticos
    return env.ASSETS.fetch(request);
  }
};
