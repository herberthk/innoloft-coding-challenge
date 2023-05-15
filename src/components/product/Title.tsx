import Link from "next/link";
import React, { FC, memo } from "react";
import { BiHomeAlt2 } from "react-icons/bi";
import { MdArrowForwardIos } from "react-icons/md";

type Props = {
  name?: string;
  edit?: boolean;
};

const Title: FC<Props> = ({ name, edit = true }) => {
  return (
    <div className=" flex justify-between">
      <div className="flex">
        <BiHomeAlt2 size={23} />
        <MdArrowForwardIos className="ml-2" size={20} />
        <p className="text-md ml-2">Offers</p>
        <MdArrowForwardIos className="ml-2" size={20} />
        <p className="text-md ml-2">{name}</p>
      </div>
      {edit && (
        <Link
          href="/product/edit"
          className="bg-[#272e71] px-2 py-[2px] text-white"
        >
          Edit
        </Link>
      )}
    </div>
  );
};

export default memo(Title);
