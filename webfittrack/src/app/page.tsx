import data from "./components/Table/data.json";
import { CustomTable } from "./components/Table/Table";
export default function Home() {
  return (
    <>
      <CustomTable {...data} />
    </>
  );
}
