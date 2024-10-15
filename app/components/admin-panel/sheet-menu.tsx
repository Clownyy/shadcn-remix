import { MenuIcon } from "lucide-react";

import { Button } from "~/components/ui/button";
import { Menu } from "~/components/admin-panel/menu";
import {
	Sheet,
	SheetHeader,
	SheetContent,
	SheetTrigger,
	SheetTitle
} from "~/components/ui/sheet";
import { Link } from "@remix-run/react";

export function SheetMenu() {
	return (
		<Sheet>
			<SheetTrigger className="lg:hidden" asChild>
				<Button className="h-8" variant="outline" size="icon">
					<MenuIcon size={20} />
				</Button>
			</SheetTrigger>
			<SheetContent className="sm:w-72 px-3 h-full flex flex-col" side="left">
				<SheetHeader>
					<Button
						className="flex justify-center items-center pb-2 pt-1"
						variant="link"
						asChild
					>
						<Link to="/dashboard" className="flex items-center gap-2">
							<img
								src="/logo-light.png"
								alt="logo"
								width={130}
								height={130}
								className={"whitespace-nowrap text-lg font-bold transition-[transform,opacity,display] duration-300 ease-in-out dark:hidden"}
							/>
							<img
								src="/logo-dark.png"
								alt="logo"
								width={130}
								height={130}
								className={"hidden whitespace-nowrap text-lg font-bold transition-[transform,opacity,display] duration-300 ease-in-out dark:block"}
							/>
						</Link>
					</Button>
				</SheetHeader>
				<Menu isOpen />
			</SheetContent>
		</Sheet>
	);
}
