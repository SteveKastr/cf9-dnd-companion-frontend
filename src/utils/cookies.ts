import Cookies from 'js-cookie'

/**
 * Thin wrapper around js-cookie, used for storing/reading/removing the
 * JWT access token cookie throughout the app.
 */

export function setCookie(
    name: string,
    value: string,
    options?: Cookies.CookieAttributes
) {
    Cookies.set(name, value, options)
}

export function getCookie(name: string): string | undefined {
    return Cookies.get(name)
}

export function deleteCookie(name: string, options?: Cookies.CookieAttributes): void {
    Cookies.remove(name, options)
}