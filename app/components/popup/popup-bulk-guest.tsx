import { useFetcher } from "@remix-run/react"
import { Button } from "../ui/button"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "../ui/dialog"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Textarea } from "../ui/textarea"
import { useRef } from "react"

interface PopupProperties {
    open: any,
    onOpen: any,
    handleSave: any,
    data: any
}

export function PopupBulkGuest({
    open,
    onOpen,
    handleSave,
    data = {}
}: PopupProperties) {
    const fetcher = useFetcher();
    const textAreaRef = useRef<HTMLTextAreaElement>(null);

    const handleSubmit = async () => {
        if(textAreaRef.current) {
            const valueText = textAreaRef.current.value;
            const arrayGuestName = valueText.split("\n");
            handleSave(arrayGuestName);
        }
        // console.log(data)
    }

    const formSchema = z.object({
        id: z.number(),
        // guestName: z.string().min(1, { message: "Guest Name is required" }),
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
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle>Guest Management</DialogTitle>
                    <DialogDescription>
                        Add multiple guest, put multiple guest on new line or press "Enter"
                    </DialogDescription>
                </DialogHeader>
                <Textarea ref={textAreaRef} className="w-full h-[500px] max-h-[80vh] p-4 rounded-md focus:outline-none" />
                <DialogFooter className="sm:justify-end">
                    <Button type="submit" onClick={handleSubmit} variant="default">
                        Save
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}