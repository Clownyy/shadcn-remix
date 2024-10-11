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
import { Guest, Response, User } from "~/type/types";

type LoaderData = {
    guestData: Guest[];
    userInfo: User;
}

export const loader: LoaderFunction = withAuth(async ({ request }) => {
    const cookieHeader = request.headers.get("Cookie");
    const userInfo = await stateCookie.parse(cookieHeader);

    const jwt = await sessionCookie.parse(cookieHeader);

    try {
        const guestsData = await httpRequest(jwt, process.env.PUBLIC_API!, `guests/get-by-user/${userInfo.id}`);
        return json({ userInfo, guestData: guestsData });
    } catch (error) {
        return json({ userInfo, guestData: [] });
    }
});

export const columns: ColumnDef<Guest>[] = [
    {
        accessorKey: "guestName",
        header: "Guest Name"
    },
    {
        accessorKey: "phoneNumber",
        header: "Phone Number"
    }
]

export default function Guests() {
    const fetcher = useFetcher<Response>();
    const [isDialogGuestOpen, setIsDialogGuestOpen] = useState(false);
    const [data, setData] = useState({});

    const useData = useLoaderData<LoaderData>();
    const userInfo = useData?.userInfo;
    const guestsData = useData?.guestData;

    const handleEdit = (row: any) => {
        handleOpenDialog();
        setData(row.original);
    }

    const handleOpenDialog = () => {
        setIsDialogGuestOpen(true);
        document.body.style.pointerEvents = "auto";
    };

    const handleCloseDialog = () => {
        setIsDialogGuestOpen(false);
        setData({});
        document.body.style.pointerEvents = "auto";
    };

    const handleDelete = (row: any) => {
        var data = row.original
        data.actionType = 'DELETE';
        fetcher.submit(data, { method: 'post', action: '/guest' })
    }

    const handleCreate = (data: any) => {
        if (data.id != null && data.id != 0) {
            data.actionType = 'UPDATE';
        } else {
            data.actionType = 'CREATE';
        }
        fetcher.submit(data, { method: 'post', action: '/guest' })
        handleCloseDialog();
    }

    // const onSelectedRow = (data: any) => {
    //     setSelectedRows(data);
    // }

    // async function generateLink() {
    //     let data = selectedRows;
    //     let baseurl = 'http://www.vitation.co.id/ines-iqbal/' //sample
    //     for(let guest of data) {
    //         let url = baseurl + encodeURIComponent(guest?.guestName)
    //     }
    // }

    // const isSubmitting = fetcher.state === "submitting";
    // if(isSubmitting) {
    //     console.log("loading")
    // }

    useEffect(() => {
        if (fetcher.state == "idle" && fetcher.data) {
            if (fetcher.data.error) {
                toast.error(fetcher.data.status, {
                    description: fetcher.data.error
                })
            } else {
                toast.success(fetcher.data.status, {
                    description: fetcher.data.success
                })
            }
        }
    }, [fetcher])

    return (
        <>
            <ContentLayout title="Guests" userInfo={userInfo}>
                <Card className="rounded-lg border-none mt-6">
                    <CardContent className="p-6">
                        <CardTitle>
                            <span className="text-2xl font-semibold">Guests</span>
                        </CardTitle>
                        <DataTable
                            columns={columns}
                            data={guestsData}
                            onEdit={handleEdit}
                            onDelete={handleDelete}
                            onCreate={handleOpenDialog}
                            allowSelection={true}
                            contextMenu={true}
                        />
                        {
                            isDialogGuestOpen &&
                            <PopupGuest open={isDialogGuestOpen} onOpen={handleCloseDialog} data={data} handleCreate={handleCreate} />
                        }
                    </CardContent>
                    {/* <CardFooter  className="sm:justify-end">
                        <Button onClick={generateLink} variant={"default"}>Bulk Generate Invitation</Button>
                    </CardFooter> */}
                </Card>
            </ContentLayout>
        </>
    );
}