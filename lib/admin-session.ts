import { cookies } from 'next/headers';

const SESSION_COOKIE = 'tska_admin';

export function isAdminAuthenticated(): boolean {
  return cookies().get(SESSION_COOKIE)?.value === '1';
}
