"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import classNames from "classnames";
import { useGetConfigurationQuery } from "@/services/productApi";

const Header = () => {
  const { isLoading, error, data } = useGetConfigurationQuery("1");
  return (
    <>
      <div
        className={classNames(
          "h-[55px] w-full",
          `bg-[${data?.mainColor || "#272e71"}]`
        )}
      >
        <div className="container relative flex">
          <Link href="/">
            <Image
              width={140}
              height={29}
              alt="Logo"
              className="mt-3 bg-white"
              src={data?.logo || "https://img.innoloft.de/logo.svg"}
              priority
            />
          </Link>
          <Link
            href="/"
            className="ml-6 mt-3 text-lg text-[#ccc] hover:text-white"
          >
            Home
          </Link>
          <Link
            href="/product"
            className="ml-6 mt-3 text-lg text-[#ccc] hover:text-white"
          >
            Product
          </Link>
        </div>
      </div>
    </>
  );
};

export default Header;
