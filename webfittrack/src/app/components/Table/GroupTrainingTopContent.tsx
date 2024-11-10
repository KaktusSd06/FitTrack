import {
    Button,
    Dropdown,
    DropdownTrigger,
    DropdownMenu,
    DropdownItem,
    Selection
} from "@nextui-org/react";
import { DateInput } from "@nextui-org/react";
import { I18nProvider } from "@react-aria/i18n";
import { DateValue } from "@internationalized/date";
import { useState, useEffect } from "react";
import { Column } from "./TableAdminUsers";

interface GroupTrainingTopContentProps {
    onDatePeriodChange: (startDate: DateValue | null, endDate: DateValue | null) => void;
    columns: Column[];
    visibleColumns: Selection;
    setVisibleColumns: React.Dispatch<React.SetStateAction<Selection>>;
    onRowsPerPageChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    usersCount: number;
    role: string;
}

const GroupTrainingTopContent = ({
    onDatePeriodChange,
    columns,
    visibleColumns,
    setVisibleColumns,
    onRowsPerPageChange,
    usersCount,
}: GroupTrainingTopContentProps) => {
    const [startDate, setStartDate] = useState<DateValue | null>(null);
    const [endDate, setEndDate] = useState<DateValue | null>(null);

    useEffect(() => {
        if (startDate && endDate) {
            onDatePeriodChange(startDate, endDate);
        }
    }, [startDate, endDate, onDatePeriodChange]);

    return (
        <div className="flex flex-col gap-4">
            <div className="flex justify-between gap-3 items-end">
                <I18nProvider locale="en-GB">
                    <DateInput
                        label="Початок"
                        value={startDate}
                        onChange={setStartDate}
                    />
                </I18nProvider>
                <I18nProvider locale="en-GB">
                    <DateInput
                        label="Кінець"
                        value={endDate}
                        onChange={setEndDate}
                    />
                </I18nProvider>
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

export default GroupTrainingTopContent;
