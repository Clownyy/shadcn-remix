import { ReactNode } from "react";
import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuShortcut, ContextMenuTrigger } from "../ui/context-menu";
import { PencilRuler, Trash2 } from "lucide-react";

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
    if(!contextMenu) {
        return (
            <>{children}</>
        )
    }
    return (
      <ContextMenu>
        <ContextMenuTrigger asChild>{children}</ContextMenuTrigger>
        <ContextMenuContent>
          <ContextMenuItem inset onClick={onEdit} className="text-xs">Edit <ContextMenuShortcut><PencilRuler size={14} /></ContextMenuShortcut></ContextMenuItem>
          <ContextMenuItem inset onClick={onDelete} className="text-xs">Delete <ContextMenuShortcut><Trash2 size={14}/></ContextMenuShortcut></ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>
    );
  };
  
  export default ContextMenuWrapper;