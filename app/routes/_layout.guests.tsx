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
import { AddOn } from "~/type/interface";
import { MessageCircleMore, Upload } from "lucide-react";
import { PopupMessage } from "~/components/popup/popup-message";
import { PopupBulkGuest } from "~/components/popup/popup-bulk-guest";
import { useLoading } from "~/hooks/loading-context";

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
    const [isDialogMessageOpen, setIsDialogMessageOpen] = useState(false);
    const [isDialogBulkOpen, setIsDialogBulkOpen] = useState(false);
    const [data, setData] = useState({});
    const [msg, setMsg] = useState({});
    const [bulk, setBulk] = useState({});

    const { setLoading } = useLoading();
    const { loading } = useLoading();

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

    const handleOpenDialogMsg = (data: any) => {
        setIsDialogMessageOpen(true);
        document.body.style.pointerEvents = "auto";
        setMsg(data)
    };

    const handleCloseDialogMsg = () => {
        setIsDialogMessageOpen(false);
        setMsg({});
        document.body.style.pointerEvents = "auto";
    };

    const handleOpenDialogBulk = (data: any) => {
        setIsDialogBulkOpen(true);
        document.body.style.pointerEvents = "auto";
        setBulk(data)
    };

    const handleCloseDialogBulk = () => {
        setIsDialogBulkOpen(false);
        setBulk({});
        document.body.style.pointerEvents = "auto";
    };

    const handleDelete = (row: any) => {
        var data = row.original
        data.actionType = 'DELETE';
        fetcher.submit(data, { method: 'post', action: '/guest' })
        setLoading(true)
    }

    const handleCreate = (data: any) => {
        if (data.id != null && data.id != 0) {
            data.actionType = 'UPDATE';
        } else {
            data.actionType = 'CREATE';
        }
        if (!data.phoneNumber) {
            data.phoneNumber = '0'
        }
        fetcher.submit(data, { method: 'post', action: '/guest' })
        handleCloseDialog();
    }

    const handleBulkSubmit = (data: any) => {
        let arrData = []
        for (let val of data) {
            let submit = {
                guestName: val,
                phoneNumber: "0",
                userId: userInfo.id
            }
            arrData.push(submit)
        }
        let dataSubmit = {
            actionType: 'CREATE_BULK',
            requestData: JSON.stringify(arrData)
        }
        fetcher.submit(dataSubmit, { method: 'POST', action: '/guest' })
        handleCloseDialogBulk();
        setLoading(true);
    }

    const handleGenerate = (row: any) => {
        const data = row.original;
        let baseurl = 'https://vitation.vercel.app/ines-iqbal?to='
        let url = baseurl + encodeURIComponent(data.guestName)
        const messageTemplate = `Bismillahirrahmaanirrahiim

Teruntuk Bapak/Ibu/Saudara/i: **${data.guestName}**

Assalamu'alaikum Warahmatullahi Wabarakatuh,

Segala puji bagi Allah yang mempertemukan dua jiwa yang saling mencari, mempertemukan kami 'tuk mengikat janji dalam menjemput ridho ilahi.

Bersamaan dengan datangnya undangan ini, tanpa mengurangi rasa hormat, kami bermaksud mengundang saudara/i untuk hadir dan memberikan doa restu dalam acara pernikahan kami :

**Ines Suraya & Muhammad Iqbal**

🔗Untuk info lengkap terkait acara bisa diakses pada tautan berikut:
${url}

Merupakan kebahagiaan bagi kami jika bapak/ibu/saudara/i bisa ikut menjadi bagian dalam hari Bahagia kami, serta memberikan doa terbaik untuk kami.

بَارَكَ اللَّهُ لَكَ وَبَارَكَ عَلَيْكَ وَجَمَعَ بَيْنَكُمَا فِى خَيْرٍ

Sekian undangan ini kami tulis. Mohon maaf atas keterbatasan kami dalam menyampaikan undangan. 
Terima kasih.

Wassalamu'alaikum Warahmatullahi Wabarakatuh.

Hormat Kami yang berbahagia,
Ines & Iqbal

==========================

Dikarenakan undangan ini bersifat pribadi, kami memohon dengan kerendahan hati untuk tidak meneruskan undangan ini kepada yang lain.🙏🏻`


        handleOpenDialogMsg(messageTemplate)
    }

    const addOns: AddOn[] = [
        {
            name: 'Generate Invitation',
            onClick: handleGenerate,
            icon: MessageCircleMore
        }
    ]

    const toolbar: AddOn[] = [
        {
            name: 'Bulk Guest',
            onClick: handleOpenDialogBulk,
            icon: Upload
        }
    ]

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
                            addOns={addOns}
                            toolbar={toolbar}
                        />
                        {
                            isDialogGuestOpen &&
                            <PopupGuest open={isDialogGuestOpen} onOpen={handleCloseDialog} data={data} handleCreate={handleCreate} />
                        }
                        {
                            isDialogMessageOpen &&
                            <PopupMessage open={isDialogMessageOpen} onOpen={handleCloseDialogMsg} data={msg} />
                        }
                        {
                            isDialogBulkOpen &&
                            <PopupBulkGuest open={isDialogBulkOpen} onOpen={handleCloseDialogBulk} data={bulk} handleSave={handleBulkSubmit} />
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