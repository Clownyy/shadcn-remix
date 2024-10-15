import { useFetcher } from "@remix-run/react"
import { Button } from "../ui/button"
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "../ui/dialog"
import { Textarea } from "../ui/textarea"
import { useRef, useState } from "react"

interface PopupProperties {
    open: any,
    onOpen: any,
    data: any
}

export function PopupMessage({
    open,
    onOpen,
    data = ""
}: PopupProperties) {
    const textAreaRef = useRef(null);
    const [copyStatus, setCopyStatus] = useState("Copy Message");
    const [disabled, setDisabled] = useState(false);

    const handleCopy = () => {
        if (textAreaRef.current) {
            textAreaRef.current.select(); // Select the textarea content
            document.execCommand("copy"); // Copy the selected text
            setCopyStatus("Copied!"); // Change the button text to 'Copied!'
            setDisabled(true);

            // Revert the button text back to 'Copy' after 2 seconds
            setTimeout(() => {
                setCopyStatus("Copy Message");
                setDisabled(false);
            }, 2000);
        }
    }
    return (
        <Dialog open={open} onOpenChange={onOpen}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Invitation Message</DialogTitle>
                    <DialogDescription>
                        Copy and share to your guest
                    </DialogDescription>
                </DialogHeader>
                <Textarea ref={textAreaRef} readOnly value={data} className="w-full h-[500px] max-h-[80vh] p-4 rounded-md focus:outline-none" />
                <DialogFooter className="sm:justify-end">
                    {/* <DialogClose asChild>
                        <Button variant="outline">Cancel</Button>
                    </DialogClose> */}
                    <Button type="submit" onClick={handleCopy} variant="default" disabled={disabled}>
                        {copyStatus}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}