import { ActionFunction, json, redirect } from "@remix-run/node";
import { httpRequest } from "~/lib/helper";
import { sessionCookie } from "~/sessions";

export const action: ActionFunction = async ({ request }) => {
    const cookieHeader = request.headers.get("Cookie");
    const jwt = await sessionCookie.parse(cookieHeader);

    const formData = await request.formData();
    const actionType = formData.get("actionType");
    const id = formData.get("id");
    const email = formData.get("email");
    const login = formData.get("login");
    const firstName = formData.get("firstName");
    const lastName = formData.get("lastName")

    let data = {
        email: email,
        login: login,
        firstName: firstName,
        lastName: lastName
    }

    switch (actionType) {
        case "CREATE":
            return await doCreate(jwt, data)
        case "UPDATE":
            return await doUpdate(jwt, data, id)
        case "DELETE":
            return await doDelete(jwt, id)
        default:
            return json({ error: "Invalid Action Type", status: 405 }, { status: 405 })
    }
}

async function doDelete(jwt: any, id: any) {
    try {
        let response = await httpRequest(jwt, process.env.PUBLIC_API!, "users", "DELETE", id)
        return json({ success: "User successfully deleted!", status: 200 }, { status: 200 })
    } catch (err) {
        return json({ error: err, status: 500 }, { status: 500 })
    }
}

async function doCreate(jwt: any, data: any) {
    try {
        let response = await httpRequest(jwt, process.env.PUBLIC_API!, "users/createUser", "POST", data)
        return json({ success: "User successfully created!", status: 200 }, { status: 200 })
    } catch (err) {
        return json({ error: err?.message, status: err?.status }, { status: err?.status })
    }
}

async function doUpdate(jwt: any, data: any, id: any) {
    try {
        let response = await httpRequest(jwt, process.env.PUBLIC_API!, `users/${id}`, "PATCH", data)
        return json({ success: "User successfully created!", status: 200 }, { status: 200 })
    } catch (err) {
        return json({ error: err?.message, status: err?.status }, { status: err?.status })
    }
}

export default function User() {
    return (<></>);
}