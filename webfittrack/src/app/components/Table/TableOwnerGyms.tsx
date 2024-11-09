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
import { Gym } from "@/app/Interfaces/Interfaces";
import TableTopContent from "./TableTopContent";
import GymTableCell from "./GymTableCell";
import ModalEditGym from "../Modal/GymsModals/ModalEditGym/ModalEditGym"
import ModalDeleteGym from "../Modal/GymsModals/ModelDeleteGym/ModalDeleteGym"
import { CircularProgress } from "@nextui-org/react";
import styles from "./LoadingContainer.module.css";

const INITIAL_VISIBLE_COLUMNS = ["name", "location", "email", "actions"];

export interface Column {
  name: string;
  uid: string;
  sortable?: boolean;
}

interface CustomTableProps {
  columns: Column[];
  data: Gym[];
  refreshTable: () => void;
}

export const TableOwnerGyms = ({
  columns,
  data,
  refreshTable,
}: CustomTableProps): JSX.Element => {
  const [gyms, setGyms] = useState<Gym[]>([]);
  const [filterValue, setFilterValue] = useState("");
  const [selectedKeys, setSelectedKeys] = useState<Selection>(new Set([]));
  const [visibleColumns, setVisibleColumns] = useState<Selection>(new Set(INITIAL_VISIBLE_COLUMNS));
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedGymId, setSelectedGymId] = useState<string | null>(null);
  const [selectedOwnerId, setSelectedOwnerId] = useState<string | null>(null);
  const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
    column: "name",
    direction: "ascending",
  });
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false); // New loading state

  const hasSearchFilter = Boolean(filterValue);

  const handleEdit = (gym: Gym) => {
    console.log("Edit gym:", gym);
    setSelectedGymId(gym.id.toString());
    setSelectedOwnerId(gym.ownerId ? gym.ownerId.toString() : null);
    setIsEditModalOpen(true);
  };

  const handleDelete = (gym: Gym) => {
    console.log("Delete gym:", gym);
    setSelectedGymId(gym.id.toString());
    setSelectedOwnerId(gym.ownerId ? gym.ownerId.toString() : null);
    setIsDeleteModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
  };

  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };

  useEffect(() => {
    setGyms(data);
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
    let filteredGyms = [...gyms];
    if (hasSearchFilter) {
      filteredGyms = filteredGyms.filter((gym) => { if (gym.name !== undefined) gym.name.toLowerCase().includes(filterValue.toLowerCase()) }
      );
    }
    return filteredGyms;
  }, [gyms, hasSearchFilter, filterValue]);

  const pages = Math.ceil(filteredItems.length / rowsPerPage);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    return filteredItems.slice(start, end);
  }, [page, filteredItems, rowsPerPage]);

  const sortedItems = React.useMemo(() => {
    return [...items].sort((a, b) => {
      const first = a[sortDescriptor.column as keyof Gym] as string | number;
      const second = b[sortDescriptor.column as keyof Gym] as string | number;
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
      usersCount={gyms.length}
      role="Gym"
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
                    <GymTableCell onEdit={handleEdit} onDelete={handleDelete} gym={item} columnKey={columnKey} />
                  </TableCell>
                )}
              </TableRow>
            )}
          </TableBody>
        </Table>
      )}
      {selectedGymId && selectedOwnerId && (
        <ModalEditGym gymId={selectedGymId} refreshTable={handleRefreshTable} ownerId={selectedOwnerId} isOpen={isEditModalOpen} onClose={handleCloseEditModal} />
      )}
      {selectedGymId && (
        <ModalDeleteGym gymId={selectedGymId} refreshTable={handleRefreshTable} isOpen={isDeleteModalOpen} onClose={handleCloseDeleteModal} />
      )}
    </>
  );
};
