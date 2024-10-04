import { LoaderFunction, redirect } from "@remix-run/node";
import { sessionCookie } from "~/sessions";

export async function requireAuth(request: Request) {
    const cookieHeader = request.headers.get("Cookie");
    const jwtSession = await sessionCookie.parse(cookieHeader);
    

    if (!jwtSession) {
        throw redirect("/auth");
    }

    return jwtSession;
}

export async function notAuth(request: Request) {
    const cookieHeader = request.headers.get("Cookie");
    const jwtSession = await sessionCookie.parse(cookieHeader);

    if (jwtSession) {
        throw redirect("/");
    }

    return null;
}

export function withAuth(loaderFunction: LoaderFunction): LoaderFunction {
    return async (args) => {
        await requireAuth(args.request);
        return loaderFunction(args);
    };
}

export function withoutAuth(loaderFunction: LoaderFunction): LoaderFunction {
    return async (args) => {
        await notAuth(args.request);
        return loaderFunction(args);
    }
}