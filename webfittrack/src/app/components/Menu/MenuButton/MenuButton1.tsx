"use client";
import { Noto_Sans } from 'next/font/google';
import type { NextPage } from 'next';
import styles from './MenuButton.module.css';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';


const notoSans = Noto_Sans({
    weight: ['400', '700'],
    subsets: ['latin'],
});

interface MenuButtonProps {
    text: string,
    imageSrc: string,
    path: string,
}

const MenuButton: NextPage<MenuButtonProps> = ({ text, imageSrc, path }) => {
    const pathname = usePathname();
    return (
        <Link className={`${styles.property1defaultParent} ${notoSans.className}`} href={path} >
            {path === pathname ? (
                <div className={styles.property1default}>
                    <div className={styles.property1defaultChild} />
                    <div className={styles.property1defaultInner}>
                        <div className={styles.userParent}>
                            <Image className={styles.userIcon + " " + styles.whiteSvg} alt="user icon" width={24} height={24} src={imageSrc} />
                            <div className={styles.div}>{text}</div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className={styles.property1variant2}>
                    <div className={styles.property1variant2Child} />
                    <div className={styles.property1variant2Inner}>
                        <div className={styles.userParent}>
                            <Image className={styles.userIcon + " " + styles.Svg} alt="user icon" width={24} height={24} src={imageSrc} />
                            <div className={styles.div}>{text}</div>
                        </div>
                    </div>
                </div>

            )}
        </Link>
    );
};

export default MenuButton;
