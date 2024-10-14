import { redirect, useFetcher, useNavigate } from "@remix-run/react";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import { Button } from "~/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "~/components/ui/card"
import { Input } from "~/components/ui/input"
import { Label } from "~/components/ui/label"
import { Response } from "~/type/types";
import { useLoading } from "../../hooks/loading-context";

export default function SignInForm() {
    const fetcher = useFetcher<Response>()

    const { setLoading } = useLoading();
    const { loading } = useLoading();

    useEffect(() => {
        if (fetcher.state == "idle" && fetcher.data) {
            if (fetcher.data.error) {
                toast.error(fetcher.data.status, {
                    description: fetcher.data.error
                })
                setLoading(false);
            } else if (fetcher.data.success) {
                toast.success(fetcher.data.status, {
                    description: fetcher.data.success
                })
            }
        }
    }, [fetcher])

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);
        fetcher.submit(formData, { method: 'post', action: '/auth' })
        setLoading(true);
    }
    return (
        <Card>
            <CardHeader>
                <CardTitle>Welcome to Vitation,</CardTitle>
                <CardDescription>
                    Sign in to continue
                </CardDescription>
            </CardHeader>

            <fetcher.Form onSubmit={handleSubmit}>
                <CardContent className="space-y-2">
                    <div className="space-y-1">
                        <input type="hidden" name="_action" value="signIn" />
                        <Label htmlFor="username">Username</Label>
                        <Input type="text" name="username" placeholder="Username" />
                    </div>
                    <div className="space-y-1">
                        <Label htmlFor="password">Password</Label>
                        <Input type="password" name="password" placeholder="Password" />
                    </div>
                </CardContent>
                <CardFooter className="sm:justify-end">
                    <Button type="submit" disabled={fetcher.state == "submitting"}>{loading ? "Logging in..." : "Login"}</Button>
                </CardFooter>
            </fetcher.Form>
        </Card>
    )
}