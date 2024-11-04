"use client";
import React, { useEffect, useState } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Input,
  Button,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Pagination,
  Selection,
  SortDescriptor,
  Tooltip,
} from "@nextui-org/react";
import { User } from "@/app/Interfaces/Interfaces"
import { DeleteIcon } from "./DeleteIcon";
import { EditIcon } from "./EditIcon";
import { Key } from "@react-types/shared";


const INITIAL_VISIBLE_COLUMNS = ["name", "actions"];


interface Column {
  name: string;
  uid: string;
  sortable?: boolean;
}

interface CustomTableProps {
  columns: Column[];
}

export const CustomTable = ({
  columns,
}: CustomTableProps): JSX.Element => {
  const [users, setDataJson] = useState<User[]>([]); // State variable to store the fetched data

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/proxy/Users/User');
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data: User[] = await response.json(); // Type the response data as User[]

        setDataJson(data); // Store the fetched data in the state variable
        console.log('Data from API:', data); // Output the result in the console
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);
  const [filterValue, setFilterValue] = React.useState("");
  const [selectedKeys, setSelectedKeys] = React.useState<Selection>(
    new Set([])
  );
  const [visibleColumns, setVisibleColumns] = React.useState<Selection>(
    new Set(INITIAL_VISIBLE_COLUMNS)
  );
  const [rowsPerPage, setRowsPerPage] = React.useState(2);
  const [sortDescriptor, setSortDescriptor] = React.useState<SortDescriptor>({
    column: "age",
    direction: "ascending",
  });
  const [page, setPage] = React.useState(1);

  const hasSearchFilter = Boolean(filterValue);

  const headerColumns = React.useMemo(() => {
    if (visibleColumns === "all") return columns;

    return columns.filter((column: { uid: Key }) =>
      Array.from(visibleColumns).includes(column.uid)
    );
  }, [columns, visibleColumns]);

  const filteredItems = React.useMemo(() => {
    let filteredUsers = [...users];

    if (hasSearchFilter) {
      filteredUsers = filteredUsers.filter((user) =>
        user.firstName.toLowerCase().includes(filterValue.toLowerCase())
      );
    }


    return filteredUsers;
  }, [users, hasSearchFilter, filterValue]);

  const pages = Math.ceil(filteredItems.length / rowsPerPage);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredItems.slice(start, end);
  }, [page, filteredItems, rowsPerPage]);

  const sortedItems = React.useMemo(() => {
    return [...items].sort((a: User, b: User) => {
      const first = a[sortDescriptor.column as keyof User] as number;
      const second = b[sortDescriptor.column as keyof User] as number;
      const cmp = first < second ? -1 : first > second ? 1 : 0;

      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
  }, [sortDescriptor, items]);
  const renderCell = React.useCallback((user: User, columnKey: React.Key) => {
    const cellValue = user[columnKey as keyof User];

    switch (columnKey) {

      case "trainer":
        // Check if cellValue is a Trainer object
        return (
          <div className="flex items-center gap-2">
            {cellValue && typeof cellValue === "object" && "firstName" in cellValue
              ? cellValue.firstName
              : "N/A"}  {/* Fallback if trainer object is not valid */}
          </div>
        );

      case "gym":
        // Check if cellValue is a Gym object
        return (
          <div className="flex items-center gap-2">
            {cellValue && typeof cellValue === "object" && "name" in cellValue
              ? cellValue.name
              : "N/A"}  {/* Fallback if gym object is not valid */}
          </div>
        ); case "actions":
        return (
          <div className="relative flex items-center gap-2">
            <Tooltip content="Edit user">
              <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                <EditIcon />
              </span>
            </Tooltip>
            <Tooltip color="danger" content="Delete user">
              <span className="text-lg text-danger cursor-pointer active:opacity-50">
                <DeleteIcon />
              </span>
            </Tooltip>
          </div>
        );
      default:
        return (
          <div>
            {cellValue && typeof cellValue === "object" && "name" in cellValue
              ? cellValue.name
              : cellValue && typeof cellValue === "string" || cellValue === "number"
                ? cellValue
                : "N/A"}
          </div>
        );
    }
  }, []);
  const onNextPage = React.useCallback(() => {
    if (page < pages) {
      setPage(page + 1);
    }
  }, [page, pages]);

  const onPreviousPage = React.useCallback(() => {
    if (page > 1) {
      setPage(page - 1);
    }
  }, [page]);

  const onRowsPerPageChange = React.useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      setRowsPerPage(Number(e.target.value));
      setPage(1);
    },
    []
  );

  const onSearchChange = React.useCallback((value?: string) => {
    if (value) {
      setFilterValue(value);
      setPage(1);
    } else {
      setFilterValue("");
    }
  }, []);

  const onClear = React.useCallback(() => {
    setFilterValue("");
    setPage(1);
  }, []);
  const topContent = React.useMemo(() => {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex justify-between gap-3 items-end">
          <Input
            isClearable
            className="w-full sm:max-w-[44%]"
            placeholder="Пошук за ім'ям"
            value={filterValue}
            onClear={() => onClear()}
            onValueChange={onSearchChange}
          />
          <div className="flex gap-3">
            <Dropdown>
              <DropdownTrigger className="hidden sm:flex">
                <Button variant="flat">Колонки</Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="Table Columns"
                closeOnSelect={false}
                selectedKeys={visibleColumns}
                selectionMode="multiple"
                onSelectionChange={setVisibleColumns}
              >
                {columns.map((column) => (
                  <DropdownItem key={column.uid} className="capitalize">
                    {column.name}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
            <Button color="warning" className="text-white">
              Додати
            </Button>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-default-400 text-small">
            Загалом {users.length}
          </span>
          <label className="flex items-center text-default-400 text-small">
            Кількість записів:
            <select
              className="bg-transparent outline-none text-default-400 text-small"
              onChange={onRowsPerPageChange}
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="15">15</option>
            </select>
          </label>
        </div>
      </div>
    );
  }, [
    filterValue,
    onSearchChange,
    visibleColumns,
    columns,
    users.length,
    onRowsPerPageChange,
    onClear,
  ]);

  const bottomContent = React.useMemo(() => {
    return (
      <div className="flex justify-center items-center py-2 px-2">
        <Pagination
          isCompact
          showControls
          showShadow
          classNames={{
            wrapper: "color-[#f4f0e9]",
            base: "color-[#f4f0e9]",
            cursor: "bg-[#E48100] text-white",
          }}
          page={page}
          total={pages}
          onChange={setPage}
        />
      </div>
    );
  }, [page, pages, onPreviousPage, onNextPage]);

  return (
    <Table
      aria-label="Example table with custom cells, pagination and sorting"
      isHeaderSticky
      bottomContent={bottomContent}
      bottomContentPlacement="outside"
      classNames={{
        wrapper: "max-h-[382px]",
        // Додайте класи для рядків
        tr: "even:bg-[#f4f0e9] odd:bg-transparent", // Застосування кольору до парних і непарних рядків
      }}
      selectedKeys={selectedKeys}
      sortDescriptor={sortDescriptor}
      topContent={topContent}
      topContentPlacement="outside"
      onSelectionChange={setSelectedKeys}
      onSortChange={setSortDescriptor}
    >
      <TableHeader className="bg-orange" columns={headerColumns}>
        {(column) => (
          <TableColumn
            key={column.uid}
            align="start"
            className="bg-white text-[#E48100]"

            allowsSorting={column.sortable}
          >
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody
        emptyContent={"Не знайдено жодного запису"}
        items={sortedItems}
      >
        {(item) => (
          <TableRow key={item.id}>
            {(columnKey) => (
              <TableCell>{renderCell(item, columnKey)}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};
