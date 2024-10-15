import { useFetcher } from "@remix-run/react"
import { Button } from "../ui/button"
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "../ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "../ui/input"

interface PopupProperties {
    open: any,
    onOpen: any,
    handleCreate: any,
    data: any
}

export function PopupGuest({
    open,
    onOpen,
    handleCreate,
    data = {}
}: PopupProperties) {
    const fetcher = useFetcher();

    const handleSubmit = async (data: any) => {
        handleCreate(data);
    }

    const formSchema = z.object({
        id: z.number(),
        guestName: z.string().min(1, { message: "Guest Name is required" }),
        // phoneNumber: z.string().regex(/^628[1-9][0-9]{6,11}$/, { message: "Invalid phone number. ex: 628***" }),

    })
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            id: data.id ?? 0,
            guestName: data.guestName ?? "",
            phoneNumber: data.phoneNumber ?? "",
        }
    })
    return (
        <Dialog open={open} onOpenChange={onOpen}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Guest Management</DialogTitle>
                    <DialogDescription>
                        Management for your guests, click Save Changes when you've done
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
                        <FormField
                            control={form.control}
                            name="guestName"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Guest Name *</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Guest Name"
                                            type="text"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        {/* <FormField
                            control={form.control}
                            name="phoneNumber"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Phone Number</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Phone Number"
                                            type="text"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        /> */}
                        <DialogFooter className="sm:justify-end">
                            <DialogClose asChild>
                                <Button variant="outline">Cancel</Button>
                            </DialogClose>
                            <Button type="submit" variant="default">
                                Save changes
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}