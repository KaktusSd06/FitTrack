"use client";
import React, { useEffect, useState } from "react";
import {
    Table,
    TableHeader,
    TableColumn,
    TableBody,
    TableRow,
    TableCell,
    Pagination,
    Selection,
    SortDescriptor,
} from "@nextui-org/react";
import { Admin, Gym, Trainer, User, Service, Membership, GroupTraining } from "@/app/Interfaces/Interfaces";
import TableTopContent from "./TableTopContent";
import CustomTableCell from "./CustomTableCell";
import { useRole } from "@/app/Api/RoleProvider";

const INITIAL_VISIBLE_COLUMNS = ["firstName", "membershipName", "lastName", "name", "email", "actions"];

export interface Column {
    name: string;
    uid: string;
    sortable?: boolean;
}

interface CustomTableProps<T> {
    columns: Column[];
    data: T[];
    onEdit?: (obj: T) => void;
    onDelete?: (obj: T) => void;
    onCreate?: () => void;
}

export const CustomTable = <T extends User | Trainer | Admin | Gym | Service | Membership | GroupTraining>({
    columns,
    data,
    onEdit,
    onDelete,
    onCreate,
}: CustomTableProps<T>): JSX.Element => {
    const [objects, setDataJson] = useState<T[]>([]);
    const [filterValue, setFilterValue] = React.useState("");
    const [selectedKeys, setSelectedKeys] = React.useState<Selection>(new Set([]));
    const [visibleColumns, setVisibleColumns] = React.useState<Selection>(new Set(INITIAL_VISIBLE_COLUMNS));
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [sortDescriptor, setSortDescriptor] = React.useState<SortDescriptor>({
        column: "age",
        direction: "ascending",
    });
    const [page, setPage] = React.useState(1);
    const role = useRole();
    const hasSearchFilter = Boolean(filterValue);

    useEffect(() => {
        setDataJson(data);
    }, [data]);

    const headerColumns = React.useMemo(() => {
        if (visibleColumns === "all") return columns;
        return columns.filter((column) =>
            Array.from(visibleColumns).includes(column.uid)
        );
    }, [columns, visibleColumns]);

    const filteredItems = React.useMemo(() => {
        if (JSON.stringify(objects) === undefined || objects === null) return [];
        let filteredUsers = [...objects];

        console.log(JSON.stringify(objects));
        console.log(JSON.stringify([]));
        if (hasSearchFilter) {

            filteredUsers = filteredUsers.filter((user) => {
                if ('firstName' in user) {
                    user.firstName?.toLowerCase().includes(filterValue.toLowerCase());
                }
                else if ('name' in user) {
                    user.name?.toLowerCase().includes(filterValue.toLowerCase());
                }
                else if ('membershipName' in user) {
                    user.membershipName?.toLowerCase().includes(filterValue.toLowerCase());
                }
                else if ('description' in user) {
                    user.description?.toLowerCase().includes(filterValue.toLowerCase());
                }
            }
            );
        }
        return filteredUsers;
    }, [objects, hasSearchFilter, filterValue]);

    const pages = Math.ceil(filteredItems.length / rowsPerPage);

    const items = React.useMemo(() => {
        const start = (page - 1) * rowsPerPage;
        const end = start + rowsPerPage;
        return filteredItems.slice(start, end);
    }, [page, filteredItems, rowsPerPage]);

    const sortedItems = React.useMemo(() => {
        return [...items].sort((a, b) => {
            const first = a[sortDescriptor.column as keyof T] as number;
            const second = b[sortDescriptor.column as keyof T] as number;
            const cmp = first < second ? -1 : first > second ? 1 : 0;
            return sortDescriptor.direction === "descending" ? -cmp : cmp;
        });
    }, [sortDescriptor, items]);

    const topContent = (
        <TableTopContent
            filterValue={filterValue}
            onClear={() => setFilterValue("")}
            onSearchChange={(value) => setFilterValue(value || "")}
            visibleColumns={visibleColumns}
            setVisibleColumns={setVisibleColumns}
            columns={columns}
            onRowsPerPageChange={(e) => setRowsPerPage(Number(e.target.value))}
            usersCount={objects?.length || 0}
            role={role}
            onCreate={onCreate}
        />
    );

    const bottomContent = (
        <div className="flex justify-center items-center py-2 px-2">
            <Pagination
                isCompact
                showControls
                showShadow
                page={page}
                total={pages}
                onChange={setPage}
            />
        </div>
    );

    return (
        <Table
            aria-label="Example table with custom cells, pagination and sorting"
            isHeaderSticky
            bottomContent={bottomContent}
            bottomContentPlacement="outside"
            classNames={{
                wrapper: "max-h-[382px]",
                tr: "even:bg-[#f4f0e9] odd:bg-transparent",
            }}
            selectedKeys={selectedKeys}
            sortDescriptor={sortDescriptor}
            topContent={topContent}
            topContentPlacement="outside"
            onSelectionChange={setSelectedKeys}
            onSortChange={setSortDescriptor}
        >
            <TableHeader columns={headerColumns}>
                {(column) => (
                    <TableColumn key={column.uid} allowsSorting={column.sortable}>
                        {column.name}
                    </TableColumn>
                )}
            </TableHeader>
            <TableBody emptyContent="Не знайдено жодного запису" items={sortedItems}>
                {(item) => (
                    <TableRow key={item.id}>
                        {(columnKey) => (
                            <TableCell>
                                <CustomTableCell obj={item} columnKey={columnKey} onEdit={onEdit} onDelete={onDelete} />
                            </TableCell>
                        )}
                    </TableRow>
                )}
            </TableBody>
        </Table>
    );
};
