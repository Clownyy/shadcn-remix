import { Avatar, AvatarImage, Image } from "@radix-ui/react-avatar";
import { json, LoaderFunction } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { ContentLayout } from "~/components/admin-panel/content-layout";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "~/components/ui/breadcrumb";
import { Card, CardContent } from "~/components/ui/card";
import { withAuth } from "~/lib/auth";
import { stateCookie } from "~/sessions";

export const loader: LoaderFunction = withAuth(async ({ request }) => {
    const cookieHeader = request.headers.get("Cookie");
    const userInfo = await stateCookie.parse(cookieHeader);
  
    return json({ userInfo });
});

export default function Dashboard() {
    const useData = useLoaderData();
    const userInfo = useData?.userInfo;

    return (
        <ContentLayout title="Dashboard" userInfo={userInfo}>
            <Card className="rounded-lg border-none mt-6">
                <CardContent className="p-6">
                    <h1>Dashboard</h1>
                </CardContent>
            </Card>
        </ContentLayout>
    );
}