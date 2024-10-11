import { createCookieSessionStorage } from "@remix-run/node"
import { createThemeSessionResolver } from "remix-themes"

// You can default to 'development' if process.env.NODE_ENV is not set
const isProduction = process.env.NODE_ENV === "production"
const sessionStorage = createCookieSessionStorage({
  cookie: {
    name: "theme",
    path: "/",
    httpOnly: true,
    secure: isProduction,
    sameSite: "lax",
    secrets: ["secret"],
  },
})

export const themeSessionResolver = createThemeSessionResolver(sessionStorage)
