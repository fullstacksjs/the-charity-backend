import type { IncomingHttpHeaders } from 'http';

export const getCookies = (headers: IncomingHttpHeaders) => {
  const cookies = headers['set-cookie'] ?? [];

  return {
    session: cookies.find(c => c.startsWith('connect.sid')),
    auth: cookies.find(c => c.startsWith('is-logged-in')),
  };
};
