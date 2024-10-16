import {
	Users,
	Settings,
	LayoutGrid,
	LucideIcon,
	BookUser,
	MessageCircleHeart
} from "lucide-react";

type Submenu = {
	href: string;
	label: string;
	active: boolean;
	roles: string[];
};

type Menu = {
	href: string;
	label: string;
	active: boolean;
	icon: LucideIcon
	submenus: Submenu[];
	roles: string[];
};

type Group = {
	groupLabel: any;
	menus: Menu[];
	roles: string[];
};

export function getMenuList(pathname: string): Group[] {
	return [
		{
			groupLabel: "",
			roles: ['V_ADMIN', 'V_USER'],
			menus: [
				{
					href: "/dashboard",
					label: "Dashboard",
					active: pathname.includes("/dashboard"),
					icon: LayoutGrid,
					roles: [],
					submenus: []
				}
			]
		},
		{
			groupLabel: "Guests",
			roles: [],
			menus: [
				{
					href: "/guests",
					label: "Guest Management",
					active: pathname.includes("/guests"),
					icon: BookUser,
					roles: ['V_ADMIN', 'V_USER'],
					submenus: []
				},
				{
					href: "/greetings",
					label: "Greeting",
					active: pathname.includes("/greetings"),
					icon: MessageCircleHeart,
					roles: ['V_ADMIN', 'V_USER'],
					submenus: []
				}
			]
		},
		{
			groupLabel: "Settings",
			roles: ['V_ADMIN'],
			menus: [
				{
					href: "/users",
					label: "Users",
					active: pathname.includes("/users"),
					icon: Users,
					roles: ['V_ADMIN'],
					submenus: []
				},
				// {
				// 	href: "/account",
				// 	label: "Account",
				// 	active: pathname.includes("/account"),
				// 	icon: Settings,
				// 	roles: ['V_ADMIN'],
				// 	submenus: []
				// }
			]
		}
		// {
		// 	groupLabel: "Contents",
		// 	menus: [
		// 		{
		// 			href: "",
		// 			label: "Posts",
		// 			active: pathname.includes("/posts"),
		// 			icon: SquarePen,
		// 			submenus: [
		// 				{
		// 					href: "/posts",
		// 					label: "All Posts",
		// 					active: pathname === "/posts"
		// 				},
		// 				{
		// 					href: "/posts/new",
		// 					label: "New Post",
		// 					active: pathname === "/posts/new"
		// 				}
		// 			]
		// 		},
		// 		{
		// 			href: "/categories",
		// 			label: "Categories",
		// 			active: pathname.includes("/categories"),
		// 			icon: Bookmark,
		// 			submenus: []
		// 		},
		// 		{
		// 			href: "/tags",
		// 			label: "Tags",
		// 			active: pathname.includes("/tags"),
		// 			icon: Tag,
		// 			submenus: []
		// 		}
		// 	]
		// },
	];
}
