"use client";
import { CardProduct } from "@/app/components/CardProduct/CardProduct";
import { Tab, Tabs } from "@nextui-org/react";
import React from "react";

export default function AdminProducts() {
    return (
        <>

            <Tabs
                classNames={{
                    cursor: "w-full bg-[#e48100]",
                    tabContent: `group-data-[selected=true]:text-[#e48100] `,
                    tabList: "pt-[20px] px-[20px]",
                }}
                variant="underlined"
                aria-label="FilterTabs"

            >
                <Tab title="Товари"> <div>                <CardProduct title="123" productImage="/rounded-rectangle.png" description="333" price={350} ></CardProduct>
                </div></Tab>
                <Tab title="Абонименти"><div>11212</div></Tab>
                <Tab title="Послуги"><div>11212</div></Tab>
            </Tabs>
        </>
    );
}
