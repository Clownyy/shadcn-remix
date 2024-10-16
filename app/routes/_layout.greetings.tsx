import { json, LoaderFunction } from "@remix-run/node";
import { useFetcher, useLoaderData } from "@remix-run/react";
import { ContentLayout } from "~/components/admin-panel/content-layout";
import { Card, CardContent, CardTitle } from "~/components/ui/card";
import { withAuth } from "~/lib/auth";
import { sessionCookie, stateCookie } from "~/sessions";
import { ColumnDef } from "@tanstack/react-table"
import { DataTable } from "~/components/data-table/data-table";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { httpRequest } from "~/lib/httpRequest";
import { PopupGuest } from "~/components/popup/popup-guest";
import { Greeting, Guest, Response, User } from "~/type/types";
import { AddOn } from "~/type/interface";
import { MessageCircleMore, Upload } from "lucide-react";
import { PopupMessage } from "~/components/popup/popup-message";
import { PopupBulkGuest } from "~/components/popup/popup-bulk-guest";
import { useLoading } from "~/hooks/loading-context";
import { Badge } from "~/components/ui/badge";

type LoaderData = {
    greetingsData: Greeting[];
}

export const loader: LoaderFunction = withAuth(async ({ request }) => {
    const cookieHeader = request.headers.get("Cookie");
    const userInfo = await stateCookie.parse(cookieHeader);

    const jwt = await sessionCookie.parse(cookieHeader);

    try {
        const guestsData = await httpRequest(jwt, process.env.PUBLIC_API!, `greetings/get-by-user/${userInfo.id}`);
        return json({ greetingsData: guestsData });
    } catch (error) {
        return json({ greetingsData: [] });
    }
});

export const columns: ColumnDef<Greeting>[] = [
    {
        accessorKey: "name",
        header: "From",
    },
    {
        accessorKey: "greeting",
        header: "Greeting"
    },
    {
        accessorKey: "attendanceConfirmation",
        header: "Attendance",
        cell: ({ row }) => {
            console.log(row.getVisibleCells())
            const presence = row.original.attendanceConfirmation
            if (presence) {
                return <Badge variant={"success"}>Present</Badge>
            }
            return <Badge variant={"destructive"}>Not Present</Badge>
        }
    },
]

export default function Greetings() {
    const fetcher = useFetcher<Response>();

    const { setLoading } = useLoading();
    const { loading } = useLoading();

    const useData = useLoaderData<LoaderData>();
    const greetingsData = useData?.greetingsData;


    const handleDelete = (row: any) => {
        var data = row.original
        data.actionType = 'DELETE';
        fetcher.submit(data, { method: 'post', action: '/greeting' })
        setLoading(true)
    }

    useEffect(() => {
        if (fetcher.state == "idle" && fetcher.data) {
            if (fetcher.data.error) {
                toast.error(fetcher.data.status, {
                    description: fetcher.data.error
                })
                setLoading(false);
            } else {
                toast.success(fetcher.data.status, {
                    description: fetcher.data.success
                })
                setLoading(false);
            }
        }
    }, [fetcher])

    return (
        <>
            <ContentLayout title="Greetings">
                <Card className="rounded-lg border-none mt-6">
                    <CardContent className="p-6">
                        <CardTitle>
                            <span className="text-2xl font-semibold">Greetings</span>
                        </CardTitle>
                        <DataTable
                            columns={columns}
                            data={greetingsData}
                            onDelete={handleDelete}
                            allowSelection={true}
                            allowAdding={false}
                            allowEdit={false}
                            allowDelete={true}
                        />
                    </CardContent>
                </Card>
            </ContentLayout>
        </>
    );
}