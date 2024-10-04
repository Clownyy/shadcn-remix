import { ActionFunction, json } from "@remix-run/node";

export const action: ActionFunction = async ({ request }) => {
    // console.log(request.formData());
    const formData = await request.formData();
    console.log(formData.get("id"))
    return json({})
}
export default function Auth() {
    return (<></>);
}