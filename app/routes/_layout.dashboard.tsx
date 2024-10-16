import { LoaderFunction } from "@remix-run/node";
import { useEffect } from "react";
import { ContentLayout } from "~/components/admin-panel/content-layout";
import { Card, CardContent } from "~/components/ui/card";
import { useLoading } from "~/hooks/loading-context";
import { withAuth } from "~/lib/auth";

export const loader: LoaderFunction = withAuth(async ({ request }) => {
    return null;
});

export default function Dashboard() {
    const { loading } = useLoading();
    const { setLoading } = useLoading();

    useEffect(() => {
        if(loading) {
            setLoading(false)
        }
    }, [loading])
    return (
        <ContentLayout title="Dashboard">
            <Card className="rounded-lg border-none mt-6">
                <CardContent className="p-6">
                    <h1>Welcome to Vitation Dashboard!</h1>
                </CardContent>
            </Card>
        </ContentLayout>
    );
}