"use client";
import Image from 'next/image';
import React from "react";
import styles from "./CardProduct.module.css";
interface CardProductProps {
  title: string;
  description: string;
  price: number;
  productImage: string;
}

export const CardProduct = ({
  title,
  description,
  price,
  productImage,
}: CardProductProps): JSX.Element => {
  return (
    <div className={styles.cardProduct}>
      <div className={styles.content}>
        <div className={styles.imageRounded} style={{ backgroundImage: `url(${productImage})` }} />
        <div className={styles.frame}>
          <div className={styles.contentText}>
            <div className={styles.title}>{title}</div>
            <p className={styles.text}>{description}</p>
          </div>
          <div className={styles.div}>
            <div className={styles.frameWrapper}>
              <div className={styles.divWrapper}>
                <div className={styles.frame2}>
                  <div className={styles.frame3}>
                    <div className={styles.textWrapper}>{price}</div>
                    <Image
                      className={styles.attachMoney}
                      alt="Attach money"
                      src="/attach-money.svg"
                      width={20}
                      height={20}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.frame4}>
              <Image
                className={styles.img}
                alt="Edit"
                src="/edit.svg"
                width={25}
                height={25}
              />
              <Image
                className={styles.img}
                alt="Delete outline"
                src="/delete-outline.svg"
                width={25}
                height={25}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
