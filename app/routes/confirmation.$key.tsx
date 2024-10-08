import { ActionFunction, json, LoaderFunction, redirect } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import axios from "axios";
import { DarkModeToggle } from "~/components/dark-mode-toggle";
import ConfirmationForm from "~/components/form/confirm";
import { withoutAuth } from "~/lib/auth";
import { httpRequest } from "~/lib/helper";
import { sessionCookie, stateCookie } from "~/sessions";

export const loader: LoaderFunction = withoutAuth(async ({ params }) => {
    return params;
});

export const action: ActionFunction = async ({ request }) => {
    const formData = await request.formData();
    const key = formData.get("key");
    const password = formData.get("password");
    const confirmPassword = formData.get("confirmPassword");

    return await doConfirm(key, password, confirmPassword);
}

async function doConfirm(key: any, password: any, confirmPassword: any) {
    try {
        let data = {
            password: password,
            confirmPassword: confirmPassword,
            key: key
        }
        let response = await axios.post(`${process.env.PUBLIC_API}auth/set-password`, data, {
            headers: {
                "Content-Type": "application/json",
            }
        })
        if (response.statusText == 'Created' || response.statusText == 'OK') {
            const cookie = await sessionCookie.serialize(response.data.id_token);
            const userInfo = await httpRequest(response.data.id_token, process.env.PUBLIC_API!, 'account', 'GET')
            const state = await stateCookie.serialize(userInfo);

            return redirect('/dashboard', {
                headers: {
                    "Set-Cookie": `${cookie}, ${state}`,
                }
            })
        } else {
            return json({ error: response.statusText, status: response.status }, { status: response.status })
        }
    } catch (error: any) {
        if (error.response) {
            return json({ error: error.response.statusText, status: error.response.status }, { status: 400 });
        }
        return json({ error: 'Failed to connect to server', status: 500 }, { status: 500 })
    }

}
export default function Confirmation() {
    const params = useLoaderData();

    return (
        <div className="w-full h-screen flex justify-center items-center">
            <div className="fixed top-8 right-8">
                <DarkModeToggle />
            </div>
            <div className="w-[400px]">
                <ConfirmationForm token={params} />
            </div>
        </div>
    )
}