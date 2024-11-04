'use client';
import data from "@/app/Columns/user.json"
import { CustomTable } from "./components/Table/Table";
export default function Home() {
  return (
    <div>
      {/* Pass columns as a property, not by spreading */}
      <CustomTable columns={data.columns} />
    </div>
  );
}
