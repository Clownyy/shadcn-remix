import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    SortingState,
    useReactTable,
} from "@tanstack/react-table"

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "~/components/ui/table"
import { Button } from "../ui/button"
import React from "react"
import { DataTablePagination } from "./pagination-table"
import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuTrigger } from "../ui/context-menu"
import ContextMenuWrapper from "./context-menu"
import { ScrollArea, ScrollBar } from "../ui/scroll-area"
import { PlusIcon } from "lucide-react"
import { DataTableColumnHeader } from "./header-table"

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
    onEdit?: (item: any) => void;
    onDelete?: (item: any) => void;
    onCreate?: any
    allowAdding?: boolean;
    contextMenu?: boolean;
}

export function DataTable<TData, TValue>({
    columns,
    data,
    onEdit,
    onDelete,
    onCreate,
    allowAdding = true,
    contextMenu,
}: DataTableProps<TData, TValue>) {
    const [sorting, setSorting] = React.useState<SortingState>([])
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onSortingChange: setSorting,
        getSortedRowModel: getSortedRowModel(),
        state: {
            sorting
        }
    })
    return (
        <div>
            <div className="flex items-center justify-between py-2">
                &nbsp;
                <div className="flex gap-2">
                    {allowAdding && (
                        <Button
                            size="sm"
                            variant={"ghost"}
                            className="ml-auto hidden h-8 lg:flex"
                            onClick={onCreate}
                        >
                            <PlusIcon size={20} />
                        </Button>
                    )}
                    {/* {allowExporting && (
                        <Button
                            size="sm"
                            className="ml-auto hidden h-8 lg:flex"
                            onClick={exportExcel}
                        >
                            <Download size={20} className="mr-1" /> Export
                        </Button>
                    )} */}
                </div>
            </div>
            <div className="relative max-h-[60vh] overflow-auto whitespace-nowrap rounded-md border">
                <ScrollArea>
                    <Table className="text-sm text-current">
                        <TableHeader className="bg-secondary">
                            {table.getHeaderGroups().map((headerGroup) => (
                                <TableRow key={headerGroup.id}>
                                    {headerGroup.headers.map((header) => {
                                        return (
                                            <TableHead key={header.id}>
                                                {header.isPlaceholder
                                                    ? null
                                                    : flexRender(
                                                        <DataTableColumnHeader column={header.column} title={header.column.columnDef.header as string} />,
                                                        // header.column.columnDef.header,
                                                        header.getContext()
                                                    )}
                                            </TableHead>
                                        )
                                    })}
                                </TableRow>
                            ))}
                        </TableHeader>
                        <TableBody>
                            {table.getRowModel().rows?.length ? (
                                table.getRowModel().rows.map((row) => (
                                    <ContextMenuWrapper
                                        key={row.id}
                                        onEdit={onEdit ? () => onEdit(row) : undefined}
                                        onDelete={onDelete ? () => onDelete(row) : undefined}
                                        contextMenu={contextMenu}>
                                        <TableRow className="h-12"
                                            key={row.id}
                                            data-state={row.getIsSelected() && "selected"}
                                        >
                                            {row.getVisibleCells().map((cell) => (
                                                <TableCell key={cell.id} className="whitespace-nowrap overflow-hidden text-ellipsis">
                                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                                </TableCell>
                                            ))}
                                        </TableRow>
                                    </ContextMenuWrapper>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={columns.length} className="h-24 text-center">
                                        No results.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                    <ScrollBar orientation="horizontal" />
                </ScrollArea>
            </div>
            <div className="items-center justify-end space-x-2 py-4">
                <DataTablePagination table={table} />
            </div>
        </div>
    )
}
