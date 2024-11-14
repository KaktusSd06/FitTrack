"use client";

import type { NextPage } from "next";
import React, { useState } from "react";
import { Link, Input, Button } from "@nextui-org/react";
import styles from "../Login/Login.module.css";

const EnterEmail: NextPage = () => {
  return (
    <div className={styles.Container}>
      <div className={styles.ContainerWrapper}>
        <div className={styles.MainContainer}>
          <div className={styles.LogoContainer}>
            <img className={styles.Logo} src="/Logo.svg"></img>
            <p className={styles.LogoText}>FitTrack</p>
          </div>
          <div className={styles.FormElements}>
            <div className={styles.FieldContainer}>
              <Input
                type="email"
                variant="bordered"
                label="Електронна адреса"
              />
            </div>
            <div className={styles.ButtonContainer}>
              <Button
                variant="flat"
                className={`bg-[#E48100] text-white rounded-[8px]`}
              >
                Продовжити
              </Button>
            </div>
          </div>
        </div>
        <div className={styles.LinkWrapper}>
          <p className={styles.LinkText}>Не маєте аккаунту?</p>
          <Link className={styles.Link}>Зареєструватись</Link>
        </div>
      </div>
    </div>
  );
};

export default EnterEmail;
