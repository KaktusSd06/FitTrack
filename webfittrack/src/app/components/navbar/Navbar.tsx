"use client";
import React from 'react';
import styles from './Navbar.module.css';
import Toggle from '../themetoggle/themetoggle';
import Image from 'next/image';
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from '@nextui-org/react';
import { useRouter } from 'next/navigation';

interface NavbarProps {
  lastName: string;
  firstName: string;
}

const Navbar: React.FC<NavbarProps> = ({ lastName, firstName }) => {
  const router = useRouter();
  const handleClickQuit = () => {
    router.push("/pages/login");
  }

  const handleOpenProfile = () => {
    router.push("/pages/profile");
  }

  return (
    <div className={styles.frameParent}>
      <Toggle />
      <div className={styles.frameGroup}>
        <div className={styles.parent}>
          <div className={styles.div}>{lastName}</div>
          <div className={styles.wrapper}>
            <div className={styles.div}>{firstName}</div>
          </div>
        </div>

        <Dropdown >
          <DropdownTrigger>
            <Image
              className={styles.expandMoreIcon}
              alt="Expand More"
              width={20}
              height={20}
              src="/images/expand-more.svg"
            />
          </DropdownTrigger>
          <DropdownMenu aria-label="User actions"
          >
            <DropdownItem key="profile" onClick={handleOpenProfile} className={styles.dropdownItem} >
              Профіль
            </DropdownItem >
            <DropdownItem key="logout" onClick={handleClickQuit} className={`${styles.dropdownItem} ${styles.customColor} ${styles.dropdownItem1}`} >
              Вийти
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>
    </div>
  );
};

export default Navbar;
