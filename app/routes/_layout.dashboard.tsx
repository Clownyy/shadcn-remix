import { json, LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { useEffect } from "react";
import { ContentLayout } from "~/components/admin-panel/content-layout";
import { Card, CardContent } from "~/components/ui/card";
import { useLoading } from "~/hooks/loading-context";
import { withAuth } from "~/lib/auth";
import { stateCookie } from "~/sessions";
import { User } from "~/type/types";

type LoaderData = {
    userInfo: User;
}

export const loader: LoaderFunction = withAuth(async ({ request }) => {
    const cookieHeader = request.headers.get("Cookie");
    const userInfo = await stateCookie.parse(cookieHeader);

    return json({ userInfo });
});

export default function Dashboard() {
    const { loading } = useLoading();
    const { setLoading } = useLoading();
    const useData = useLoaderData<LoaderData>();
    const userInfo = useData.userInfo;

    useEffect(() => {
        if(loading) {
            setLoading(false)
        }
    }, [loading])
    return (
        <ContentLayout title="Dashboard" userInfo={userInfo}>
            <Card className="rounded-lg border-none mt-6">
                <CardContent className="p-6">
                    <h1>Welcome to Vitation Dashboard!</h1>
                </CardContent>
            </Card>
        </ContentLayout>
    );
}