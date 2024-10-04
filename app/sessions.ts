import { createCookie } from "@remix-run/node";

export const sessionCookie = createCookie("session", {
    httpOnly: true,
    secure: true,
    sameSite: 'lax',
    path: "/",
    maxAge: 60 * 60 * 24
})

export const stateCookie = createCookie("state", {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24
})