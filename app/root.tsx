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
import { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import { themeSessionResolver } from "./sessions.server";
import { PreventFlashOnWrongTheme, ThemeProvider, useTheme } from "remix-themes";
import { Toaster } from "sonner";
import { LoadingProvider, useLoading } from "./hooks/loading-context";
import { LoadingSpinner } from "./components/custom/loading";
import { useEffect } from "react";
import { stateCookie } from "./sessions";
import { useUserStore } from "./hooks/use-user-store";

export const meta: MetaFunction = () => {
    return [
        { title: "Vitation - Back Office" },
        { name: "description", content: "Welcome to Vitation!" },
    ];
};

export async function loader({ request }: LoaderFunctionArgs) {
    const { getTheme } = await themeSessionResolver(request)
    const userInfo = await stateCookie.parse(request.headers.get('cookie'));
    return {
        theme: getTheme(),
        userInfo: userInfo,
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

const RootLayout = () => {
    const data = useLoaderData<typeof loader>()
    const { loading } = useLoading();
    const [theme] = useTheme();
    const userInfo = data.userInfo;
    const setUserInfo = useUserStore((state) => state.setUserInfo);

    useEffect(() => {
        if (userInfo) {
            setUserInfo(userInfo); // Hydrate Zustand once
        }
    }, [userInfo, setUserInfo]);

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
                {loading && <LoadingSpinner />}
                <Toaster position="top-right" richColors closeButton />
                <Outlet />
                <ScrollRestoration />
                <Scripts />
            </body>
        </html>
    );
}

export function App() {
    return (
        <LoadingProvider>
            <RootLayout />
        </LoadingProvider>
    );
}
