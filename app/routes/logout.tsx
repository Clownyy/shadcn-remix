import { redirect } from "@remix-run/node";
import { sessionCookie, stateCookie } from "~/sessions";

export const action = async () => {
    // Clear the JWT session cookie
    return redirect("/auth", {
      headers: {
        "Set-Cookie": `${await sessionCookie.serialize("", { maxAge: 0 })}, ${await stateCookie.serialize("", {maxAge: 0})}`, // Clears the cookie
      },
    });
  };