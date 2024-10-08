import { Moon, Sun } from "lucide-react"
import { Theme, useTheme } from "remix-themes"

import { Button } from "./ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "./ui/dropdown-menu"


export function DarkModeToggle() {
    const [theme, setTheme] = useTheme()

    function changeTheme() {
        if (theme === Theme.DARK) {
            setTheme(Theme.LIGHT)
        } else {
            setTheme(Theme.DARK)
        }
    }
    return (
        <Button variant="ghost" size="icon" onClick={() => changeTheme()}>
            <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
        </Button>
    )
}