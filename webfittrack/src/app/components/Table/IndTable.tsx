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
import TableTopContent from "./TableTopContent";
import IndTrainingTableCell from "./IndTableCell";
import ViewIndModal from "../Modal/IndTraining/ViewIndModal";
import { CircularProgress } from "@nextui-org/react";
import styles from "./LoadingContainer.module.css";
import { IndTraining } from "../User/IndTraining";

const INITIAL_VISIBLE_COLUMNS = ["description", "date", "actions"];

export interface Column {
    name: string;
    uid: string;
    sortable?: boolean;
}

interface CustomTableProps {
    columns: Column[];
    data: IndTraining[]; // Заміна Gym на IndTraining
    refreshTable: () => void;
}

export const TableIndTrainings = ({
    columns,
    data,
    refreshTable,
}: CustomTableProps): JSX.Element => {
    const [indTrainings, setIndTrainings] = useState<IndTraining[]>([]); // Заміна Gym на IndTraining
    const [filterValue, setFilterValue] = useState("");
    const [selectedKeys, setSelectedKeys] = useState<Selection>(new Set([]));
    const [visibleColumns, setVisibleColumns] = useState<Selection>(new Set(INITIAL_VISIBLE_COLUMNS));
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [isViewModalOpen, setIsViewModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [selectedIndTrainingId, setSelectedIndTrainingId] = useState<string | null>(null);
    const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
        column: "description",
        direction: "ascending",
    });
    const [page, setPage] = useState(1);
    const [isLoading, setIsLoading] = useState(false);

    const hasSearchFilter = Boolean(filterValue);

    const handleView = (indTraining: IndTraining) => {
        console.log("View individual training:", indTraining);
        setSelectedIndTrainingId(indTraining.id.toString());
        setIsViewModalOpen(true);
    };

    const handleDelete = (indTraining: IndTraining) => {
        console.log("Delete individual training:", indTraining);
        setSelectedIndTrainingId(indTraining.id.toString());
        setIsDeleteModalOpen(true);
    };

    const handleCloseViewModal = () => {
        setIsViewModalOpen(false);
    };

    const handleCloseDeleteModal = () => {
        setIsDeleteModalOpen(false);
    };

    useEffect(() => {
        setIndTrainings(data);
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
        let filteredIndTrainings = [...indTrainings];
        if (hasSearchFilter) {
            filteredIndTrainings = filteredIndTrainings.filter((indTraining) => {
                if (indTraining.description !== undefined) {
                    return indTraining.description.toLowerCase().includes(filterValue.toLowerCase());
                }
                return false;
            });
        }
        return filteredIndTrainings;
    }, [indTrainings, hasSearchFilter, filterValue]);

    const pages = Math.ceil(filteredItems.length / rowsPerPage);

    const items = React.useMemo(() => {
        const start = (page - 1) * rowsPerPage;
        const end = start + rowsPerPage;
        return filteredItems.slice(start, end);
    }, [page, filteredItems, rowsPerPage]);

    const sortedItems = React.useMemo(() => {
        return [...items].sort((a, b) => {
            const first = a[sortDescriptor.column as keyof IndTraining] as string | number;
            const second = b[sortDescriptor.column as keyof IndTraining] as string | number;
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
            usersCount={indTrainings.length}
            role="IndTraining"
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
                                        <IndTrainingTableCell
                                            onView={handleView}
                                            onDelete={handleDelete}
                                            training={item}
                                            columnKey={columnKey}
                                        />
                                    </TableCell>
                                )}
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            )}
            {selectedIndTrainingId && (
                <ViewIndModal trainingId={Number(selectedIndTrainingId)} isOpen={isViewModalOpen} onClose={handleCloseViewModal} ></ViewIndModal>
            )}
            {/* {selectedIndTrainingId && (
                <ModalDeleteIndTraining
                    indTrainingId={selectedIndTrainingId}
                    refreshTable={handleRefreshTable}
                    isOpen={isDeleteModalOpen}
                    onClose={handleCloseDeleteModal}
                />
            )} */}
        </>
    );
};
