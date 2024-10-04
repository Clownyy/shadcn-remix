import { json, LoaderFunction } from "@remix-run/node";
import { Outlet, useLoaderData } from "@remix-run/react";
import AdminPanelLayout from "~/components/admin-panel/admin-panel-layout";
import { stateCookie } from "~/sessions";


export default function Layout() {
    return (
        <AdminPanelLayout><Outlet /></AdminPanelLayout>
    );
}