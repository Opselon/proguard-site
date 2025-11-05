// File: functions/[[path]].mjs
// This is the server-side worker that handles all dynamic requests.

import { renderPage } from './html.mjs';
import { pageModel } from './data.mjs';

// Import translation files from the `i18n-data` directory at the project root.
import enJson from '../i18n-data/en.json' with { type: 'json' };
import faJson from '../i18n-data/fa.json' with { type: 'json' };

/**
 * The main handler for Cloudflare Pages Functions.
 * It's called for any request that doesn't match a static file in the `public` directory.
 * @param {object} context - The context object containing request, env, etc.
 * @returns {Promise<Response>}
 */
export async function onRequest(context) {
    const { request, env } = context;
    const url = new URL(request.url);

    // --- 1. API Route Handling ---
    // If the request is for an API endpoint, handle it here.
    if (url.pathname.startsWith('/api/')) {
        if (url.pathname === '/api/contact' && request.method === 'POST') {
            const rateLimiterId = env.RATE_LIMITER.idFromName(request.headers.get('CF-Connecting-IP'));
            const rateLimiter = env.RATE_LIMITER.get(rateLimiterId);
            return rateLimiter.fetch(request);
        }
        // Fallback for any other API route
        return new Response(JSON.stringify({ error: 'API endpoint not found' }), {
            status: 404,
            headers: { 'Content-Type': 'application/json' },
        });
    }

    // --- 2. Page Rendering (SSR) ---
    // For any other request, we assume it's a navigation request and render the main HTML shell.
    // Cloudflare Pages has already checked that no static file exists for this path.
    
    // Determine user's preferred language
    const acceptLang = request.headers.get('Accept-Language') || '';
    const preferredLocale = acceptLang.startsWith('fa') ? 'fa' : env.DEFAULT_LOCALE || 'fa';
    const messages = preferredLocale === 'fa' ? faJson : enJson;

    // Determine user's preferred theme from cookies
    const themeCookie = request.headers.get('Cookie')?.match(/theme=(light|dark)/);
    const theme = themeCookie ? themeCookie[1] : env.THEME_DEFAULT || 'light';

    // Render the final HTML using our template function
    const html = renderPage({
        model: pageModel,
        locale: preferredLocale,
        messages,
        theme,
        env,
    });

    return new Response(html, {
        headers: {
            'Content-Type': 'text/html;charset=UTF-8',
            // It's a good practice to set security headers here as well
            'X-Content-Type-Options': 'nosniff',
            'X-Frame-Options': 'DENY',
        },
    });
}


/**
 * The Durable Object class definition for rate limiting.
 * Wrangler automatically finds this exported class and associates it
 * with the `RATE_LIMITER` binding in wrangler.toml.
 */
export class RateLimiter {
    constructor(state, env) {
        this.storage = state.storage;
    }
    async fetch(request) {
        const timestamp = Date.now();
        const limit = 5; // Allow 5 requests...
        const window = 60000; // ...per minute

        let timestamps = await this.storage.get('timestamps') || [];
        // Remove timestamps older than the window
        timestamps = timestamps.filter(ts => timestamp - ts < window);

        if (timestamps.length >= limit) {
            return new Response(JSON.stringify({ success: false, error: 'Too many requests. Please try again later.' }), {
                status: 429, // 429 Too Many Requests
                headers: { 'Content-Type': 'application/json' },
            });
        }

        timestamps.push(timestamp);
        await this.storage.put('timestamps', timestamps);

        // Here you would normally process the form data from the request body.
        // const formData = await request.formData();
        // console.log("Form data:", Object.fromEntries(formData));

        return new Response(JSON.stringify({ success: true, message: 'Your message has been sent!' }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}