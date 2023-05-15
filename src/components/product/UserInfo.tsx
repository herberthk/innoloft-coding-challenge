import React, { FC, memo } from "react";
import Image from "next/image";
import { BiMap } from "react-icons/bi";
import { Company, User } from "@/interface";
import MapComponent from "./Map";

interface Prop {
  company?: Company;
  user?: User;
}

const UserInfo: FC<Prop> = ({ company, user }) => {
  return (
    <div className="flex flex-col bg-white p-4 drop-shadow-md md:mt-14">
      <p className="text-lg">Offered by</p>
      <Image
        width={140}
        height={30}
        alt="Logo"
        className="mt-3"
        src={company?.logo!}
        priority
      />
      <div className="mt-4 flex">
        <div>
          <Image
            src={user?.profilePicture!}
            width={60}
            height={60}
            className="rounded-full"
            alt="user"
          />
        </div>
        <div className="ml-3 flex flex-col">
          <p className="font-light">
            {user?.firstName} {user?.lastName}
          </p>
          <p className="mt-1 font-light">{company?.name}</p>
        </div>
      </div>
      <div className="mt-5 flex">
        <div>
          <BiMap size={27} />
        </div>
        <div className="ml-3">
          {company?.address.street} {company?.address.zipCode}{" "}
          {company?.address.city.name} {company?.address.country.name}
        </div>
      </div>
      <MapComponent company={company} />
    </div>
  );
};

export default memo(UserInfo);
