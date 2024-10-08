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
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useEffect } from "react";
import { toast } from "sonner";

export default function ConfirmationForm({ token }: any) {
    const fetcher = useFetcher()

    const formSchema = z.object({
        password: z.string().regex(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,50}/,
            { message: "Password must be 8-50 characters long, include at least one digit, one lowercase letter, and one uppercase letter." }
        ),
        confirmPassword: z.string(),
    }).refine((data) => data.password === data.confirmPassword, {
        message: "Password does not match!",
        path: ["confirmPassword"]
    })

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            password: "",
            confirmPassword: ""
        }
    })

    const handleSubmit = async (data: any) => {
        // console.log(data);
        data.key = token.key
        fetcher.submit(data, { method: 'post', action: '/confirmation/'+token.key })
    }

    useEffect(() => {
        if (fetcher.state == "idle" && fetcher.data) {
            if (fetcher.data.error) {
                toast.error(fetcher.data.status, {
                    description: fetcher.data.error
                })
            } else {
                toast.success(fetcher.data.status, {
                    description: fetcher.data.success
                })
            }
        }
    }, [fetcher])
    return (
        <Card>
            <CardHeader>
                <CardTitle>Welcome,</CardTitle>
                <CardDescription>
                    Please set your password below
                </CardDescription>
            </CardHeader>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
                    <CardContent>
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Password *</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Password"
                                            type="password"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="confirmPassword"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Confirm Password *</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Confirm Password"
                                            type="password"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </CardContent>
                    <CardFooter className="sm:justify-end">
                        <Button type="submit">Confirm</Button>
                    </CardFooter>
                </form>
            </Form>
        </Card>
    )
}