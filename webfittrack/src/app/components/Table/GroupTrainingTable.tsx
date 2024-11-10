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
import { DateValue } from "@internationalized/date";
import { GroupTraining } from "@/app/Interfaces/Interfaces";
import CustomTableCell from "./CustomTableCell";
import { useRole } from "@/app/Api/RoleProvider";
import GroupTrainingTopContent from "./GroupTrainingTopContent";

const INITIAL_VISIBLE_COLUMNS = ["firstName", "lastName", "name", "email", "actions"];

export interface Column {
    name: string;
    uid: string;
    sortable?: boolean;
}

interface GroupTrainingTableProps {
    columns: Column[];
    data: GroupTraining[];
    onEdit?: (obj: GroupTraining) => void;
    onDelete?: (obj: GroupTraining) => void;
}

export const GroupTrainingTable = ({
    columns,
    data,
    onEdit,
    onDelete,
}: GroupTrainingTableProps): JSX.Element => {
    const [objects, setDataJson] = useState<GroupTraining[]>([]);
    const [startvalue, setStartValue] = useState<DateValue | null>(null);
    const [finalvalue, setFinalValue] = useState<DateValue | null>(null);
    const [selectedKeys, setSelectedKeys] = React.useState<Selection>(new Set([]));
    const [visibleColumns, setVisibleColumns] = React.useState<Selection>(new Set(INITIAL_VISIBLE_COLUMNS));
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [sortDescriptor, setSortDescriptor] = React.useState<SortDescriptor>({
        column: "age",
        direction: "ascending",
    });
    const [page, setPage] = React.useState(1);
    const role = useRole();
    const hasSearchFilter = Boolean(startvalue && finalvalue);

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
        let filteredUsers = [...objects];

        if (hasSearchFilter && startvalue && finalvalue) {
            const formattedStart = formatDate(startvalue);
            const formattedEnd = formatDate(finalvalue);

            filteredUsers = filteredUsers.filter((user) => {
                const userDate = user.date;
                return userDate >= formattedStart && userDate <= formattedEnd;
            });
        }

        return filteredUsers;
    }, [objects, hasSearchFilter, startvalue, finalvalue]);

    const pages = Math.ceil(filteredItems.length / rowsPerPage);
    const formatDate = (date: DateValue | null): string => {
        if (!date) return "";

        const jsDate = date.toDate("UTC");
        const day = String(jsDate.getDate()).padStart(2, "0");
        const month = String(jsDate.getMonth() + 1).padStart(2, "0");
        const year = jsDate.getFullYear();

        return `${year}-${month}-${day}`;
    };
    const items = React.useMemo(() => {
        const start = (page - 1) * rowsPerPage;
        const end = start + rowsPerPage;
        return filteredItems.slice(start, end);
    }, [page, filteredItems, rowsPerPage]);

    const sortedItems = React.useMemo(() => {
        return [...items].sort((a, b) => {
            const first = a[sortDescriptor.column as keyof GroupTraining] as number;
            const second = b[sortDescriptor.column as keyof GroupTraining] as number;
            const cmp = first < second ? -1 : first > second ? 1 : 0;
            return sortDescriptor.direction === "descending" ? -cmp : cmp;
        });
    }, [sortDescriptor, items]);
    const handleDatePeriodChange = (startDate: DateValue | null, endDate: DateValue | null) => {
        setStartValue(startDate);
        setFinalValue(endDate);
        // Handle the date period data as needed
    };
    const topContent = (
        <GroupTrainingTopContent
            onDatePeriodChange={handleDatePeriodChange}
            visibleColumns={visibleColumns}
            setVisibleColumns={setVisibleColumns}
            columns={columns}
            onRowsPerPageChange={(e) => setRowsPerPage(Number(e.target.value))}
            usersCount={objects.length}
            role={role}
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
