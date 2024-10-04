import { Avatar, AvatarImage, Image } from "@radix-ui/react-avatar";
import { json, LoaderFunction } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { ContentLayout } from "~/components/admin-panel/content-layout";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "~/components/ui/breadcrumb";
import { Card, CardContent, CardTitle } from "~/components/ui/card";
import { withAuth } from "~/lib/auth";
import { sessionCookie, stateCookie } from "~/sessions";
import { ColumnDef } from "@tanstack/react-table"
import { httpRequest } from "~/lib/helper";
import { DataTableColumnHeader } from "~/components/data-table/header-table";
import { DataTable } from "~/components/data-table/data-table";

export const loader: LoaderFunction = withAuth(async ({ request }) => {
    const cookieHeader = request.headers.get("Cookie");
    const userInfo = await stateCookie.parse(cookieHeader);

    const jwt = await sessionCookie.parse(cookieHeader);

    try {
        const usersData = await httpRequest(jwt, 'http://localhost:4300/api/', 'users');

        return json({ userInfo, usersData });
    } catch (error) {
        return json({ userInfo, ...{}});
    }
});

export type User = {
    id: number,
    login: string,
    firstName: string,
    lastName: string,
    email: string,
    imageUrl: string,
    activated: boolean,
    langKey: string,
    createdBy: string,
    createdAt: string,
    lastModifiedBy: string,
    updatedAt: string,
}

export const columns: ColumnDef<User>[] = [
    {
        accessorKey: "login",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Username" />
        )
    },
    {
        accessorKey: "firstName",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="First Name" />
        )
    },
    {
        accessorKey: "lastName",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Last Name" />
        )
    },
    {
        accessorKey: "email",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Email" />
        )
    },
    {
        accessorKey: "activated",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Activated" />
        )
    },
    {
        accessorKey: "langKey",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Language Key" />
        )
    },
    {
        accessorKey: "createdBy",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Created By" />
        )
    },
    {
        accessorKey: "createdAt",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Created Date" />
        )
    },
    {
        accessorKey: "lastModifiedBy",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Last Modified By" />
        )
    },
    {
        accessorKey: "updatedAt",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Last Modified Date" />
        )
    }
]

const handleEdit = (row: any) => {
    var data = row.original
    console.log(data)
}

const handleDelete = (row: any) => {
    var data = row.original
    console.log("delete: ", data)
}

const handleCreate = () => {
    console.log("create")
}

export default function Users() {
    const useData = useLoaderData();
    const userInfo = useData?.userInfo;
    const usersData = useData?.usersData;

    return (
        <ContentLayout title="Users" userInfo={userInfo}>
            <Card className="rounded-lg border-none mt-6">
                <CardContent className="p-6">
                    <CardTitle>
                        <p className="text-2xl font-semibold">Users</p>
                    </CardTitle>
                    <DataTable
                        columns={columns}
                        data={usersData}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                        onCreate={handleCreate}
                        contextMenu={true}
                    />
                </CardContent>
            </Card>
        </ContentLayout>
    );
}