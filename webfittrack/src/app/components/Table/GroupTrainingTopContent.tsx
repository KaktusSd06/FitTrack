import {
    Button,
    Dropdown,
    DropdownTrigger,
    DropdownMenu,
    DropdownItem,
    Selection,
    Input
} from "@nextui-org/react";
import { I18nProvider } from "@react-aria/i18n";
import { useState, useEffect } from "react";
import { Column } from "./TableAdminUsers";

interface GroupTrainingTopContentProps {
    onDatePeriodChange: (startDate: string | null, endDate: string | null) => void;
    columns: Column[];
    visibleColumns: Selection;
    setVisibleColumns: React.Dispatch<React.SetStateAction<Selection>>;
    onRowsPerPageChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    usersCount: number;
    onCreate?: () => void;
}

const GroupTrainingTopContent = ({
    onDatePeriodChange,
    columns,
    visibleColumns,
    setVisibleColumns,
    onRowsPerPageChange,
    usersCount,
    onCreate,
}: GroupTrainingTopContentProps) => {
    const [startDate, setStartDate] = useState<string | null>(null);
    const [endDate, setEndDate] = useState<string | null>(null);

    useEffect(() => {
        if (startDate && endDate) {
            onDatePeriodChange(startDate, endDate);
        }
    }, [startDate, endDate, onDatePeriodChange]);
    const handleDateTimeChange1 = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setStartDate(value);
    };
    const handleDateTimeChange2 = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setEndDate(value);
    };
    return (
        <div className="flex flex-col gap-4">
            <div className="flex justify-between gap-3 items-end">
                <I18nProvider locale="en-GB">
                    <Input
                        label="Початок"
                        type="datetime-local" // Allows both date and time input
                        value={startDate}
                        onChange={handleDateTimeChange1}
                    />
                </I18nProvider>
                <I18nProvider locale="en-GB">
                    <Input
                        label="Кінець"
                        type="datetime-local" // Allows both date and time input
                        value={endDate}
                        onChange={handleDateTimeChange2}
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
                    <Button className="bg-[#e48100] text-white" onClick={() => onCreate?.()} >Додати </Button>

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
