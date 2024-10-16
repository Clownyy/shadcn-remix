import { ReactNode, useState } from "react";
import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuShortcut, ContextMenuTrigger } from "../ui/context-menu";
import { LucideIcon, PencilRuler, Trash2 } from "lucide-react";
import AlertDeleteDialog from "./alert-dialog";
import { AddOn } from "~/type/interface";

interface ContextMenuWrapperProps {
	children: ReactNode;
	onEdit?: () => void;
	onDelete?: () => void;
	allowEdit?: boolean;
	allowDelete?: boolean;
	addOns?: AddOn[]
	rowData?: any;
}


const ContextMenuWrapper: React.FC<ContextMenuWrapperProps> = ({
	children,
	onEdit,
	onDelete,
	allowEdit = false,
	allowDelete = false,
	addOns,
	rowData
}) => {

	const [isDialogOpen, setIsDialogOpen] = useState(false);
	const openDeleteDialog = () => {
		setIsDialogOpen(true);
	};

	const confirmDelete = () => {
		onDelete();
	};

	if (!allowEdit && !allowDelete && !addOns) {
		return (
			<>{children}</>
		)
	}
	return (
		<>
			<ContextMenu modal={false}>
				<ContextMenuTrigger asChild>{children}</ContextMenuTrigger>
				<ContextMenuContent>
					{allowEdit &&
						<ContextMenuItem
							inset
							onClick={onEdit}
							className="-ml-6 text-xs">
							Edit
							<ContextMenuShortcut>
								<PencilRuler size={14} />
							</ContextMenuShortcut>
						</ContextMenuItem>
					}
					{allowDelete &&
						<ContextMenuItem
							inset
							onClick={() => { openDeleteDialog() }}
							className="-ml-6 text-xs">
							Delete
							<ContextMenuShortcut>
								<Trash2 size={14} />
							</ContextMenuShortcut>
						</ContextMenuItem>
					}
					{addOns && addOns.map(({ name, icon: Icon, onClick }, index) => (
						<ContextMenuItem
							key={index}
							inset
							onClick={() => {
								if (onClick) {
									onClick(rowData); // Call onClick only if it's defined
								}
							}}
							className="-ml-6 text-xs w-auto">
							{name}
							<ContextMenuShortcut className="ml-3">
								<Icon size={14} />
							</ContextMenuShortcut>
						</ContextMenuItem>
					))}
				</ContextMenuContent>
			</ContextMenu>
			<AlertDeleteDialog
				alertOpen={isDialogOpen}
				setAlertOpen={setIsDialogOpen}
				onDelete={confirmDelete}
			/>
		</>
	);
};

export default ContextMenuWrapper;