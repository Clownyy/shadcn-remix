import { DarkModeToggle } from "~/components/dark-mode-toggle";
import SignInForm from "~/components/form/sign-in";
import SignUpForm from "~/components/form/sign-up";
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
            <Tabs defaultValue="signin" className="w-[400px]">
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="signin">Sign In</TabsTrigger>
                    <TabsTrigger value="signup">Sign Up</TabsTrigger>
                </TabsList>
                <TabsContent value="signin">
                    <SignInForm />
                </TabsContent>
                <TabsContent value="signup">
                    <SignUpForm />
                </TabsContent>
            </Tabs>
        </>
    )
}