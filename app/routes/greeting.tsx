import { ActionFunction, json } from "@remix-run/node"
import { httpRequest } from "~/lib/httpRequest"
import { sessionCookie } from "~/sessions";

export const action: ActionFunction = async ({ request }) => {
    const cookieHeader = request.headers.get("Cookie");
    const jwt = await sessionCookie.parse(cookieHeader);

    const formData = await request.formData();
    const actionType = formData.get("actionType");
    const id = formData.get("id");

    let data = {}

    switch (actionType) {
        case "DELETE":
            return await doDelete(jwt, id)
        default:
            return json({ error: "Invalid Action Type", status: 405 }, { status: 405 })
    }
}
async function doDelete(jwt: any, id: any) {
    try {
        let response = await httpRequest(jwt, process.env.PUBLIC_API!, "greetings", "DELETE", id)
        return json({ success: "Greeting successfully deleted!", status: 200 }, { status: 200 })
    } catch (err) {
        return json({ error: err?.message, status: 500 }, { status: 500 })
    }
}