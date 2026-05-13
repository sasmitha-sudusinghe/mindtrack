function apiBase() {
  const fromEnv = import.meta.env.VITE_API_BASE_URL;
  if (fromEnv) return String(fromEnv).replace(/\/$/, '');
  if (import.meta.env.DEV) return '';
  return 'http://localhost:5000';
}

export function getApiBase() {
  return apiBase() || '(same origin / proxy)';
}

export async function api(path, options = {}) {
  const base = apiBase();
  const url = `${base}${path}`;
  const { headers: optHeaders, body, ...rest } = options;
  const headers = { ...optHeaders };
  if (body !== undefined && !(body instanceof FormData) && !headers['Content-Type']) {
    headers['Content-Type'] = 'application/json';
  }
  const res = await fetch(url, {
    ...rest,
    headers,
    body: body !== undefined && typeof body === 'object' && !(body instanceof FormData)
      ? JSON.stringify(body)
      : body,
  });
  const text = await res.text();
  let parsed = null;
  try {
    parsed = text ? JSON.parse(text) : null;
  } catch {
    parsed = { message: text || 'Invalid response' };
  }
  if (!res.ok) {
    const msg = parsed?.message ?? res.statusText ?? 'Request failed';
    throw new Error(typeof msg === 'string' ? msg : JSON.stringify(msg));
  }
  return parsed;
}
