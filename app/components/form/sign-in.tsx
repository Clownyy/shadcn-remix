import { useFetcher } from "@remix-run/react";
import React, { useEffect } from "react";
import { toast } from "sonner";
import { Button, buttonVariants } from "~/components/ui/button";
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

export default function SignInForm() {
    const fetcher = useFetcher()

    useEffect(() => {
        if (fetcher.state == "idle" && fetcher.data) {
            toast.error(fetcher.data.status, {
                description: fetcher.data.error
            })
        }
    })
    
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);
        fetcher.submit(formData, { method: 'post', action: '/auth' })
    }
    return (
        <Card>
            <CardHeader>
                <CardTitle>Welcome,</CardTitle>
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
                        <Input type="password" name="password" placeholder="password" />
                    </div>
                </CardContent>
                <CardFooter>
                    <Button type="submit">Login</Button>
                </CardFooter>
            </fetcher.Form>
        </Card>
    )
}