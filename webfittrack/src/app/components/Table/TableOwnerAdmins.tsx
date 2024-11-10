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
import { Admin } from "@/app/Interfaces/Interfaces";
import TableTopContent from "./TableTopContent";
import AdminTableCell from "./OwnerAdminTableCell";
import { CircularProgress } from "@nextui-org/react";
import styles from "./LoadingContainer.module.css";
import ModalEditAdmin from "@/app/components/Modal/AdminModals/ModalEditAdmin/ModuleEditAdmin"
import ModalDeleteAdmin from "@/app/components/Modal/AdminModals/ModalDeleteAdmin/ModalDeleteAdmin"

const INITIAL_VISIBLE_COLUMNS = ["firstName"];

export interface Column {
    name: string;
    uid: string;
    sortable?: boolean;
}

interface CustomTableProps {
    columns: Column[];
    data: Admin[];
    refreshTable: () => void;
}

export const TableOwnerAdmins = ({
    columns,
    data,
    refreshTable,
}: CustomTableProps): JSX.Element => {
    const [admins, setAdmins] = useState<Admin[]>([]);
    const [filterValue, setFilterValue] = useState("");
    const [selectedKeys, setSelectedKeys] = useState<Selection>(new Set([]));
    const [visibleColumns, setVisibleColumns] = useState<Selection>(new Set(INITIAL_VISIBLE_COLUMNS));
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [selectedAdminId, setSelectedAdminId] = useState<string | null>(null);

    const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
        column: "firstName",
        direction: "ascending",
    });
    const [page, setPage] = useState(1);
    const [isLoading, setIsLoading] = useState(false);

    const hasSearchFilter = Boolean(filterValue);

    const handleEdit = (admin: Admin) => {
        console.log("Edit admin:", admin);
        setSelectedAdminId(admin.id ? admin.id.toString() : null);
        setIsEditModalOpen(true);
    };

    const handleDelete = (admin: Admin) => {
        console.log("Delete admin:", admin);
        setSelectedAdminId(admin.id ? admin.id.toString() : null);
        setIsDeleteModalOpen(true);
    };

    const handleCloseEditModal = () => {
        setIsEditModalOpen(false);
    };

    const handleCloseDeleteModal = () => {
        setIsDeleteModalOpen(false);
    };

    useEffect(() => {
        setAdmins(data);
    }, [data]);


    const handleRefreshTable = async () => {
        setIsLoading(true);
        await refreshTable();
        setIsLoading(false);
    };

    const headerColumns = React.useMemo(() => {
        if (visibleColumns === "all") return columns;
        return columns.filter((column) =>
            Array.from(visibleColumns).includes(column.uid)
        );
    }, [columns, visibleColumns]);

    const filteredItems = React.useMemo(() => {
        let filteredAdmins = [...admins];
        if (hasSearchFilter) {
            filteredAdmins = filteredAdmins.filter((admin) => { if (admin.firstName !== undefined) admin.firstName.toLowerCase().includes(filterValue.toLowerCase()) }
            );
        }
        return filteredAdmins;
    }, [admins, hasSearchFilter, filterValue]);

    const pages = Math.ceil(filteredItems.length / rowsPerPage);

    const items = React.useMemo(() => {
        const start = (page - 1) * rowsPerPage;
        const end = start + rowsPerPage;
        return filteredItems.slice(start, end);
    }, [page, filteredItems, rowsPerPage]);

    const sortedItems = React.useMemo(() => {
        return [...items].sort((a, b) => {
            const first = a[sortDescriptor.column as keyof Admin] as string | number;
            const second = b[sortDescriptor.column as keyof Admin] as string | number;
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
            usersCount={admins.length}
            role="Admin"
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
        <>
            {isLoading ? (
                <div className={styles.LoadingContainer}>
                    <CircularProgress classNames={{ base: "w-full", indicator: "stroke-[--fulvous]" }} />
                </div>
            ) : (
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
                                        <AdminTableCell onEdit={handleEdit} onDelete={handleDelete} admin={item} columnKey={columnKey} />
                                    </TableCell>
                                )}
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            )}
            {selectedAdminId && (
                <ModalEditAdmin adminId={selectedAdminId} refreshTable={handleRefreshTable} isOpen={isEditModalOpen} onClose={handleCloseEditModal} />
            )}
            {selectedAdminId && (
                <ModalDeleteAdmin adminId={selectedAdminId} refreshTable={handleRefreshTable} isOpen={isDeleteModalOpen} onClose={handleCloseDeleteModal} />
            )}
        </>
    );
};
