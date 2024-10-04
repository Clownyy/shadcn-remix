import { json, LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { ContentLayout } from "~/components/admin-panel/content-layout";
import { Card, CardContent, CardTitle } from "~/components/ui/card";
import { withAuth } from "~/lib/auth";
import { sessionCookie, stateCookie } from "~/sessions";
import { ColumnDef } from "@tanstack/react-table"
import { formatDateTime, httpRequest } from "~/lib/helper";
import { DataTable } from "~/components/data-table/data-table";
import { PopupUser } from "~/components/popup/popup-user";
import { useState } from "react";

export const loader: LoaderFunction = withAuth(async ({ request }) => {
    const cookieHeader = request.headers.get("Cookie");
    const userInfo = await stateCookie.parse(cookieHeader);

    const jwt = await sessionCookie.parse(cookieHeader);

    try {
        const usersData = await httpRequest(jwt, process.env.PUBLIC_API!, 'users');
        return json({ userInfo, usersData });
    } catch (error) {
        return json({ userInfo, ...{} });
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
    resetKey: string,
    createdAt: Date,
    updatedAt: Date,
}

export const columns: ColumnDef<User>[] = [
    {
        accessorKey: "login",
        header: "Username"
    },
    {
        accessorKey: "firstName",
        header: "First Name"
    },
    {
        accessorKey: "lastName",
        header: "Last Name"
    },
    {
        accessorKey: "email",
        header: "Email"
    },
    {
        accessorKey: "activated",
        header: "Activated",
        cell: ({row}) => {
            if(row.original.resetKey){
                return "false";
            }
            return "true";
        }
    },
    {
        accessorKey: "createdAt",
        header: "Created Date",
        cell: ({ row }) => {
            return formatDateTime(row.original.createdAt);
        },
    },
    {
        accessorKey: "updatedAt",
        header: "Last Modified Date",
        cell: ({ row }) => {
            return formatDateTime(row.original.updatedAt);
        },
    }
]

export default function Users() {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [data, setData] = useState({});

    const useData = useLoaderData();
    const userInfo = useData?.userInfo;
    const usersData = useData?.usersData;

    const handleEdit = (row: any) => {
        handleOpenDialog();
        setData(row.original);
    }

    const handleOpenDialog = () => {
        setIsDialogOpen(true);
        document.body.style.pointerEvents = "auto";
    };

    const handleCloseDialog = () => {
        setIsDialogOpen(false);
        setData({});
        document.body.style.pointerEvents = "auto";
    };

    const handleDelete = (row: any) => {
        var data = row.original
        console.log("delete: ", data)
    }

    return (
        <>
            <ContentLayout title="Users" userInfo={userInfo}>
                <Card className="rounded-lg border-none mt-6">
                    <CardContent className="p-6">
                        <CardTitle>
                            <span className="text-2xl font-semibold">Users</span>
                        </CardTitle>
                        <DataTable
                            columns={columns}
                            data={usersData}
                            onEdit={handleEdit}
                            onDelete={handleDelete}
                            onCreate={handleOpenDialog}
                            contextMenu={true}
                        />
                        {
                            isDialogOpen &&
                            <PopupUser open={isDialogOpen} onOpen={handleCloseDialog} data={data} />
                        }
                    </CardContent>
                </Card>
            </ContentLayout>
        </>
    );
}