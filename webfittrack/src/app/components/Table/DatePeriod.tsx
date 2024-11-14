import React, { useState, useEffect } from "react";
import { DateValue, getLocalTimeZone, today } from "@internationalized/date";
import { I18nProvider } from "@react-aria/i18n";
import { DateInput } from "@nextui-org/react";

interface DatePeriodProps {
    onPeriodChange: (period: { startDate: string; endDate: string }) => void;
}

export const DatePeriod = ({ onPeriodChange }: DatePeriodProps): JSX.Element => {
    const [startDate, setStartDate] = useState<DateValue | null>(null);
    const [endDate, setEndDate] = useState<DateValue | null>(null);

    const formatDate = (date: DateValue | null): string => {
        if (!date) return "";

        const jsDate = date.toDate("UTC");
        const day = String(jsDate.getDate()).padStart(2, "0");
        const month = String(jsDate.getMonth() + 1).padStart(2, "0");
        const year = jsDate.getFullYear();

        return `${year}-${month}-${day}`;
    };

    useEffect(() => {
        if (startDate && endDate) {
            onPeriodChange({
                startDate: formatDate(startDate),
                endDate: formatDate(endDate),
            });
        }
    }, [startDate, endDate, onPeriodChange]);

    return (
        <>
            <I18nProvider locale="en-GB">
                <DateInput
                    label="Початок"
                    maxValue={today(getLocalTimeZone())}
                    value={startDate}
                    onChange={setStartDate}
                />
            </I18nProvider>
            <I18nProvider locale="en-GB">
                <DateInput
                    label="Кінець"
                    maxValue={today(getLocalTimeZone())}
                    value={endDate}
                    onChange={setEndDate}
                />
            </I18nProvider>
        </>
    );
};
