import { UserNav } from "~/components/admin-panel/user-nav";
import { SheetMenu } from "~/components/admin-panel/sheet-menu";
import { DarkModeToggle } from "../dark-mode-toggle";
import { User } from "~/type/types";
import { useEffect, useState } from "react";

interface NavbarProps {
	title: string;
}

export function Navbar({ title }: NavbarProps) {
	const [currentDateTime, setCurrentDateTime] = useState<string>("");

	useEffect(() => {
		const updateDateTime = () => {
			const now = new Date();
			const formattedDate = now.toLocaleString("en-US", {
				weekday: "long",
				year: "numeric",
				month: "long",
				day: "numeric",
				hour: "numeric",
				minute: "numeric",
				second: "numeric",
			});
			setCurrentDateTime(formattedDate);
		};
		const intervalId = setInterval(updateDateTime, 1000);
		return () => clearInterval(intervalId);
	}, []);
	return (
		<header className="sticky top-0 z-10 w-full bg-background/95 shadow backdrop-blur supports-[backdrop-filter]:bg-background/60 dark:shadow-secondary">
			<div className="mx-4 sm:mx-8 flex h-14 items-center">
				<div className="flex items-center space-x-4 lg:space-x-0">
					<SheetMenu />
					<span className="font-medium text-sm">{currentDateTime}</span>
				</div>
				<div className="flex flex-1 items-center justify-end">
					<div>
						<DarkModeToggle />
					</div>
					<div className="ml-2">
						<UserNav />
					</div>
				</div>
			</div>
		</header>
	);
}
