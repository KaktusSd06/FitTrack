import {
    Input,
    Button,
    Dropdown,
    DropdownTrigger,
    DropdownMenu,
    DropdownItem,
    Selection
} from "@nextui-org/react";
import { Column } from "./TableAdminUsers";

interface TableTopContentProps {
    filterValue: string;
    onSearchChange: (value?: string) => void;
    onClear: () => void;
    columns: Column[];
    visibleColumns: Selection;
    setVisibleColumns: React.Dispatch<React.SetStateAction<Selection>>;
    onRowsPerPageChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    usersCount: number;
    role: string
    onCreate?: () => void;
}

const TableTopContent = ({
    filterValue,
    onSearchChange,
    onClear,
    columns,
    visibleColumns,
    setVisibleColumns,
    onRowsPerPageChange,
    usersCount,
    role,
    onCreate,
}: TableTopContentProps) => {

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
                            selectedKeys={[...visibleColumns]}
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
                    {(role === "Trainer" || role === "Admin") && <Button className="bg-[#e48100] text-white" onClick={() => onCreate?.()} >Додати </Button>}



                </div>
            </div>
            <div className="flex justify-between items-center">
                <span className="text-default-400 text-small">Загалом {usersCount}</span>
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
};

export default TableTopContent;
