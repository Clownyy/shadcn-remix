import { DarkModeToggle } from "~/components/dark-mode-toggle";
import SignInForm from "~/components/form/sign-in";
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "~/components/ui/tabs"

export default function LoginPage() {
    return (
        <>
            <div className="fixed top-8 right-8">
                <DarkModeToggle />
            </div>
            <div className="w-[400px]">
                <SignInForm />
            </div>
        </>
    )
}