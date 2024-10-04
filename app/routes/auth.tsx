import { ActionFunction, json, LoaderFunction, redirect } from "@remix-run/node";
import axios from "axios";
import { toast } from "sonner";
import { withoutAuth } from "~/lib/auth";
import { httpRequest } from "~/lib/helper";
import LoginPage from "~/pages/login";
import { sessionCookie, stateCookie } from "~/sessions";

export const loader: LoaderFunction = withoutAuth(async ({ request }) => {

    return null;
});


export const action: ActionFunction = async ({ request }) => {
    const formData = await request.formData();
    const actionType = formData.get("_action");
    const username = formData.get("username");
    const password = formData.get("password");
    const email = formData.get("email");
    const firstName = formData.get("firstName")
    const lastName = formData.get("lastName")

    if (actionType === "signIn") {
        return await doAuth(username, password);
    } else {
        return await doRegis(username, email, firstName, lastName);
    }
}

async function doAuth(username: any, password: any) {
    try {
        let data = {
            username: username,
            password: password,
            rememberMe: false
        }
        let response = await axios.post('http://localhost:4300/auth', data, {
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

async function doRegis(username: any, email: any, firstName: any, lastName: any) {
    console.log("doRegis: " + username + " " + email + " " + firstName + " " + lastName)
}

export default function Auth() {
    return (
        <div className="w-full h-screen flex justify-center items-center">
            <LoginPage />
        </div>
    )
}