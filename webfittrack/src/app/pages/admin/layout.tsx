import Navbar from "@/app/components/navbar/Navbar";
import { ReactNode } from "react";
import Sidebar from "@/app/components/sidebar/Sidebar";
import styles from "./layout.module.css";
import { AdminButtonData } from "@/app/Interfaces/Interfaces";
interface LayoutProps {
  children: ReactNode;
}
const Layout: React.FC<LayoutProps> = ({ children }) => {

  return (
    <div className={styles.flex} >
      <div>
        <Sidebar buttonsData={AdminButtonData} />
      </div>
      <div className={styles.main}>
        <Navbar firstName="Admin" lastName="Admin" />
        {children}
      </div>
    </div>
  );
};

export default Layout;
