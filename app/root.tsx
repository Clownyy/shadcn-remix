import clsx from "clsx"
import {
    Links,
    Meta,
    Outlet,
    Scripts,
    ScrollRestoration,
    useLoaderData,
} from "@remix-run/react";
import "./tailwind.css";
import { LinksFunction, LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import { themeSessionResolver } from "./sessions.server";
import { PreventFlashOnWrongTheme, ThemeProvider, useTheme } from "remix-themes";
import { DarkModeToggle } from "./components/dark-mode-toggle";
import { Toaster } from "sonner";

export const meta: MetaFunction = () => {
    return [
        { title: "Wedding - Back Office" },
        { name: "description", content: "Welcome to Remix!" },
    ];
};

export async function loader({ request }: LoaderFunctionArgs) {
    const { getTheme } = await themeSessionResolver(request)
    return {
        theme: getTheme()
    }
}

export default function AppWithProviders() {
    const data = useLoaderData<typeof loader>()
    return (
        <ThemeProvider specifiedTheme={data.theme} themeAction="/action/set-theme">
            <App />
        </ThemeProvider>
    )
}

export function App() {
    const data = useLoaderData<typeof loader>()
    const [theme] = useTheme();
    return (
        <html lang="en" className={clsx(theme)}>
            <head>
                <meta charSet="utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <Meta />
                <PreventFlashOnWrongTheme ssrTheme={Boolean(data.theme)} />
                <Links />
            </head>
            <body>
                <Toaster position="top-right" richColors closeButton />
                <Outlet />
                <ScrollRestoration />
                <Scripts />
            </body>
        </html>
    );
}
