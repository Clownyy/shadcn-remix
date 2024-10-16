import { json, LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { MessageCircleHeart, Users } from "lucide-react";
import { useEffect } from "react";
import { ContentLayout } from "~/components/admin-panel/content-layout";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { useLoading } from "~/hooks/loading-context";
import { useUserStore } from "~/hooks/use-user-store";
import { withAuth } from "~/lib/auth";
import { httpRequest } from "~/lib/httpRequest";
import { sessionCookie, stateCookie } from "~/sessions";

type LoaderData = {
    guestTotal: number;
    greetingTotal: number;
}
export const loader: LoaderFunction = withAuth(async ({ request }) => {
    const cookieHeader = request.headers.get("Cookie");
    const userInfo = await stateCookie.parse(cookieHeader);

    const jwt = await sessionCookie.parse(cookieHeader);

    try {
        const guestsData = await httpRequest(jwt, process.env.PUBLIC_API!, `guests/get-by-user/${userInfo.id}`);
        const greetingsData = await httpRequest(jwt, process.env.PUBLIC_API!, `greetings/get-by-user/${userInfo.id}`);
        return json({ greetingTotal: greetingsData.length, guestTotal: guestsData.length });
    } catch (error) {
        return json({ greetingTotal: 0, guestTotal: 0 });
    }
});

export default function Dashboard() {
    const useData = useLoaderData<LoaderData>();
    const userInfo = useUserStore((state) => state.userInfo);
    const { loading } = useLoading();
    const { setLoading } = useLoading();

    useEffect(() => {
        if (loading) {
            setLoading(false)
        }
    }, [loading])
    return (
        <ContentLayout title="Dashboard">
            <div className="mt-6 grid gap-2 md:grid-cols-1 lg:grid-cols-2">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Guest Total
                        </CardTitle>
                        <div className="h-4 w-4 text-muted-foreground">
                            <Users/>
                        </div>
                        {/* <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            className="h-4 w-4 text-muted-foreground"
                        >
                            <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                        </svg> */}
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{useData.guestTotal}</div>
                        <p className="text-xs text-muted-foreground">
                            {/* +20.1% from last month */}
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Greeting Total
                        </CardTitle>
                        <div className="h-4 w-4 text-muted-foreground">
                            <MessageCircleHeart />
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{useData.greetingTotal}</div>
                        <p className="text-xs text-muted-foreground">
                            {/* +180.1% from last month */}
                        </p>
                    </CardContent>
                </Card>
            </div>
            <Card className="rounded-lg border-none mt-6">
                <CardContent className="p-6">
                    <h1>Hi, {userInfo?.firstName} {userInfo?.lastName}!</h1>
                </CardContent>
            </Card>
        </ContentLayout>
    );
}