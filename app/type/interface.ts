import { LucideIcon } from "lucide-react";

export interface AddOn {
	name: string,
	onClick?: (rowData: any) => void,
	icon: LucideIcon
}