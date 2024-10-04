import { LoaderFunction, redirect } from "@remix-run/node";
import React from "react";

export const loader: LoaderFunction = (async ({ request }) => {

    return redirect("/dashboard");
});

export default function Index() {

    return (
        <></>
    );
}
