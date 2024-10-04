import { useFetcher } from "@remix-run/react";
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

export default function SignUpForm() {
    const fetcher = useFetcher()
    return (
        <Card>
            <CardHeader>
                <CardTitle>Welcome,</CardTitle>
                <CardDescription>
                    Sign up to continue
                </CardDescription>
            </CardHeader>

            <fetcher.Form method="post">
                <CardContent className="space-y-2">
                    <div className="space-y-1">
                        <input type="hidden" name="_action" value="signUp" />
                        <Label htmlFor="username">Username</Label>
                        <Input type="text" name="username" placeholder="Username" />
                    </div>
                    <div className="space-y-1">
                        <Label htmlFor="email">Email</Label>
                        <Input type="email" name="email" placeholder="Email" />
                    </div>
                    <div className="space-y-1">
                        <div className="grid grid-cols-2">
                            <div className="mr-4">
                                <Label htmlFor="firstName">First Name</Label>
                                <Input type="firstName" name="firstName" placeholder="First Name" />
                            </div>
                            <div>
                                <Label htmlFor="lastName">Last Name</Label>
                                <Input type="lastName" name="lastName" placeholder="Last Name" />
                            </div>
                        </div>
                    </div>
                </CardContent>
                <CardFooter>
                    <Button type="submit">Sign Up</Button>
                </CardFooter>
            </fetcher.Form>
        </Card>
    )
}