import { ActionFunction, json, redirect } from "@remix-run/node";
import { httpRequest } from "~/lib/httpRequest";
import { sessionCookie, stateCookie } from "~/sessions";

export const action: ActionFunction = async ({ request }) => {
    const cookieHeader = request.headers.get("Cookie");
    const jwt = await sessionCookie.parse(cookieHeader);
    const userInfo = await stateCookie.parse(cookieHeader);

    const formData = await request.formData();
    const actionType = formData.get("actionType");
    const requestData = formData.get("requestData");
    const id = formData.get("id");
    const guestName = formData.get("guestName");
    const phoneNumber = formData.get("phoneNumber");

    let data;
    if (actionType == "CREATE_BULK") {
        data = {
            requestData: JSON.parse(requestData)
        };
    } else {
        data = {
            guestName: guestName,
            phoneNumber: phoneNumber,
            userId: userInfo.id
        }
    }

    switch (actionType) {
        case "CREATE":
            return await doCreate(jwt, data)
        case "UPDATE":
            return await doUpdate(jwt, data, id)
        case "DELETE":
            return await doDelete(jwt, id)
        case "CREATE_BULK":
            return await doCreateBulk(jwt, data)
        default:
            return json({ error: "Invalid Action Type", status: 405 }, { status: 405 })
    }
}

async function doCreateBulk(jwt: any, data: any) {
    try {
        let response = await httpRequest(jwt, process.env.PUBLIC_API!, "guests/bulk", "POST", data)
        return json({ success: `${response.count} Guest successfully created!`, status: 200 }, { status: 200 })
    } catch (err) {
        return json({ error: err?.message, status: 500 }, { status: 500 })
    }
}
async function doDelete(jwt: any, id: any) {
    try {
        let response = await httpRequest(jwt, process.env.PUBLIC_API!, "guests", "DELETE", id)
        return json({ success: "Guest successfully deleted!", status: 200 }, { status: 200 })
    } catch (err) {
        return json({ error: err?.message, status: 500 }, { status: 500 })
    }
}

async function doCreate(jwt: any, data: any) {
    try {
        let response = await httpRequest(jwt, process.env.PUBLIC_API!, "guests", "POST", data)
        return json({ success: "Guest successfully created!", status: 200 }, { status: 200 })
    } catch (err) {
        return json({ error: err?.message, status: err?.status }, { status: err?.status })
    }
}

async function doUpdate(jwt: any, data: any, id: any) {
    try {
        let response = await httpRequest(jwt, process.env.PUBLIC_API!, `guests/${id}`, "PATCH", data)
        return json({ success: "Guest successfully updated!", status: 200 }, { status: 200 })
    } catch (err) {
        return json({ error: err?.message, status: err?.status }, { status: err?.status })
    }
}

export default function Guest() {
    return (<></>);
}