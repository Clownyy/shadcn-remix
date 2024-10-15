import { cn } from "~/lib/utils";
import { useStore } from "~/hooks/use-store";
import { Button } from "~/components/ui/button";
import { Menu } from "~/components/admin-panel/menu";
import { useSidebarToggle } from "~/hooks/use-sidebar-toggle";
import { SidebarToggle } from "~/components/admin-panel/sidebar-toggle";
import { Link } from "@remix-run/react";
// import { Image } from "@radix-ui/react-avatar";

export function Sidebar() {
	const sidebar = useStore(useSidebarToggle, (state) => state);

	if (!sidebar) return null;

	return (
		<aside
			className={cn(
				"fixed left-0 top-0 z-20 h-screen -translate-x-full transition-[width] duration-300 ease-in-out lg:translate-x-0",
				sidebar?.isOpen === false ? "w-[90px]" : "w-72",
			)}
		>
			<SidebarToggle isOpen={sidebar?.isOpen} setIsOpen={sidebar?.setIsOpen} />
			{/* <div className="relative h-full flex flex-col px-3 py-4 overflow-y-auto shadow-md dark:shadow-zinc-800"> */}
			<div className="relative flex flex-col overflow-y-auto px-3 py-4 shadow-md dark:shadow-zinc-800">
				<Button
					className={cn(
						"mb-1 transition-transform duration-300 ease-in-out",
						sidebar?.isOpen === false ? "translate-x-1" : "translate-x-0",
					)}
					variant="link"
					asChild
				>
					<Link to="/dashboard" className="flex items-center gap-2">
						<img
							src="/logo-light.png"
							alt="logo"
							width={130}
							height={130}
							className={cn(
								"whitespace-nowrap text-lg font-bold transition-[transform,opacity,display] duration-300 ease-in-out dark:hidden",
								sidebar?.isOpen === false
									? "hidden -translate-x-96 opacity-0"
									: "translate-x-0 opacity-100",
							)}
						/>
						<img
							src="/logo-dark.png"
							alt="logo"
							width={130}
							height={130}
							className={cn(
								"hidden whitespace-nowrap text-lg font-bold transition-[transform,opacity,display] duration-300 ease-in-out dark:block",
								sidebar?.isOpen === false
									? "-translate-x-96 opacity-0 dark:hidden"
									: "translate-x-0 opacity-100",
							)}
						/>
						<img
							src="/logo.png"
							alt="logo"
							width={130}
							height={130}
							className={cn(
								"whitespace-nowrap text-lg font-bold transition-[transform,opacity,display] duration-300 ease-in-out",
								sidebar?.isOpen === false
									? "translate-x-0 opacity-100"
									: "hidden -translate-x-96 opacity-0",
							)}
						/>
					</Link>
				</Button>
				<Menu isOpen={sidebar?.isOpen} />
			</div>
		</aside>
	);
}
