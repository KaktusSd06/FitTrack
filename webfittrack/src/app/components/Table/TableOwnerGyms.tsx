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
import UserTableCell from "./UserTableCell ";

const INITIAL_VISIBLE_COLUMNS = ["name", "location", "email", "actions"];

export interface Column {
  name: string;
  uid: string;
  sortable?: boolean;
}

interface CustomTableProps {
  columns: Column[];
  data: Gym[];
}

export const TableOwnerGyms = ({
  columns,
  data,
}: CustomTableProps): JSX.Element => {
  const [gyms, setGyms] = useState<Gym[]>([]);
  const [filterValue, setFilterValue] = useState("");
  const [selectedKeys, setSelectedKeys] = useState<Selection>(new Set([]));
  const [visibleColumns, setVisibleColumns] = useState<Selection>(new Set(INITIAL_VISIBLE_COLUMNS));
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
    column: "name",
    direction: "ascending",
  });
  const [page, setPage] = useState(1);

  const hasSearchFilter = Boolean(filterValue);

  useEffect(() => {
    setGyms(data);
  }, [data]);

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
                <UserTableCell user={item} columnKey={columnKey} />
              </TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};
