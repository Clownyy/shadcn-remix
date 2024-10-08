import { ReactNode, useState } from "react";
import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuShortcut, ContextMenuTrigger } from "../ui/context-menu";
import { PencilRuler, Trash2 } from "lucide-react";
import AlertDeleteDialog from "./alert-dialog";

interface ContextMenuWrapperProps {
	children: ReactNode;
	onEdit?: () => void;
	onDelete?: () => void;
	contextMenu?: boolean;
}

const ContextMenuWrapper: React.FC<ContextMenuWrapperProps> = ({
	children,
	onEdit,
	onDelete,
	contextMenu = true,
}) => {

	const [isDialogOpen, setIsDialogOpen] = useState(false);
	const openDeleteDialog = () => {
		setIsDialogOpen(true);
        document.body.style.pointerEvents = "auto";
	};

	const confirmDelete = () => {
		onDelete();
	};

	if (!contextMenu) {
		return (
			<>{children}</>
		)
	}
	return (
		<>
			<ContextMenu>
				<ContextMenuTrigger asChild>{children}</ContextMenuTrigger>
				<ContextMenuContent>
					<ContextMenuItem
						inset
						onClick={onEdit}
						className="-ml-6 text-xs">
						Edit
						<ContextMenuShortcut>
							<PencilRuler size={14} />
						</ContextMenuShortcut>
					</ContextMenuItem>
					<ContextMenuItem inset onClick={() => { openDeleteDialog() }} className="-ml-6 text-xs">Delete <ContextMenuShortcut><Trash2 size={14} /></ContextMenuShortcut></ContextMenuItem>
				</ContextMenuContent>
			</ContextMenu>
			<AlertDeleteDialog
				alertOpen={isDialogOpen}
				setAlertOpen={setIsDialogOpen}
				onDelete={confirmDelete}  // Confirm the deletion action
			/>
		</>
	);
};

export default ContextMenuWrapper;