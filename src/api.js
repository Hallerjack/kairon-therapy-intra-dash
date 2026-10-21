// Cliente de la API. Rutas relativas: funcionan igual en local (proxy de Vite)
// y en el servidor (mismo dominio). La sesión viaja en una cookie httpOnly
// que pone el backend al hacer login, por eso no se guarda ningún token aquí.
export async function api(path, options = {}) {
  const response = await fetch(`/api${path}`, {
    credentials: 'include',
    ...options,
    headers: { 'Content-Type': 'application/json', ...options.headers },
  });

  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    const error = new Error(data.error || `Error ${response.status}`);
    error.status = response.status;
    throw error;
  }
  return data;
}
