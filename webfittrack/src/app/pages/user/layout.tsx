import Navbar from "@/app/components/navbar/Navbar";
import { ReactNode } from "react";
import Sidebar from "@/app/components/sidebar/Sidebar";
import styles from "./layout.module.css";
interface LayoutProps {
    children: ReactNode;
}
const Layout: React.FC<LayoutProps> = ({ children }) => {

    return (
        <div className={styles.flex} >
            <div>
                <Sidebar />
            </div>
            <div className={styles.main}>
                <Navbar imageSrc="/images/image-3.png" firstName="Adminqweqweqwew" lastName="Admin" />
                {children}
            </div>
        </div>
    );
};

export default Layout;
