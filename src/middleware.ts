import { match } from '@formatjs/intl-localematcher';
import Negotiator from 'negotiator';
import { NextRequest } from 'next/server';

let locales = ['en', 'de'];

// Get the preferred locale, similar to the above or using a library
function getLocale (request: NextRequest) {
  let headers = { 'accept-language': 'en-US,en;q=0.5' };
  let languages = new Negotiator({ headers }).languages();
  let defaultLocale = 'en-US';

  return match(languages, locales, defaultLocale);
}

export function middleware (request: NextRequest) {
  // Check if there is any supported locale in the pathname
  const { pathname } = request.nextUrl;
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) return;

  // Redirect if there is no locale
  const locale = getLocale(request);
  request.nextUrl.pathname = `/${locale}${pathname}`;
  // e.g. incoming request is /products
  // The new URL is now /en-US/products
  return Response.redirect(request.nextUrl);
}

export const config = {
  matcher: [
    // Skip all internal paths (_next)
    '/((?!_next|images|api).*)',
    // Optional: only run on root (/) URL
    // '/'
  ],
};
